import * as fs from "fs";
import path from "path";
import { camelCase, startCase } from "lodash";
import prettier from "prettier";
import { isNotBlank, removeSuffix } from "@/ex/utils";

type Route = {
  kind: "file";
  readonly name: string;
};

type Dir = {
  kind: "dir";
  readonly name: string;
  readonly children: (Route | Dir)[];
};

type SourceType = "SOURCE" | "INTERFACE";

const exceptions = ["test"];

function parseSource(parentDir: string): (Route | Dir)[] {
  const entries = fs.readdirSync(parentDir, { withFileTypes: true });
  const contents: (Route | Dir)[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const entry of entries) {
    if (entry.isFile() && entry.name === "route.ts") {
      contents.push({
        kind: "file",
        name: removeSuffix(entry.name, ".ts"),
      });

      continue;
    }

    if (entry.isDirectory() && !exceptions.includes(entry.name)) {
      const children = parseSource(path.join(parentDir, entry.name));
      if (isNotBlank(children)) {
        const name = entry.name;
        contents.push({ kind: "dir", name, children });
      }
    }
  }

  return contents;
}

function generateSources(routes: (Route | Dir)[], parents: string[]): string[] {
  return routes.flatMap((route) => generateSource(route, parents));
}

function generateInterfaces(routes: (Route | Dir)[], parents: string[]): string[] {
  return routes.flatMap((route) => generateInterface(route, parents));
}

function generateSource(route: Route | Dir, parents: string[]): string[] {
  return getGenerateLine(route, parents, "SOURCE");
}

function generateInterface(route: Route | Dir, parents: string[]): string[] {
  return getGenerateLine(route, parents, "INTERFACE");
}

function getGenerateLines(routes: (Route | Dir)[], parents: string[], type: SourceType): string[] {
  if (type === "SOURCE") {
    return routes.flatMap((route) => generateSource(route, parents));
  }

  return routes.flatMap((route) => generateInterface(route, parents));
}

function getGenerateLine(route: Route | Dir, parents: string[], type: SourceType): string[] {
  const lines: string[] = [];
  const newParentsLines = [...parents, route.name];
  switch (route.kind) {
    case "file": {
      const pathname = `/${newParentsLines.join("/").replace("/route", "")}`;
      const { key, interfaceName } = getEntryInfo(pathname);
      if (type === "SOURCE") {
        lines.push(
          `${key} = (req: ${interfaceName}Req) => this.post<${interfaceName}Res>("${pathname}", req);`,
        );
        break;
      }
      lines.push(`${interfaceName}Req`);
      lines.push(`${interfaceName}Res`);
      break;
    }

    case "dir":
    default:
      if (type === "SOURCE") {
        lines.push(...generateSources(route.children, newParentsLines));
        break;
      }
      lines.push(...generateInterfaces(route.children, newParentsLines));
      break;
  }
  return lines;
}

function getEntryInfo(pathname: string): { key: string; interfaceName: string } {
  const pureKey = pathname.replace("route", "").split("/").join("-");
  const key = camelCase(pureKey);
  const pascalKey = startCase(key).replace(/ /g, "");

  return { key, interfaceName: pascalKey };
}

const apiDir = path.join(import.meta.dir, "..", "src/app/api");
const pages = parseSource(apiDir);

const ts: string[] = [];
ts.push("/* tslint:disable */");
ts.push("/* eslint-disable */");
ts.push(`// 자동 생성 파일 수정하지 말것 ${new Date().toString()}`);
// eslint-disable-next-line @typescript-eslint/quotes
ts.push('import { ApiBase } from "./axios";');
ts.push(
  `import { ${[...getGenerateLines(pages, [], "INTERFACE")].join(",")} } from "@/type/definitions"`,
);
ts.push("class Api extends ApiBase {");
ts.push(...getGenerateLines(pages, [], "SOURCE"));
ts.push("};");
ts.push("export const api = new Api();");

const targetPath = path.join(import.meta.dir, "..", "src/lib/api.g.ts");

prettier.format(ts.join("\n"), { filepath: targetPath }).then((res) => {
  fs.writeFileSync(targetPath, res);
});
