
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BadgeCheck, BarChart2, Clipboard, Wrench } from "lucide-react";
import FeatureCard from "@/components/shared/FeatureCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="container pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-down">
            Asset Sentry
            <span className="text-primary"> Quest</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8 animate-slide-down animation-delay-150">
            Streamline your asset management and inspection processes with our comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-down animation-delay-300">
            <Button asChild size="lg">
              <Link to="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/assets">
                Browse Assets
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features for Complete Asset Management
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Clipboard className="h-10 w-10 text-primary" />}
            title="Asset Tracking"
            description="Keep track of all your assets in one centralized location with detailed information and history."
          />
          <FeatureCard 
            icon={<BadgeCheck className="h-10 w-10 text-primary" />}
            title="Inspection Forms"
            description="Create, assign, and complete inspection forms efficiently with customizable templates."
          />
          <FeatureCard 
            icon={<BarChart2 className="h-10 w-10 text-primary" />}
            title="Analytics Dashboard"
            description="Gain valuable insights with comprehensive analytics and reporting tools."
          />
          <FeatureCard 
            icon={<Wrench className="h-10 w-10 text-primary" />}
            title="Maintenance Tracking"
            description="Schedule and track maintenance activities to ensure optimal asset performance."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 md:py-24">
        <div className="bg-card rounded-xl p-8 md:p-12 text-center shadow-md">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore the full power of Asset Sentry Quest and optimize your asset management workflow.
          </p>
          <Button asChild size="lg">
            <Link to="/dashboard">
              Enter Dashboard
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
