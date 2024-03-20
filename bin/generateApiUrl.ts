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

const exceptions = ["test"];
const interfaces: string[] = [];

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
  const lines: string[] = [];
  const newParents = [...parents, route.name];
  switch (route.kind) {
    case "file": {
      const pathname = `/${newParents.join("/")}`;
      const pureKey = pathname.replace("route", "").split("/").join("-");
      const key = camelCase(pureKey);
      const pascalKey = startCase(key).replace(/ /g, "");
      interfaces.push(`${pascalKey}Req`);
      interfaces.push(`${pascalKey}Res`);

      lines.push(`${key} = (req: ${pascalKey}Req) => this.post<${pascalKey}Res>("${pathname}");`);
      break;
    }

    case "dir":
    default:
      lines.push(...generateSources(route.children, newParents));
      break;
  }
  return lines;
}

function generateInterface(route: Route | Dir, parents: string[]): string[] {
  const interfaces: string[] = [];
  const newParents = [...parents, route.name];
  switch (route.kind) {
    case "file": {
      const pathname = `/${newParents.join("/")}`;
      const pureKey = pathname.replace("route", "").split("/").join("-");
      const key = camelCase(pureKey);
      const pascalKey = startCase(key).replace(/ /g, "");
      interfaces.push(`${pascalKey}Req`);
      interfaces.push(`${pascalKey}Res`);
      break;
    }

    case "dir":
    default:
      interfaces.push(...generateInterfaces(route.children, newParents));
      break;
  }
  return interfaces;
}

const apiDir = path.join(import.meta.dir, "..", "src/app/api");
const pages = parseSource(apiDir);

const ts: string[] = [];
ts.push("/* tslint:disable */");
ts.push("/* eslint-disable */");
ts.push(`// 자동 생성 파일 수정하지 말것 ${new Date().toString()}`);
// eslint-disable-next-line @typescript-eslint/quotes
ts.push('import { ApiBase } from "./axios";');
ts.push(`import { ${[...generateInterfaces(pages, [])].join(",")} } from "@/type/definitions"`);
ts.push("class Api extends ApiBase {");
ts.push(...generateSources(pages, []));
ts.push("};");
ts.push("export const api = new Api();");

const targetPath = path.join(import.meta.dir, "..", "src/lib/api.g.ts");

prettier.format(ts.join("\n"), { filepath: targetPath }).then((res) => {
  fs.writeFileSync(targetPath, res);
});
