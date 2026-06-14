import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marcellinus Alfrits Sorongan | IT Student & Web Developer",
  description:
    "Portfolio & CV pribadi Marcellinus Alfrits Sorongan — Mahasiswa S-1 Sistem Informasi Universitas Amikom Yogyakarta. Web Developer, Data Enthusiast, Cloud Learner.",
  keywords: [
    "Marcellinus Alfrits Sorongan",
    "IT Student",
    "Web Developer",
    "Data Science",
    "Universitas Amikom Yogyakarta",
    "Portfolio",
    "CV",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Marcellinus Alfrits Sorongan" }],
  openGraph: {
    title: "Marcellinus Alfrits Sorongan | IT Student & Web Developer",
    description:
      "Portfolio & CV pribadi Marcellinus Alfrits Sorongan — Mahasiswa S-1 Sistem Informasi Universitas Amikom Yogyakarta.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased bg-[#050a15] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
