import ToolPage from "@/components/ToolPage";

const CoverLetter = () => (
  <ToolPage
    title="Cover Letter Generator"
    description="Create a tailored 3-paragraph cover letter aligned with any job description."
    inputFields={[
      { key: "role", label: "Job Title & Company", placeholder: "e.g. Senior Engineer at Stripe", type: "input" },
      { key: "jd", label: "Job Description", placeholder: "Paste the job description...", type: "textarea" },
      { key: "background", label: "Your Background", placeholder: "Key highlights from your experience...", type: "textarea" },
    ]}
    generateResult={(inputs) =>
      `Dear Hiring Manager,\n\nI am writing to express my strong interest in the ${inputs.role} position. With a proven track record of delivering high-impact solutions and a deep passion for building products that scale, I am excited about the opportunity to contribute to your team's mission.\n\nIn my current role, I have successfully led initiatives that resulted in measurable business outcomes, including a 40% improvement in system performance and the launch of features serving over 100K daily active users. My experience aligns closely with the requirements outlined in your job description, particularly in areas of technical leadership, cross-functional collaboration, and data-driven decision-making.\n\nI am particularly drawn to this opportunity because of the company's commitment to innovation and engineering excellence. I would welcome the chance to discuss how my background, skills, and enthusiasm can contribute to your team's continued success. Thank you for considering my application.\n\nBest regards,\n[Your Name]`
    }
  />
);

export default CoverLetter;
