import { Link, useLocation } from "react-router-dom";
import { FileText, Target, MessageSquare, Mail, Linkedin, Calendar, Sparkles, LayoutDashboard, LogOut, Archive, BarChart3 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Resume", href: "/tools/resume" },
  { icon: Target, label: "JD Align", href: "/tools/jd-align" },
  { icon: MessageSquare, label: "Interview", href: "/tools/interview" },
  { icon: Mail, label: "Cover Letter", href: "/tools/cover-letter" },
  { icon: Linkedin, label: "LinkedIn", href: "/tools/linkedin" },
  { icon: Calendar, label: "Planner", href: "/tools/planner" },
  { icon: BarChart3, label: "Resume Ranker", href: "/tools/resume-ranker"},
  { icon: Archive, label: "Saved", href: "/saved" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border/50 bg-card/50 p-4">
        <Link to="/" className="flex items-center gap-2 px-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">JOBFIT AI</span>
        </Link>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 mt-4">
          {user && (
            <div className="px-3">
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={signOut} className="w-full justify-start text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border/50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-display text-base font-bold text-foreground">JOBFIT AI</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="w-4 h-4" />
          </Button>
        </header>

        {/* Mobile nav */}
        <div className="md:hidden overflow-x-auto border-b border-border/50">
          <div className="flex gap-1 p-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
