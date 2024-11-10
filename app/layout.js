import { Poppins } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import Link from 'next/link';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Awokwik',
  description: 'Perpustakaan Anak',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <Link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" />
      </Head>
      <body className={`${poppins.variable}antialiased`}>{children}</body>
    </html>
  );
}
