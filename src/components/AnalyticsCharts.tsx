import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Cell,
} from "recharts";

interface Props {
  toolType: string;
  text: string;
}

const PRIMARY = "hsl(168 76% 42%)";
const ACCENT = "hsl(190 80% 50%)";
const MUTED = "hsl(222 30% 22%)";
const COLORS = [PRIMARY, ACCENT, "hsl(260 70% 60%)", "hsl(30 90% 55%)", "hsl(340 75% 55%)"];

function extractScore(text: string, label: string): number | null {
  const re = new RegExp(`${label}[^0-9\\n]{0,40}(\\d{1,3})\\s*(?:/|out of)\\s*100`, "i");
  const m = text.match(re);
  if (m) return Math.min(100, parseInt(m[1], 10));
  return null;
}

function extractAlignScores(text: string) {
  return [
    { name: "Overall", value: extractScore(text, "Overall Match") },
    { name: "Hard Skills", value: extractScore(text, "Hard Skills") },
    { name: "Soft Skills", value: extractScore(text, "Soft Skills") },
    { name: "Keywords", value: extractScore(text, "Keyword Coverage") },
  ].filter((s) => s.value !== null) as { name: string; value: number }[];
}

function extractOptimizeScore(text: string): number | null {
  return (
    extractScore(text, "ATS Optimization Score") ??
    extractScore(text, "ATS Score") ??
    extractScore(text, "Optimization Score")
  );
}

function extractRanked(text: string) {
  const out: { name: string; score: number }[] = [];
  const re = /Rank\s*\d+\s*:\s*([^\n]+?)\s*\n[\s\S]{0,200}?Fit Score\s*:\s*(\d{1,3})/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    out.push({ name: m[1].trim().slice(0, 32), score: Math.min(100, parseInt(m[2], 10)) });
  }
  return out;
}

const Gauge = ({ value, label }: { value: number; label: string }) => {
  const data = [{ name: label, value }];
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-40">
        <ResponsiveContainer>
          <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar background={{ fill: MUTED }} dataKey="value" cornerRadius={20} fill={PRIMARY} />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground" style={{ fontSize: 28, fontWeight: 700 }}>
              {value}
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground -mt-2">{label}</p>
    </div>
  );
};

const AnalyticsCharts = ({ toolType, text }: Props) => {
  const content = useMemo(() => {
    if (toolType === "jd-align") {
      const scores = extractAlignScores(text);
      if (!scores.length) return null;
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {scores.map((s) => (
            <Gauge key={s.name} value={s.value} label={s.name} />
          ))}
        </div>
      );
    }
    if (toolType === "resume-optimize") {
      const score = extractOptimizeScore(text);
      if (score === null) return null;
      return (
        <div className="max-w-xs mx-auto">
          <Gauge value={score} label="ATS Optimization Score" />
        </div>
      );
    }
    if (toolType === "resume-rank") {
      const ranked = extractRanked(text);
      if (!ranked.length) return null;
      return (
        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={ranked} layout="vertical" margin={{ left: 8, right: 24 }}>
              <CartesianGrid stroke={MUTED} strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} stroke="hsl(215 20% 55%)" fontSize={11} />
              <YAxis type="category" dataKey="name" stroke="hsl(215 20% 55%)" fontSize={11} width={120} />
              <Tooltip
                cursor={{ fill: "hsl(222 30% 14% / 0.5)" }}
                contentStyle={{ background: "hsl(222 44% 9%)", border: "1px solid hsl(222 30% 18%)", borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                {ranked.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }
    return null;
  }, [toolType, text]);

  if (!content) return null;

  return (
    <div className="mb-4 pb-4 border-b border-border/50">
      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">Visual Analytics</h4>
      {content}
    </div>
  );
};

export default AnalyticsCharts;
