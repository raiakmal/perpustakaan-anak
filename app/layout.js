import Head from 'next/head';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Perpustakaan Anak',
  description: 'Perpustakaan Anak',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
      </Head>
      <body className={`${poppins.variable}antialiased`}>{children}</body>
    </html>
  );
}
