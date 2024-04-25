import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import ThemeProvider from "./context/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: { default: "Makodede", template: "%s | Makodede" },
  description:
    "Explore the digital world through the lens of my portfolio. Discover innovative web designs and interactive experiences that showcase expertise in web development. Elevate your online presence with cutting-edge solutions",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
