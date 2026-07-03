import { Link } from "react-router-dom";
import {
  FileText, Target, MessageSquare, Mail, Linkedin, Calendar, ListOrdered,
  ArrowRight, Sparkles, Zap, Shield, Star, CheckCircle2, TrendingUp, Users, Award,
  Wand2, ListChecks, AlignLeft, ScanSearch, Repeat, PenLine, Crown, GraduationCap, LayoutTemplate, Library,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const coreTools = [
  { icon: FileText, title: "Resume Optimizer", description: "ATS-optimized resumes with measurable achievements and keyword enhancements.", href: "/tools/resume", accent: "from-primary/20 to-accent/10" },
  { icon: Target, title: "JD Aligner", description: "Match your resume to job descriptions with visual alignment scores.", href: "/tools/jd-align", accent: "from-accent/20 to-primary/10" },
  { icon: ListOrdered, title: "Resume Ranker", description: "Rank multiple candidates against any JD with defensible fit scores.", href: "/tools/resume-ranker", accent: "from-primary/20 to-accent/10" },
  { icon: MessageSquare, title: "Interview Prep", description: "10 role-specific questions with structured STAR-format answers.", href: "/tools/interview", accent: "from-accent/20 to-primary/10" },
  { icon: Mail, title: "Cover Letter", description: "Tailored 3-paragraph cover letters aligned with any job description.", href: "/tools/cover-letter", accent: "from-primary/20 to-accent/10" },
  { icon: Linkedin, title: "LinkedIn Optimizer", description: "Optimize your About, headline, and skills for recruiter visibility.", href: "/tools/linkedin", accent: "from-accent/20 to-primary/10" },
  { icon: Calendar, title: "Job Search Planner", description: "Structured 7-day plans balancing applications, networking, and prep.", href: "/tools/planner", accent: "from-primary/20 to-accent/10" },
];

const resumeTools = [
  { icon: Wand2, title: "Tailor My Resume", description: "Rewrite your resume for a target role using a JD.", href: "/tools/resume-tailor", accent: "from-primary/20 to-accent/10" },
  { icon: ListChecks, title: "Improve Resume Bullets", description: "Turn weak bullets into achievement-focused statements.", href: "/tools/bullet-improve", accent: "from-accent/20 to-primary/10" },
  { icon: AlignLeft, title: "Build a Resume Summary", description: "Short, standard, and ATS-optimized summaries.", href: "/tools/resume-summary", accent: "from-primary/20 to-accent/10" },
  { icon: ScanSearch, title: "Optimize Resume for ATS", description: "Find gaps and get an ATS-friendly rewrite.", href: "/tools/resume-ats", accent: "from-accent/20 to-primary/10" },
  { icon: Repeat, title: "Rewrite for Career Change", description: "Reposition transferable skills toward a new role.", href: "/tools/career-change", accent: "from-primary/20 to-accent/10" },
  { icon: PenLine, title: "Create Resume Bullets", description: "Turn raw work notes into 5–7 strong bullets.", href: "/tools/bullet-create", accent: "from-accent/20 to-primary/10" },
  { icon: Crown, title: "Sound More Senior", description: "Reframe your resume for a senior-level role.", href: "/tools/resume-seniorize", accent: "from-primary/20 to-accent/10" },
  { icon: GraduationCap, title: "Limited-Experience Resume", description: "Strong entry-level resume built around education and projects.", href: "/tools/entry-resume", accent: "from-accent/20 to-primary/10" },
  { icon: LayoutTemplate, title: "Improve Resume Layout", description: "Recruiter-friendly review of structure and section order.", href: "/tools/resume-layout", accent: "from-primary/20 to-accent/10" },
  { icon: Library, title: "Create a Master Resume", description: "Comprehensive resume + per-application tailoring guide.", href: "/tools/master-resume", accent: "from-accent/20 to-primary/10" },
];

const features = [
  { icon: Sparkles, title: "AI-Powered", description: "Advanced LLMs tuned for career outcomes" },
  { icon: Zap, title: "Instant Results", description: "Streamed output in seconds, not hours" },
  { icon: Shield, title: "ATS-Optimized", description: "Pass tracking systems with confidence" },
  { icon: TrendingUp, title: "PDF & DOCX Export", description: "Download polished outputs in one click" },
];

const stats = [
  { value: "50k+", label: "Resumes Optimized" },
  { value: "92%", label: "Interview Rate" },
  { value: "17", label: "AI Tools" },
  { value: "4.9★", label: "User Rating" },
];

const testimonials = [
  {
    quote: "JOBFIT AI rewrote my resume and I started getting callbacks within a week. The JD Aligner showed me exactly what was missing.",
    name: "Priya S.",
    role: "Senior Product Manager",
    initials: "PS",
  },
  {
    quote: "The Resume Ranker saved my team hours of manual screening. We shortlist candidates 5x faster with explainable scores.",
    name: "Marcus L.",
    role: "Engineering Lead",
    initials: "ML",
  },
  {
    quote: "STAR-format interview answers helped me land an offer at a top-tier startup. The prep felt like having a real coach.",
    name: "Aisha K.",
    role: "Data Scientist",
    initials: "AK",
  },
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
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px]" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" /> AI-Powered Career Optimization
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-[1.05] mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Land Your Dream Job with <span className="text-gradient">AI Precision</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Optimize resumes, align with job descriptions, ace interviews, and rank candidates — all powered by advanced AI with visual analytics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in mb-12" style={{ animationDelay: "0.3s" }}>
              <Button size="lg" className="text-base px-8 shadow-glow" asChild>
                <Link to="/dashboard">Start Free <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8" asChild>
                <Link to="/dashboard">Explore Tools</Link>
              </Button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> No credit card</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Free to start</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> PDF uploads</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {stats.map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-5 text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="py-16 border-y border-border/30 bg-card/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                  <f.icon className="w-5 h-5 text-primary-foreground" />
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
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4">
              <Award className="w-3 h-3 text-primary" /> Complete Toolkit
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Every Stage of Your <span className="text-gradient">Job Search</span>
            </h2>
            <p className="text-muted-foreground">
              Seven core AI tools — plus a ten-tool Resume Suite that rewrites, tailors, and levels up every part of your resume.
            </p>
          </div>

          <h3 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-wider mb-5">Core Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {coreTools.map((tool, i) => (
              <Link
                key={tool.title}
                to={tool.href}
                className="group relative glass-card rounded-xl p-6 shadow-card hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow group-hover:scale-110 transition-transform">
                    <tool.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                  <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Try it <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-baseline justify-between mb-5">
            <h3 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-wider">Resume Suite</h3>
            <span className="text-xs text-muted-foreground">10 focused tools</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumeTools.map((tool, i) => (
              <Link
                key={tool.title}
                to={tool.href}
                className="group relative glass-card rounded-xl p-6 shadow-card hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${0.03 * i}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow group-hover:scale-110 transition-transform">
                    <tool.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                  <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Try it <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-t border-border/30 bg-card/20">
        <div className="container">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4">
              <Users className="w-3 h-3 text-primary" /> Loved by Job Seekers
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Results that <span className="text-gradient">Speak</span>
            </h2>
            <p className="text-muted-foreground">Real stories from candidates who got hired.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={t.name} className="glass-card rounded-xl p-6 shadow-card animate-fade-in flex flex-col" style={{ animationDelay: `${0.1 * i}s` }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed mb-6 flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-display font-semibold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <div className="glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/15 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-accent/10 blur-[100px] rounded-full" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                Ready to Transform Your <span className="text-gradient">Job Search</span>?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands using AI to land roles faster. Free to start, no card required.
              </p>
              <Button size="lg" className="text-base px-8 shadow-glow" asChild>
                <Link to="/dashboard">Get Started Free <ArrowRight className="w-4 h-4 ml-2" /></Link>
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
