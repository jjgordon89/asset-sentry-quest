
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Box, 
  ClipboardCheck, 
  BarChart4,
  Search, 
  Bell, 
  Settings, 
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { 
      name: "Dashboard", 
      path: "/", 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      name: "Assets", 
      path: "/assets", 
      icon: <Box className="w-5 h-5" /> 
    },
    { 
      name: "Inspections", 
      path: "/inspections", 
      icon: <ClipboardCheck className="w-5 h-5" /> 
    },
    { 
      name: "Reports", 
      path: "/reports", 
      icon: <BarChart4 className="w-5 h-5" /> 
    }
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-semibold text-primary flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold">AS</span>
              </div>
              <span className="hidden md:inline">Asset Sentry</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {link.icon}
                    {link.name}
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="w-64 pl-8 rounded-full"
              />
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Link to="/" className="text-xl font-semibold text-primary flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                      <span className="text-white font-bold">AS</span>
                    </div>
                    <span>Asset Sentry</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="relative mb-6">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search..." 
                    className="w-full pl-8"
                  />
                </div>
                
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === link.path
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        {link.icon}
                        {link.name}
                      </div>
                    </Link>
                  ))}
                </nav>
                
                <div className="mt-auto pt-6 border-t">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
