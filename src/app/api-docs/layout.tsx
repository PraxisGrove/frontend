import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PraxisGrove',
  description: 'Complete API documentation for PraxisGrove platform',
};

export default function ApiDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-white">{children}</div>;
}
