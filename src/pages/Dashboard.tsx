import { Link } from "react-router-dom";
import { FileText, Target, MessageSquare, Mail, Linkedin, Calendar, ArrowRight } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const tools = [
  {
    icon: FileText,
    title: "Resume Optimizer",
    description: "Optimize your resume for ATS systems with AI-powered keyword enhancement.",
    href: "/tools/resume",
    color: "from-teal-500/20 to-cyan-500/20",
  },
  {
    icon: Target,
    title: "JD Aligner",
    description: "Match your resume to specific job descriptions and get alignment scores.",
    href: "/tools/jd-align",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: MessageSquare,
    title: "Interview Prep",
    description: "Generate role-specific questions with structured STAR-format answers.",
    href: "/tools/interview",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Mail,
    title: "Cover Letter",
    description: "Create tailored cover letters aligned with any job description.",
    href: "/tools/cover-letter",
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    icon: Linkedin,
    title: "LinkedIn Optimizer",
    description: "Optimize your profile headline, about section, and skills.",
    href: "/tools/linkedin",
    color: "from-sky-500/20 to-blue-500/20",
  },
  {
    icon: Calendar,
    title: "Job Search Planner",
    description: "Get a structured 7-day plan for your job search activities.",
    href: "/tools/planner",
    color: "from-emerald-500/20 to-green-500/20",
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Choose a tool to optimize your job search.</p>
        </div>

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
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
