import { Link } from "react-router-dom";
import {
  FileText, Target, MessageSquare, Mail, Linkedin, Calendar, ArrowRight, BarChart3,
  Wand2, ListChecks, AlignLeft, ScanSearch, Repeat, PenLine, Crown, GraduationCap, LayoutTemplate, Library,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

type Tool = {
  icon: typeof FileText;
  title: string;
  description: string;
  href: string;
  color: string;
};

const coreTools: Tool[] = [
  { icon: FileText, title: "Resume Optimizer", description: "ATS-optimized resume with keyword enhancement.", href: "/tools/resume", color: "from-teal-500/20 to-cyan-500/20" },
  { icon: Target, title: "JD Aligner", description: "Match your resume to a job description with alignment scores.", href: "/tools/jd-align", color: "from-blue-500/20 to-indigo-500/20" },
  { icon: MessageSquare, title: "Interview Prep", description: "Role-specific questions with STAR-format answers.", href: "/tools/interview", color: "from-violet-500/20 to-purple-500/20" },
  { icon: Mail, title: "Cover Letter", description: "Tailored cover letters aligned with any JD.", href: "/tools/cover-letter", color: "from-orange-500/20 to-amber-500/20" },
  { icon: Linkedin, title: "LinkedIn Optimizer", description: "Profile headline, About, and skills upgrade.", href: "/tools/linkedin", color: "from-sky-500/20 to-blue-500/20" },
  { icon: Calendar, title: "Job Search Planner", description: "Structured 7-day job search plan.", href: "/tools/planner", color: "from-emerald-500/20 to-green-500/20" },
  { icon: BarChart3, title: "Resume Ranker", description: "Rank multiple resumes against a JD.", href: "/tools/resume-ranker", color: "from-rose-500/20 to-pink-500/20" },
];

const resumeTools: Tool[] = [
  { icon: Wand2, title: "Tailor My Resume", description: "Rewrite your resume for a target role using a JD.", href: "/tools/resume-tailor", color: "from-teal-500/20 to-emerald-500/20" },
  { icon: ListChecks, title: "Improve Resume Bullets", description: "Turn weak bullets into achievement-focused statements.", href: "/tools/bullet-improve", color: "from-indigo-500/20 to-blue-500/20" },
  { icon: AlignLeft, title: "Build a Resume Summary", description: "Short, standard, and ATS-optimized summaries.", href: "/tools/resume-summary", color: "from-amber-500/20 to-orange-500/20" },
  { icon: ScanSearch, title: "Optimize Resume for ATS", description: "Find gaps and get an ATS-friendly rewrite.", href: "/tools/resume-ats", color: "from-cyan-500/20 to-teal-500/20" },
  { icon: Repeat, title: "Rewrite for Career Change", description: "Reposition transferable skills toward a new role.", href: "/tools/career-change", color: "from-violet-500/20 to-fuchsia-500/20" },
  { icon: PenLine, title: "Create Resume Bullets", description: "Turn raw work notes into 5–7 strong bullets.", href: "/tools/bullet-create", color: "from-pink-500/20 to-rose-500/20" },
  { icon: Crown, title: "Sound More Senior", description: "Reframe your resume for a senior-level role.", href: "/tools/resume-seniorize", color: "from-yellow-500/20 to-amber-500/20" },
  { icon: GraduationCap, title: "Resume With Limited Experience", description: "Build a strong entry-level resume around education and projects.", href: "/tools/entry-resume", color: "from-green-500/20 to-emerald-500/20" },
  { icon: LayoutTemplate, title: "Improve Resume Layout", description: "Recruiter-friendly review of structure and section order.", href: "/tools/resume-layout", color: "from-blue-500/20 to-sky-500/20" },
  { icon: Library, title: "Create a Master Resume", description: "Comprehensive resume + per-application tailoring guide.", href: "/tools/master-resume", color: "from-purple-500/20 to-indigo-500/20" },
];

const ToolGrid = ({ tools }: { tools: Tool[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {tools.map((tool) => (
      <Link
        key={tool.title}
        to={tool.href}
        className="group glass-card rounded-xl p-5 shadow-card hover:border-primary/30 transition-all duration-300"
      >
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3`}>
          <tool.icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-display font-semibold text-foreground mb-1.5">{tool.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
        <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          Open <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    ))}
  </div>
);

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Choose a tool to optimize your job search.</p>
        </div>

        <section className="mb-10">
          <h2 className="text-lg font-display font-semibold text-foreground mb-4">Core Tools</h2>
          <ToolGrid tools={coreTools} />
        </section>

        <section>
          <h2 className="text-lg font-display font-semibold text-foreground mb-1">Resume Suite</h2>
          <p className="text-sm text-muted-foreground mb-4">Ten focused tools to write, tailor, and level up every part of your resume.</p>
          <ToolGrid tools={resumeTools} />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
