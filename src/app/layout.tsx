import type { Metadata } from "next";

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Ronnel & Junna Wedding",
  description:
    "Ronnel Barashsari and Junna Kudo wedding website, wedding will be at lazuri hotel tagaytay in August 8, 2025, come and join us at our wedding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.className} antialiased`}>{children}</body>
    </html>
  );
}
