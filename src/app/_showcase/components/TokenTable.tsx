import type { DesignToken } from '../tokens';
import { Code, Table } from './Table';

function Preview({ token }: { token: DesignToken }) {
  const v = `var(${token.name})`;
  if (token.name.startsWith('--color-'))
    return <span className="block size-6 rounded-sm border border-border" style={{ background: v }} />;
  if (token.name.startsWith('--radius-'))
    return <span className="block size-8 border-2 border-primary bg-primary-soft" style={{ borderRadius: v }} />;
  if (token.name.startsWith('--shadow-'))
    return <span className="block size-8 rounded-md bg-surface" style={{ boxShadow: v }} />;
  if (token.name.startsWith('--font-'))
    return (
      <span className="text-base" style={{ fontFamily: v }}>
        Aa 가나
      </span>
    );
  return null;
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
          <td className="max-w-80 font-mono text-xs break-all text-fg-muted">{token.value}</td>
        </tr>
      ))}
    </Table>
  );
}
