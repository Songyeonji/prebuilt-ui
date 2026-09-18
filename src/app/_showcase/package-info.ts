import pkg from '../../shared/package.json';

/** 라이브러리 패키지 정보 (src/shared/package.json 이 단일 출처) */
export const PACKAGE_NAME = pkg.name;
export const PACKAGE_VERSION = pkg.version;

/** 문서 예제 코드의 내부 alias('@shared')를 실제 패키지 이름으로 바꿔서 보여줌 */
export function toPublicImports(code: string) {
  return code.replaceAll(`'@shared/utils'`, `'${PACKAGE_NAME}/utils'`).replaceAll(`'@shared'`, `'${PACKAGE_NAME}'`);
}
