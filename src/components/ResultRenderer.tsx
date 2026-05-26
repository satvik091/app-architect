import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles } from "lucide-react";
import AnalyticsCharts from "./AnalyticsCharts";

interface Props {
  toolType: string;
  text: string;
}

// Extract TL;DR line
function extractTldr(text: string): string | null {
  const m = text.match(/\*\*TL;DR:\*\*\s*(.+?)(?:\n|$)/i) || text.match(/TL;DR:\s*(.+?)(?:\n|$)/i);
  return m ? m[1].trim() : null;
}

// Extract all "**Label:** NN/100" pairs from the scores block
function extractAllScores(text: string): { label: string; value: number }[] {
  const scores: { label: string; value: number }[] = [];
  const re = /\*\*([A-Za-z][A-Za-z &\-/]+?):\*\*\s*(\d{1,3})\s*\/\s*100/g;
  let m: RegExpExecArray | null;
  const seen = new Set<string>();
  while ((m = re.exec(text)) !== null) {
    const label = m[1].trim();
    if (seen.has(label.toLowerCase())) continue;
    seen.add(label.toLowerCase());
    scores.push({ label, value: Math.min(100, parseInt(m[2], 10)) });
    if (scores.length >= 6) break;
  }
  return scores;
}

const ScoreChip = ({ label, value }: { label: string; value: number }) => {
  const color = value >= 80 ? "text-primary" : value >= 60 ? "text-accent" : "text-destructive";
  const bar = value >= 80 ? "bg-primary" : value >= 60 ? "bg-accent" : "bg-destructive";
  return (
    <div className="rounded-lg border border-border/60 bg-card/60 p-3">
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold truncate">{label}</span>
        <span className={`text-lg font-display font-bold ${color}`}>{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={`h-full ${bar} transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};

const ResultRenderer = ({ toolType, text }: Props) => {
  const tldr = useMemo(() => extractTldr(text), [text]);
  const scores = useMemo(() => extractAllScores(text), [text]);

  // Strip the TL;DR line from the body so it isn't duplicated under the callout
  const body = useMemo(() => text.replace(/^\s*\*\*TL;DR:\*\*.*\n?/im, "").trim(), [text]);

  return (
    <div className="space-y-5">
      {tldr && (
        <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-4 flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-primary font-semibold mb-1">Summary</div>
            <p className="text-sm text-foreground leading-relaxed">{tldr}</p>
          </div>
        </div>
      )}

      {scores.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {scores.map((s) => <ScoreChip key={s.label} {...s} />)}
        </div>
      )}

      <AnalyticsCharts toolType={toolType} text={text} />

      <div className="rounded-xl border border-border/50 bg-card/40 p-5">
        <article
          className="prose prose-invert prose-sm max-w-none
            prose-headings:font-display prose-headings:text-foreground prose-headings:tracking-tight
            prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border/60 prose-h2:first:mt-0
            prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2 prose-h3:text-primary
            prose-p:text-foreground/90 prose-p:leading-relaxed
            prose-strong:text-foreground prose-strong:font-semibold
            prose-li:text-foreground/90 prose-li:my-0.5
            prose-ul:my-2 prose-ol:my-2
            prose-table:text-xs prose-table:border prose-table:border-border/60
            prose-th:bg-muted/40 prose-th:text-foreground prose-th:font-semibold prose-th:px-3 prose-th:py-2 prose-th:border prose-th:border-border/60 prose-th:text-left
            prose-td:px-3 prose-td:py-2 prose-td:border prose-td:border-border/60 prose-td:align-top
            prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-foreground/80
            prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-hr:border-border/60"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default ResultRenderer;
