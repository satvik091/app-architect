import ToolPage from "@/components/ToolPage";

const JDAligner = () => (
  <ToolPage
    title="JD Aligner"
    description="Match your resume against a job description to get alignment scores and improvement suggestions."
    inputFields={[
      { key: "resume", label: "Your Resume", placeholder: "Paste your resume text...", type: "textarea" },
      { key: "jd", label: "Job Description", placeholder: "Paste the job description...", type: "textarea" },
    ]}
    generateResult={(inputs) =>
      `📊 Alignment Score: 72/100\n\n✅ Hard Skills Match (8/12)\n• JavaScript ✓\n• React ✓\n• TypeScript ✓\n• Node.js ✓\n• Python ✓\n• AWS ✓\n• Docker ✓\n• GraphQL ✓\n• Kubernetes ✗\n• Terraform ✗\n• CI/CD ✗\n• MongoDB ✗\n\n✅ Soft Skills Match (4/5)\n• Leadership ✓\n• Communication ✓\n• Problem-solving ✓\n• Team collaboration ✓\n• Mentoring ✗\n\n🔑 Missing Keywords\n• "microservices architecture"\n• "agile methodology"\n• "system design"\n\n💡 Suggestions\n1. Add Kubernetes experience or relevant container orchestration skills\n2. Highlight any CI/CD pipeline experience\n3. Include "microservices" terminology in your experience section\n4. Mention agile/scrum methodology in your work history`
    }
  />
);

export default JDAligner;
