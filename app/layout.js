"use client";
import "./globals.css";
import Nav from "./nav";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children, params: {session, ...params}}) {
  return (
    <html lang="en">
      <body className="bg-color1">
        <SessionProvider session={session}>
          <header>
            <Nav />
          </header>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
