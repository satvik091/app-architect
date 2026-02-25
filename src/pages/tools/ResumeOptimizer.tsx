import { useState } from "react";
import { ArrowLeft, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const ResumeOptimizer = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleOptimize = async () => {
    if (!resumeText.trim() || !jobTitle.trim()) {
      toast({ title: "Missing fields", description: "Please provide both your resume and target job title.", variant: "destructive" });
      return;
    }
    setLoading(true);
    // Simulate AI processing
    await new Promise((r) => setTimeout(r, 2500));
    setResult(
      `# Optimized Resume for ${jobTitle}\n\n## Professional Summary\nResults-driven professional with proven expertise in ${jobTitle.toLowerCase()}-related competencies. Demonstrated track record of delivering measurable outcomes and driving organizational success through strategic initiatives.\n\n## Key Achievements\n• Increased team productivity by 35% through implementation of streamlined workflows\n• Led cross-functional projects resulting in $2.1M revenue growth\n• Developed and deployed scalable solutions serving 50K+ users\n• Reduced operational costs by 28% through process automation\n\n## ATS Keywords Added\n✅ Leadership & Strategy\n✅ Data-Driven Decision Making\n✅ Cross-functional Collaboration\n✅ Process Optimization\n✅ Stakeholder Management\n\n## Recommendations\n1. Add quantifiable metrics to each bullet point\n2. Include industry-specific keywords from target job descriptions\n3. Use action verbs at the beginning of each accomplishment\n4. Keep formatting ATS-friendly (no tables, images, or complex layouts)`
    );
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Resume Optimizer</h1>
          <p className="text-muted-foreground">Paste your resume and target job title to get an ATS-optimized version.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Target Job Title</label>
              <Input
                placeholder="e.g. Senior Software Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="bg-card border-border"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Your Resume</label>
              <Textarea
                placeholder="Paste your full resume text here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="bg-card border-border min-h-[300px] resize-none"
              />
            </div>
            <Button onClick={handleOptimize} disabled={loading} className="w-full shadow-glow">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Optimizing...
                </>
              ) : (
                "Optimize Resume"
              )}
            </Button>
          </div>

          {/* Output */}
          <div className="glass-card rounded-xl p-5 relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-foreground text-sm">AI Output</h3>
              {result && (
                <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
                  {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              )}
            </div>
            {result ? (
              <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap text-sm text-secondary-foreground leading-relaxed">
                {result}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">
                {loading ? "Analyzing your resume..." : "Results will appear here"}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResumeOptimizer;
