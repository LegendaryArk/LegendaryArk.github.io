import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to send your message.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    toast({
      title: "Message sent successfully!",
      description: "Thank you for reaching out. I'll get back to you soon."
    });
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "nn2sun@uwaterloo.ca",
      href: "mailto:nn2sun@uwaterloo.ca"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (647) 700-5886",
      href: "tel:+16477005886"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Waterloo, ON",
      href: "https://www.google.com/maps/place/University+of+Waterloo/@43.4722854,-80.5448576,17z/data=!4m6!3m5!1s0x882bf6ad02edccff:0xdd9df23996268e17!8m2!3d43.4722854!4d-80.5448576!16zL20vMGpwa3c?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D"
    }
  ];

  return (
    <section id="contact" className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
        {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Get In Touch</h2>
            </div>

            <div className="flex items-center gap-4">
              {contactInfo.map((item) => (
                <Card key={item.title} className="p-6 bg-gradient-card border-border hover:shadow-card transition-all duration-300 max-w-md w-full text-center">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 text-center">
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <a 
                        href={item.href} target="_blank" rel="noopener noreferrer"
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
          {/* <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Have a mechatronics project in mind? Let's discuss how we can bring your automation and robotics ideas to life.
          </p> */}
        </div>

        {/* <div className="grid lg:grid-cols-2 gap-12"> */}
          {/* Contact Form */}
          {/* <Card className="p-8 bg-gradient-card border-border">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-background/50 border-border"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-background/50 border-border"
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="bg-background/50 border-border resize-none"
                />
              </div>
              
              <Button type="submit" variant="hero" size="lg" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card> */}

          
        {/* </div> */}
      </div>
    </section>
  );
};

export default Contact;