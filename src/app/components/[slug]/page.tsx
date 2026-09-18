import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComponentPage } from '../../_showcase/components/ComponentPage';
import { componentDocs, getComponentDoc } from '../../_showcase/registry';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return componentDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = getComponentDoc((await params).slug);
  return doc ? { title: doc.name, description: doc.summary } : {};
}

export default async function Page({ params }: Props) {
  const doc = getComponentDoc((await params).slug);
  if (!doc) notFound();
  return <ComponentPage doc={doc} />;
}
