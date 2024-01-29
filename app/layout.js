import "./globals.css";
import Nav from "./nav";

export const metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Nav />
        </header>
        {children}
      </body>
    </html>
  );
}
