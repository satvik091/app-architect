import ToolPage from "@/components/ToolPage";

const BulletImprover = () => (
  <ToolPage
    title="Improve Resume Bullets"
    description="Rewrite weak bullets into achievement-focused statements using Action + Task + Tool + Result."
    toolType="bullet-improve"
    inputFields={[
      { key: "Job Title", label: "Your Role / Job Title", placeholder: "e.g. Data Analyst", type: "input" },
      { key: "Industry", label: "Industry", placeholder: "e.g. Fintech, Healthcare, SaaS", type: "input" },
      { key: "Bullets", label: "Current Bullets", placeholder: "Paste each bullet on a new line", type: "textarea" },
    ]}
  />
);

export default BulletImprover;
