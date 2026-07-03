import { useState } from "react";
import { ArrowLeft, Loader2, Copy, Check, Save, Download, Sparkles, ChevronDown, FileText, FileType2, FileCode } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PdfUpload from "@/components/PdfUpload";
import DashboardLayout from "@/components/DashboardLayout";
import ResultRenderer from "@/components/ResultRenderer";
import { useToast } from "@/hooks/use-toast";
import { streamAI } from "@/lib/ai-stream";
import { downloadPdf, downloadDocx } from "@/lib/export-utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface InputField {
  key: string;
  label: string;
  placeholder: string;
  type: "input" | "textarea" | "pdf" | "pdf-multiple";
}

interface ToolPageProps {
  title: string;
  description: string;
  toolType: string;
  inputFields: InputField[];
  resultHeading?: string;
  resultSubheading?: string;
  generateLabel?: string;
}

const RESULT_META: Record<string, { heading: string; sub: string; cta?: string }> = {
  "resume-optimize": { heading: "Optimized Resume", sub: "ATS-ready rewrite with keyword and impact upgrades", cta: "Optimize Resume" },
  "jd-align": { heading: "JD Alignment Report", sub: "Match score, keyword gaps & tailoring suggestions", cta: "Align Resume" },
  "resume-ranker": { heading: "Candidate Ranking", sub: "Ranked shortlist with fit scores and rationale", cta: "Rank Resumes" },
  "interview": { heading: "Interview Prep Kit", sub: "Role-specific questions with STAR-format answers", cta: "Generate Questions" },
  "cover-letter": { heading: "Tailored Cover Letter", sub: "3-paragraph letter aligned to the job description", cta: "Write Cover Letter" },
  "linkedin": { heading: "LinkedIn Profile Upgrade", sub: "Headline, About & skills tuned for recruiter search", cta: "Optimize Profile" },
  "planner": { heading: "7-Day Job Search Plan", sub: "Daily actions across applications, networking & prep", cta: "Build Plan" },
  "resume-tailor": { heading: "Tailored Resume", sub: "Rewritten for the target role with ATS keywords", cta: "Tailor Resume" },
  "bullet-improve": { heading: "Improved Bullets", sub: "Achievement-focused rewrites with metric prompts", cta: "Improve Bullets" },
  "resume-summary": { heading: "Resume Summary", sub: "Short, standard & ATS-optimized summary variants", cta: "Write Summary" },
  "resume-ats": { heading: "ATS Optimization Report", sub: "Gap analysis with an ATS-friendly rewrite", cta: "Run ATS Check" },
  "career-change": { heading: "Career-Change Resume", sub: "Transferable skills repositioned for the new role", cta: "Rewrite for New Role" },
  "bullet-create": { heading: "Generated Resume Bullets", sub: "5–7 strong bullets built from your raw notes", cta: "Create Bullets" },
  "resume-seniorize": { heading: "Senior-Level Resume", sub: "Reframed with scope, ownership & strategic impact", cta: "Level Up Resume" },
  "entry-resume": { heading: "Entry-Level Resume", sub: "Built around education, projects & transferable skills", cta: "Build Resume" },
  "resume-layout": { heading: "Layout & Structure Review", sub: "Recruiter-friendly section order and formatting fixes", cta: "Review Layout" },
  "master-resume": { heading: "Master Resume", sub: "Comprehensive resume + per-application tailoring guide", cta: "Build Master Resume" },
};

const ToolPage = ({ title, description, toolType, inputFields, resultHeading, resultSubheading, generateLabel }: ToolPageProps) => {
  const meta = RESULT_META[toolType];
  const heading = resultHeading ?? meta?.heading ?? "Result";
  const sub = resultSubheading ?? meta?.sub ?? "Structured output for your request";
  const ctaLabel = generateLabel ?? meta?.cta ?? "Generate";
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleGenerate = async () => {
    const missing = inputFields.some((f) => !inputs[f.key]?.trim());
    if (missing) {
      toast({ title: "Missing fields", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setResult("");

    await streamAI({
      toolType,
      inputs,
      onDelta: (text) => setResult((prev) => prev + text),
      onDone: () => setLoading(false),
      onError: (error) => {
        toast({ title: "Error", description: error, variant: "destructive" });
        setLoading(false);
      },
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!result || !user) return;
    setSaving(true);
    const { error } = await supabase.from("saved_documents").insert({
      user_id: user.id,
      document_type: toolType,
      title: `${title} - ${new Date().toLocaleDateString()}`,
      content: result,
    });
    setSaving(false);
    toast(error
      ? { title: "Save failed", description: error.message, variant: "destructive" }
      : { title: "Saved!", description: "Output saved to your documents." }
    );
  };

  const downloadBase = `${toolType}-${Date.now()}`;

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${downloadBase}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    if (!result) return;
    try {
      downloadPdf(result, `${downloadBase}.pdf`, title);
    } catch (e) {
      toast({ title: "PDF export failed", description: e instanceof Error ? e.message : "Unknown error", variant: "destructive" });
    }
  };

  const handleDownloadDocx = async () => {
    if (!result) return;
    try {
      await downloadDocx(result, `${downloadBase}.docx`, title);
    } catch (e) {
      toast({ title: "DOCX export failed", description: e instanceof Error ? e.message : "Unknown error", variant: "destructive" });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="glass-card rounded-xl p-5 mb-6">
          <div className={`grid gap-4 ${inputFields.length > 1 ? "md:grid-cols-2" : "grid-cols-1"}`}>
            {inputFields.map((field) => {
              if (field.type === "pdf") {
                return (
                  <PdfUpload
                    key={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    onTextExtracted={(text) => setInputs((prev) => ({ ...prev, [field.key]: text }))}
                  />
                );
              }
              if (field.type === "pdf-multiple") {
                return (
                  <PdfUpload
                    key={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    multiple
                    onTextExtracted={(text) => setInputs((prev) => ({ ...prev, [field.key]: text }))}
                    onMultipleExtracted={(results) => {
                      const combined = results.map((r, i) => `--- Resume ${i + 1}: ${r.name} ---\n${r.text}`).join("\n\n");
                      setInputs((prev) => ({ ...prev, [field.key]: combined }));
                    }}
                  />
                );
              }
              if (field.type === "input") {
                return (
                  <div key={field.key}>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">{field.label}</label>
                    <Input
                      placeholder={field.placeholder}
                      value={inputs[field.key] || ""}
                      onChange={(e) => setInputs((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="bg-card border-border"
                    />
                  </div>
                );
              }
              return (
                <div key={field.key}>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">{field.label}</label>
                  <Textarea
                    placeholder={field.placeholder}
                    value={inputs[field.key] || ""}
                    onChange={(e) => setInputs((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    className="bg-card border-border min-h-[150px] resize-none"
                  />
                </div>
              );
            })}
          </div>
          <Button onClick={handleGenerate} disabled={loading} className="w-full shadow-glow mt-4">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : ctaLabel}
          </Button>
        </div>

        <div className="rounded-xl border border-border/50 bg-card/30 p-5">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/40">
            <div>
              <h3 className="font-display font-semibold text-foreground">{heading}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
            </div>
            {result && (
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
                  {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSave} disabled={saving} className="h-8">
                  {saving ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1" />}
                  Save
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Download className="w-3.5 h-3.5 mr-1" /> Download
                      <ChevronDown className="w-3 h-3 ml-1 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleDownloadPdf}>
                      <FileType2 className="w-4 h-4 mr-2" /> PDF (.pdf)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDownloadDocx}>
                      <FileText className="w-4 h-4 mr-2" /> Word (.docx)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDownloadTxt}>
                      <FileCode className="w-4 h-4 mr-2" /> Plain text (.txt)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
          {result ? (
            <ResultRenderer toolType={toolType} text={result} />
          ) : (
            <div className="flex flex-col items-center justify-center h-[320px] text-muted-foreground text-sm gap-2">
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <span>Analyzing your inputs…</span>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-xl border border-dashed border-border/60 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-muted-foreground/60" />
                  </div>
                  <span>Your AI analysis will appear here</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ToolPage;
