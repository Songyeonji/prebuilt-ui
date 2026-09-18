import { Badge, Tabs, type BadgeVariant } from '@shared';
import { getDesignTokens } from '../tokens';
import type { ComponentDoc } from '../types';
import { CodeBlock } from './CodeBlock';
import { ExampleCard } from './ExampleCard';
import { PropsTable } from './PropsTable';
import { TokenTable } from './TokenTable';

const statusVariant: Record<ComponentDoc['status'], BadgeVariant> = {
  stable: 'success',
  beta: 'warning',
  draft: 'neutral',
};

function H2({ children }: { children: string }) {
  return <h2 className="mb-3 text-lg font-semibold tracking-tight">{children}</h2>;
}

function GuideBox({ type, items }: { type: 'do' | 'dont'; items: string[] }) {
  const isDo = type === 'do';
  return (
    <div className="rounded-md border border-border px-4 py-3.5">
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-fg">
        <span className={isDo ? 'size-1.5 rounded-full bg-success' : 'size-1.5 rounded-full bg-danger'} aria-hidden />
        {isDo ? 'Do' : "Don't"}
      </h3>
      <ul className="list-disc space-y-1 pl-5 text-md leading-relaxed text-fg-subtle marker:text-fg-muted">
        {items.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

function OverviewTab({ doc }: { doc: ComponentDoc }) {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <H2>언제 사용하나요?</H2>
        <ul className="list-disc space-y-1 pl-5 leading-relaxed text-fg-subtle">
          {doc.whenToUse.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      {doc.guidelines && (
        <section className="grid gap-4 md:grid-cols-2">
          <GuideBox type="do" items={doc.guidelines.do} />
          <GuideBox type="dont" items={doc.guidelines.dont} />
        </section>
      )}

      <section>
        <H2>사용법</H2>
        <CodeBlock code={doc.usage} />
      </section>

      <section>
        <H2>Props</H2>
        <PropsTable props={doc.props} />
      </section>
    </div>
  );
}

function DesignTab({ doc }: { doc: ComponentDoc }) {
  const allTokens = getDesignTokens();
  const tokens = (doc.tokens ?? [])
    .map((name) => allTokens.find((t) => t.name === name))
    .filter((t) => t !== undefined);

  return (
    <div className="flex flex-col gap-8">
      {doc.examples.map((example) => (
        <ExampleCard key={example.title} title={example.title} description={example.description} code={example.code}>
          {example.render()}
        </ExampleCard>
      ))}

      {tokens.length > 0 && (
        <section>
          <H2>사용하는 디자인 토큰</H2>
          <TokenTable tokens={tokens} />
        </section>
      )}
    </div>
  );
}

export function ComponentPage({ doc }: { doc: ComponentDoc }) {
  return (
    <article className="mx-auto max-w-content">
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{doc.name}</h1>
          <Badge variant={statusVariant[doc.status]} shape="pill" dot>
            {doc.status}
          </Badge>
        </div>
        <p className="mt-2 mb-4 text-md leading-relaxed text-fg-muted sm:text-lg">{doc.summary}</p>
        <code className="inline-block max-w-full overflow-x-auto rounded-sm bg-surface-muted px-2 py-1 font-mono text-sm whitespace-nowrap">
          {`import { ${doc.name} } from '@shared';`}
        </code>
      </header>

      <Tabs
        items={[
          { key: 'overview', label: '설명', content: <OverviewTab doc={doc} /> },
          { key: 'design', label: '디자인', content: <DesignTab doc={doc} /> },
        ]}
      />
    </article>
  );
}
