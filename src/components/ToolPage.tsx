import { useState } from "react";
import { ArrowLeft, Loader2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import PdfUpload from "@/components/PdfUpload";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { streamAI } from "@/lib/ai-stream";

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
}

const ToolPage = ({ title, description, toolType, inputFields }: ToolPageProps) => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

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

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
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
                    className="bg-card border-border min-h-[250px] resize-none"
                  />
                </div>
              );
            })}
            <Button onClick={handleGenerate} disabled={loading} className="w-full shadow-glow">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</> : "Generate"}
            </Button>
          </div>

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
              <div className="whitespace-pre-wrap text-sm text-secondary-foreground leading-relaxed">{result}</div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">
                {loading ? "Processing..." : "Results will appear here"}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ToolPage;
