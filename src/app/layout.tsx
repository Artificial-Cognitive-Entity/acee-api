import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navigation/navbar/navbar";
import AuthProvider from "./context/AuthProvider";

// main root of the application

const inter = Inter({ subsets: ["latin"] });

//website meta data
export const metadata: Metadata = {
  title: "ACEE",
  description: "Artificial Cognitive Entity for Enterprise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="black" lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

//children represents page where the user is at any given time
