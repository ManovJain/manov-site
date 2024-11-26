import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  weight: "300 900",
});

export const metadata = {
  title: "Manov Jain - Personal Site",
  description: "Software engineer and designer based in Seattle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
