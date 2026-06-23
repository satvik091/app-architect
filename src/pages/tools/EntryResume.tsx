import ToolPage from "@/components/ToolPage";

const EntryResume = () => (
  <ToolPage
    title="Fix My Resume With Limited Experience"
    description="Build a strong resume around your education, projects, and transferable skills — tailored to the target JD."
    toolType="entry-resume"
    inputFields={[
      { key: "Job Title", label: "Target Job Title", placeholder: "e.g. Junior Software Engineer", type: "input" },
      { key: "Education", label: "Education", placeholder: "Degree, school, coursework, GPA (optional)", type: "textarea" },
      { key: "Projects", label: "Projects", placeholder: "Personal, academic, or open-source projects", type: "textarea" },
      { key: "Experience", label: "Any Experience", placeholder: "Internships, part-time, volunteer", type: "textarea" },
      { key: "Skills", label: "Skills", placeholder: "Comma-separated", type: "textarea" },
      { key: "Tools", label: "Tools & Tech", placeholder: "e.g. Python, Git, Figma", type: "textarea" },
      { key: "Job Description", label: "Target Job Description (PDF)", placeholder: "Upload the JD PDF", type: "pdf" },
    ]}
  />
);

export default EntryResume;
