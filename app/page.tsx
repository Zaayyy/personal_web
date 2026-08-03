import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Hobbies from "@/components/Hobbies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Education />
      <Hobbies />
      <Contact />
      <Footer />
    </main>
  );
}
