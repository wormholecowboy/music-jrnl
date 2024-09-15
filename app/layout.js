"use client";
import "./globals.css";
import Nav from "./nav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen bg-color1">
        <header>
          <Nav />
        </header>
        {children}
      </body>
    </html>
  );
}
