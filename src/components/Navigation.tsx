import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [showNavigation, setShowNavigation] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.querySelector('section');
      const heroHeight = heroElement ? heroElement.offsetHeight : window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Show navigation only when past hero section and not at the very top
      setShowNavigation(scrollPosition > heroHeight - 100 && scrollPosition > 500);

      // Track active section
      const sections = ["about", "projects", "contact"];
      const scrollPositionWithOffset = scrollPosition + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPositionWithOffset >= offsetTop && scrollPositionWithOffset < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-background/90 backdrop-blur-md border border-border rounded-full px-6 py-3 shadow-lg transition-transform duration-300 ${showNavigation ? 'translate-y-0' : '-translate-y-20'}`}>
      <div className="flex items-center justify-between gap-8">
        <div className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            Noah Sun
          </a>
        </div>
        
        <Tabs value={activeSection} className="flex-shrink-0">
          <TabsList className="bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="about" 
              onClick={() => scrollToSection("about")}
              className="cursor-pointer px-4 py-2 text-sm rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              About
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              onClick={() => scrollToSection("projects")}
              className="cursor-pointer px-4 py-2 text-sm rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger 
              value="contact" 
              onClick={() => scrollToSection("contact")}
              className="cursor-pointer px-4 py-2 text-sm rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              Contact
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </nav>
  );
};

export default Navigation;