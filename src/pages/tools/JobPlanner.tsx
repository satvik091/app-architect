import ToolPage from "@/components/ToolPage";

const JobPlanner = () => (
  <ToolPage
    title="Job Search Planner"
    description="Get a structured 7-day plan balancing applications, networking, interview prep, and skill building."
    toolType="job-plan"
    inputFields={[
      { key: "Target Role", label: "Target Role", placeholder: "e.g. Frontend Developer", type: "input" },
      { key: "Hours Available Per Day", label: "Hours Available Per Day", placeholder: "e.g. 4", type: "input" },
      { key: "Current Situation", label: "Current Situation", placeholder: "Briefly describe where you are in your job search...", type: "textarea" },
    ]}
  />
);

export default JobPlanner;
