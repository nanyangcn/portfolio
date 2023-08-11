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
        <div className="flex h-screen w-screen flex-col justify-between bg-neutral-900">
          <div className="flex h-full">
            <ActivityBar />
            <div className="flex w-full flex-col">
              <TabsBar />
              <div className="main h-full w-full overflow-x-auto overflow-y-scroll bg-neutral-800/40">
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
