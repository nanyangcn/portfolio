import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import TabsBar from 'components/TabsBar';
import StatusBar from 'components/StatusBar';
import ActivityBar from 'components/ActivityBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative h-screen w-screen bg-secondary">
          <div className="flex h-full w-full">
            <ActivityBar />
            <div id="main" className="relative h-full w-full pb-8">
              <TabsBar />
              <div className="h-full w-full overflow-hidden bg-additional">
                {children}
              </div>
            </div>
          </div>
          <StatusBar />
        </div>
      </body>
    </html>
  );
}
