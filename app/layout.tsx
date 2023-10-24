import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import TabsBar from 'components/TabsBar';
// import StatusBar from 'components/StatusBar';
import ActivityBar from 'components/ActivityBar';
import SideBar from 'components/sidebar/SideBar';

import QueryProvider from 'providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Yang Nan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <div className="flex h-screen w-screen select-none flex-col bg-secondary">
            <div className="flex min-h-0 grow">
              <ActivityBar />
              <SideBar />
              <div className="flex min-w-0 grow flex-col">
                <TabsBar />
                {children}
              </div>
            </div>
            {/* <StatusBar /> */}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
