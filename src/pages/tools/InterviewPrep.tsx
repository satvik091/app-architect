import ToolPage from "@/components/ToolPage";

const InterviewPrep = () => (
  <ToolPage
    title="Interview Prep"
    description="Generate 10 role-specific interview questions with structured STAR-format answers."
    inputFields={[
      { key: "role", label: "Target Role", placeholder: "e.g. Product Manager at Google", type: "input" },
      { key: "experience", label: "Your Experience Summary", placeholder: "Briefly describe your relevant experience...", type: "textarea" },
    ]}
    generateResult={(inputs) =>
      `🎯 Interview Prep for ${inputs.role}\n\n─── Question 1 ───\n"Tell me about a time you led a cross-functional project."\n\n⭐ STAR Answer:\nSituation: Led a product launch involving engineering, design, and marketing teams.\nTask: Needed to coordinate 15 people across 3 time zones with a tight 6-week deadline.\nAction: Created a shared project timeline, held daily standups, and established clear ownership for each workstream.\nResult: Launched on time with 98% feature completion, generating $500K in first-month revenue.\n\n─── Question 2 ───\n"How do you handle conflicting priorities from stakeholders?"\n\n⭐ STAR Answer:\nSituation: Two VPs requested competing features for the same sprint.\nTask: Had to align both requests with business impact and resource constraints.\nAction: Created an impact-effort matrix, presented data-driven recommendations, and facilitated a prioritization meeting.\nResult: Both stakeholders agreed on a phased approach, and we delivered the higher-impact feature first, increasing user engagement by 23%.\n\n─── Question 3-10 ───\n(Enable AI backend to generate full set of 10 questions)`
    }
  />
);

export default InterviewPrep;
