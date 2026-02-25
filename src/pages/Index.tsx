import { Link } from "react-router-dom";
import { FileText, Target, MessageSquare, Mail, Linkedin, Calendar, ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const tools = [
  {
    icon: FileText,
    title: "Resume Optimizer",
    description: "ATS-optimized resumes with measurable achievements and keyword enhancements.",
    href: "/tools/resume",
  },
  {
    icon: Target,
    title: "JD Aligner",
    description: "Match your resume to job descriptions with skills analysis and alignment scoring.",
    href: "/tools/jd-align",
  },
  {
    icon: MessageSquare,
    title: "Interview Prep",
    description: "10 role-specific questions with structured STAR-format answers.",
    href: "/tools/interview",
  },
  {
    icon: Mail,
    title: "Cover Letter",
    description: "Tailored 3-paragraph cover letters aligned with any job description.",
    href: "/tools/cover-letter",
  },
  {
    icon: Linkedin,
    title: "LinkedIn Optimizer",
    description: "Optimize your About section, headline, and skills for recruiter visibility.",
    href: "/tools/linkedin",
  },
  {
    icon: Calendar,
    title: "Job Search Planner",
    description: "Structured 7-day plans balancing applications, networking, and prep.",
    href: "/tools/planner",
  },
];

const features = [
  { icon: Sparkles, title: "AI-Powered", description: "Leveraging advanced LLMs for intelligent career optimization" },
  { icon: Zap, title: "Instant Results", description: "Get optimized content in seconds, not hours" },
  { icon: Shield, title: "ATS-Optimized", description: "Pass applicant tracking systems with confidence" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">JOBFIT AI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-glow-pulse" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Career Optimization
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Land Your Dream Job with{" "}
              <span className="text-gradient">AI Precision</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Optimize resumes, align with job descriptions, ace interviews, and plan your job search — all powered by advanced AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button size="lg" className="text-base px-8 shadow-glow" asChild>
                <Link to="/dashboard">
                  Start Free <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8" asChild>
                <Link to="/dashboard">View Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="py-16 border-y border-border/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Your Complete Career Toolkit
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Six AI-powered tools designed to optimize every stage of your job search.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool, i) => (
              <Link
                key={tool.title}
                to={tool.href}
                className="group glass-card rounded-xl p-6 shadow-card hover:border-primary/30 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <tool.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                <span className="text-sm text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Try it <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/10 blur-[100px] rounded-full" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Ready to Transform Your Job Search?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Join thousands of job seekers using AI to land roles faster.
              </p>
              <Button size="lg" className="text-base px-8 shadow-glow" asChild>
                <Link to="/dashboard">
                  Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-display text-sm font-semibold text-foreground">JOBFIT AI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 JOBFIT AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
