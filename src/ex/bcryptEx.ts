import * as bcrypt from "bcryptjs";

// bcrypt 가 의존성 문제가 생긴다.
// next 를 사용하게 되면 나는 이슈 인거같은데 next 에서 bugfix 를 해주지 않음
// https://github.com/kelektiv/node.bcrypt.js/issues/800
// 해결 방법이 나와있긴 하나 실서비스 프로젝트에서는 하면 안될 듯

const SALT_ROUNDS = 12;

// 비동기
export function getHash(pwd: string): Promise<string> {
  return bcrypt.hash(pwd, SALT_ROUNDS);
}

// 동기
export function hashSync(pwd: string): string {
  return bcrypt.hashSync(pwd, SALT_ROUNDS);
}

export function compare(pwd: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pwd, hash);
}
