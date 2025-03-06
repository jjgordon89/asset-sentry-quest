import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
    <div className="container flex h-14 items-center">
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <Link
          to="/"
          className="font-medium transition-colors hover:text-foreground/80"
          aria-label="Home"
        >
          Asset Sentry
        </Link>
        <Button
          variant="ghost"
          asChild
          className="hidden md:inline-flex"
        >
          <Link to="/assets">Assets</Link>
        </Button>
        <Button
          variant="ghost"
          asChild
          className="hidden md:inline-flex"
        >
          <Link to="/inspections">Inspections</Link>
        </Button>
      </nav>
    </div>
  </header>
);