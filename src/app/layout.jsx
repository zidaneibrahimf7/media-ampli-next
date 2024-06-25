// import { Inter } from "next/font/google";
import MainLayout from '@/components/layout/MainLayout'
import "./globals.css";
import { Toaster } from 'react-hot-toast'
import Provider from './Providers';
// import ReactQueryClientProvider from '@/components/ReactQueryClientProvider';

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "Generated by create next app zidane ibrahim fadela",
};

export default function RootLayout({ children }) {
  return (
      // <html lang="en">
      //   <body className={inter.className}>{children}</body>
      // </html>
      <Provider>
        {/* <ReactQueryClientProvider> */}
          <MainLayout>
            <Toaster position='bottom-right' />
            {children}
          </MainLayout>
        {/* </ReactQueryClientProvider> */}
      </Provider>
  );
}
