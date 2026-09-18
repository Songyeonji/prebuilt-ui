import type { DesignToken } from '../tokens';
import { Code, Table } from './Table';

const SAMPLE = 'Aa 가나다 123';

function Preview({ token }: { token: DesignToken }) {
  const v = `var(${token.name})`;
  const [, ns] = token.name.match(/^--([a-z]+(?:-weight)?)-/) ?? [];

  switch (ns) {
    case 'color':
      return <span className="block size-6 rounded-sm border border-border" style={{ background: v }} />;
    case 'text':
      return (
        <span className="whitespace-nowrap" style={{ fontSize: v }}>
          {SAMPLE}
        </span>
      );
    case 'font-weight':
      return (
        <span className="text-lg whitespace-nowrap" style={{ fontWeight: v }}>
          {SAMPLE}
        </span>
      );
    case 'font':
      return (
        <span className="text-lg whitespace-nowrap" style={{ fontFamily: v }}>
          {SAMPLE}
        </span>
      );
    case 'tracking':
      return (
        <span className="text-lg whitespace-nowrap" style={{ letterSpacing: v }}>
          {SAMPLE}
        </span>
      );
    case 'leading':
      return (
        <span className="block w-20 bg-primary-soft text-xs" style={{ lineHeight: v }}>
          줄 간격 예시 텍스트
        </span>
      );
    case 'spacing':
      return <span className="block h-3 rounded-sm bg-primary" style={{ width: v }} />;
    case 'radius':
      return <span className="block size-8 border-2 border-primary bg-primary-soft" style={{ borderRadius: v }} />;
    case 'shadow':
      return <span className="block size-8 rounded-md bg-surface" style={{ boxShadow: v }} />;
    default:
      return null;
  }
}

export function TokenTable({ tokens }: { tokens: DesignToken[] }) {
  return (
    <Table head={['미리보기', '토큰', 'Tailwind', '값']}>
      {tokens.map((token) => (
        <tr key={token.name}>
          <td className="w-20">
            <Preview token={token} />
          </td>
          <td>
            <Code>{token.name}</Code>
          </td>
          <td>
            <code className="font-mono text-xs text-code-accent">{token.utility}</code>
          </td>
          <td className="max-w-field font-mono text-xs break-all text-fg-muted">{token.value}</td>
        </tr>
      ))}
    </Table>
  );
}
