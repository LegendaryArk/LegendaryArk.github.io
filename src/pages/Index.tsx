import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Navigation />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
