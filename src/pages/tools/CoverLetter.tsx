import ToolPage from "@/components/ToolPage";

const CoverLetter = () => (
  <ToolPage
    title="Cover Letter Generator"
    description="Create a tailored 3-paragraph cover letter aligned with any job description."
    toolType="cover-letter"
    inputFields={[
      { key: "Job Title and Company", label: "Job Title & Company", placeholder: "e.g. Senior Engineer at Stripe", type: "input" },
      { key: "Job Description", label: "Job Description", placeholder: "Paste the job description...", type: "textarea" },
      { key: "Your Background", label: "Your Background", placeholder: "Key highlights from your experience...", type: "textarea" },
    ]}
  />
);

export default CoverLetter;
