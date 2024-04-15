import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./context/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Makodede",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
