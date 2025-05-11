
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Menu, X, Home, Rss, Graph, Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: <Home className="h-5 w-5 mr-2" /> },
    { label: 'Items', path: '/items', icon: <Rss className="h-5 w-5 mr-2" /> },
    { label: 'Graph', path: '/graph', icon: <Graph className="h-5 w-5 mr-2" /> },
    { label: 'Sources', path: '/sources', icon: <Settings className="h-5 w-5 mr-2" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for larger screens */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out",
          isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="h-8 w-8 rounded-full bg-gradient-to-r from-aggregator-blue to-aggregator-purple" />
            <span className="text-xl font-bold">Aggregator</span>
          </Link>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        <Separator />
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900",
                location.pathname === item.path && "bg-gray-100 font-medium text-gray-900"
              )}
              onClick={isMobile ? () => setSidebarOpen(false) : undefined}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isMobile ? "ml-0" : "ml-64"
      )}>
        {/* Mobile header with menu button */}
        {isMobile && (
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white px-4 shadow">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center space-x-2">
              <span className="h-6 w-6 rounded-full bg-gradient-to-r from-aggregator-blue to-aggregator-purple" />
              <span className="text-lg font-bold">Aggregator</span>
            </Link>
            <div className="w-8" />
          </header>
        )}

        {/* Page content */}
        <div className="container py-6 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
