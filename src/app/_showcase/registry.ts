import type { ComponentDoc } from './types';
import badge from './docs/Badge.doc';
import button from './docs/Button.doc';
import input from './docs/Input.doc';
import modal from './docs/Modal.doc';
import tabs from './docs/Tabs.doc';

// 새 컴포넌트 문서를 만들면 여기에 추가하세요. (사이드바/라우트가 자동 생성됩니다)
export const componentDocs: ComponentDoc[] = [badge, button, input, modal, tabs].sort((a, b) =>
  a.name.localeCompare(b.name),
);

export function getComponentDoc(slug: string) {
  return componentDocs.find((doc) => doc.slug === slug);
}
