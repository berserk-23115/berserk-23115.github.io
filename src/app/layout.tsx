import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

const url = 'https://berserk-23115.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: 'Anushk Kumar — CSE student, systems & security',
  description: 'Portfolio of Anushk Kumar: AI, usable security, systems, GPU computing, and open-source engineering at IIIT Delhi.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Anushk Kumar — systems & security', description: 'Live GitHub activity and selected engineering work in CUDA, Rust, security, and applied AI.', url, siteName: 'Anushk Kumar', type: 'profile' },
  twitter: { card: 'summary', title: 'Anushk Kumar', description: 'CSE student · systems, security & applied AI' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark"><body><Providers>{children}</Providers></body></html>;
}
