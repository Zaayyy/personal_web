import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

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
  title: "Marcellinus Alfrits Sorongan | Web Developer & IT Student",
  description:
    "Portfolio & CV pribadi Marcellinus Alfrits Sorongan — Mahasiswa S-1 Sistem Informasi Universitas Amikom Yogyakarta. Full-Stack Web Developer, Data Enthusiast & Cloud Security Learner.",
  keywords: [
    "Marcellinus Alfrits Sorongan",
    "Marcell Sorongan",
    "IT Student",
    "Web Developer",
    "Full-Stack Developer",
    "Data Science",
    "NLP",
    "Universitas Amikom Yogyakarta",
    "Portfolio",
    "Next.js",
    "React",
    "AWS",
    "Security",
  ],
  authors: [{ name: "Marcellinus Alfrits Sorongan", url: "https://github.com/Zaayyy" }],
  creator: "Marcellinus Alfrits Sorongan",
  openGraph: {
    title: "Marcellinus Alfrits Sorongan | Web Developer & IT Student",
    description:
      "Portfolio & CV pribadi Marcellinus Alfrits Sorongan — Mahasiswa S-1 Sistem Informasi Universitas Amikom Yogyakarta.",
    type: "website",
    locale: "id_ID",
    siteName: "Marcellinus Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcellinus Alfrits Sorongan | Web Developer & IT Student",
    description: "Portfolio & CV pribadi Marcellinus Alfrits Sorongan — Mahasiswa S-1 Sistem Informasi Universitas Amikom Yogyakarta.",
  },
  robots: {
    index: true,
    follow: true,
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

