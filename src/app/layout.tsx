import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sunday's Best — A HUGLIFE Experience",
  description: "The elevated Sunday experience.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{margin:0,padding:0,background:"#07070a"}}>{children}</body>
    </html>
  );
}
