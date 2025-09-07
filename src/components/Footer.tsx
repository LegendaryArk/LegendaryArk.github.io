import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Heart, FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo/Name */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
              Noah Sun
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Mechatronics Engineer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() =>
                window.open(
                  "https://github.com/LegendaryArk",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <Github className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/sunnoah",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() => window.open("mailto:nn2sun@uwaterloo.ca")}
            >
              <Mail className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={() => window.open("", "_blank", "noopener,noreferrer")}
            >
              <FileText className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            © {currentYear} Noah Sun
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
