import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  weight: "300 900",
});

export const metadata = {
  title: {
    default: "Manov Jain | Software Engineer & Designer",
    template: "%s | Manov Jain",
  },
  description:
    "Manov Jain is a software engineer and designer based in Seattle, WA. Currently building innovative products at AT&T and working on projects like anim and inSZN.",
  keywords: [
    "Manov Jain",
    "Software Engineer",
    "Designer",
    "Seattle",
    "AT&T",
    "Web Development",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Manov Jain" }],
  creator: "Manov Jain",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manov.dev",
    title: "Manov Jain | Software Engineer & Designer",
    description:
      "Manov Jain is a software engineer and designer based in Seattle, WA. Currently building innovative products at AT&T and working on projects like anim and inSZN.",
    siteName: "Manov Jain",
    images: [
      {
        url: "/manov.png",
        width: 800,
        height: 800,
        alt: "Manov Jain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manov Jain | Software Engineer & Designer",
    description:
      "Software engineer and designer based in Seattle, building innovative products and experiences.",
    creator: "@ManovJain",
    images: ["/manov.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://manov.dev"),
  appleWebApp: {
    title: "Manov Jain",
    statusBarStyle: "default",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={satoshi.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
