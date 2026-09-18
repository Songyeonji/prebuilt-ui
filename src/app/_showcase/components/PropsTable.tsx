import type { PropDoc } from '../types';
import { Code, Table } from './Table';

export function PropsTable({ props }: { props: PropDoc[] }) {
  return (
    <Table head={['Prop', 'Type', 'Default', '설명']}>
      {props.map((p) => (
        <tr key={p.name}>
          <td>
            <Code>{p.name}</Code>
            {p.required && <span className="ml-1 text-xs font-bold text-danger">필수</span>}
          </td>
          <td>
            <code className="font-mono text-xs break-words text-accent">{p.type}</code>
          </td>
          <td>{p.default ? <Code>{p.default}</Code> : '—'}</td>
          <td>{p.description}</td>
        </tr>
      ))}
    </Table>
  );
}
