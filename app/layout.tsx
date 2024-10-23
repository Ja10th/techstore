import type { Metadata } from "next";
import "./globals.css";
import CartProvider from "./components/CartProvider";


export const metadata: Metadata = {
  title: "Infoworld Store",
  description: "Phones, Laptops, Gaming Consoles are available",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased fontBody"
      >
        <CartProvider>
        {children}
        </CartProvider>
      </body>
    </html>
  );
}
