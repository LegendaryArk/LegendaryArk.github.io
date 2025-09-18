import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "nn2sun@uwaterloo.ca",
      href: "mailto:nn2sun@uwaterloo.ca",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (647) 700-5886",
      href: "tel:+16477005886",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Waterloo, ON",
      href: "https://www.google.com/maps/place/University+of+Waterloo/@43.4722854,-80.5448576,17z/data=!4m6!3m5!1s0x882bf6ad02edccff:0xdd9df23996268e17!8m2!3d43.4722854!4d-80.5448576!16zL20vMGpwa3c?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D",
    },
  ];

  return (
    <section id="contact" className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                Get In Touch
              </h2>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">
              {contactInfo.map((item) => (
                <Card
                  key={item.title}
                  className="p-6 bg-gradient-card border-border hover:shadow-card transition-all duration-300 max-w-md w-full sm:w-auto flex-shrink-0 text-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 text-center">
                      <h4 className="font-medium text-foreground">
                        {item.title}
                      </h4>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
