import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Auth0 App",
  description: "Generated for Auth0 demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
