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
  metadataBase: new URL("https://github.com/Zaayyy/personal_web"),
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Marcellinus Alfrits Sorongan",
  "jobTitle": "Full-Stack Web Developer & IT Student",
  "affiliation": {
    "@type": "CollegeOrUniversity",
    "name": "Universitas Amikom Yogyakarta"
  },
  "url": "https://github.com/Zaayyy",
  "sameAs": [
    "https://github.com/Zaayyy",
    "https://www.linkedin.com/in/marcell-sorongan-36070a299",
    "https://www.instagram.com/aceeeelllllll"
  ],
  "knowsAbout": [
    "Web Development",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Data Science",
    "NLP",
    "Cloud Computing",
    "AWS",
    "OWASP Web Security"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased bg-[#09090b] text-white selection:bg-blue-500/30 selection:text-blue-200`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
