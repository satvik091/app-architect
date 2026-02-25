import ToolPage from "@/components/ToolPage";

const JobPlanner = () => (
  <ToolPage
    title="Job Search Planner"
    description="Get a structured 7-day plan balancing applications, networking, interview prep, and skill building."
    inputFields={[
      { key: "role", label: "Target Role", placeholder: "e.g. Frontend Developer", type: "input" },
      { key: "hours", label: "Hours Available Per Day", placeholder: "e.g. 4", type: "input" },
      { key: "situation", label: "Current Situation", placeholder: "Briefly describe where you are in your job search...", type: "textarea" },
    ]}
    generateResult={(inputs) =>
      `📅 7-Day Job Search Plan for ${inputs.role}\n\n─── Monday: Applications ───\n• Research 5 target companies (1hr)\n• Customize resume for 3 roles (1.5hr)\n• Submit 3 applications (1hr)\n• Update tracking spreadsheet (0.5hr)\n\n─── Tuesday: Networking ───\n• Send 10 personalized LinkedIn connection requests (1hr)\n• Follow up with 3 existing contacts (0.5hr)\n• Attend 1 virtual networking event or webinar (1.5hr)\n• Post industry-relevant content on LinkedIn (1hr)\n\n─── Wednesday: Skill Building ───\n• Complete 1 online course module (2hr)\n• Build or contribute to a side project (1.5hr)\n• Read 2 industry articles/blogs (0.5hr)\n\n─── Thursday: Interview Prep ───\n• Practice 5 behavioral questions (STAR format) (1.5hr)\n• Do 1 mock technical interview (1hr)\n• Research common questions for target companies (1hr)\n• Review and refine your elevator pitch (0.5hr)\n\n─── Friday: Applications + Follow-up ───\n• Submit 3 more tailored applications (1.5hr)\n• Send follow-up emails to previous applications (1hr)\n• Update LinkedIn profile with new skills (1hr)\n• Review weekly progress (0.5hr)\n\n─── Saturday: Deep Work ───\n• Work on portfolio project (2hr)\n• Write a blog post or case study (1.5hr)\n• Review and optimize resume keywords (0.5hr)\n\n─── Sunday: Rest & Plan ───\n• Light reading / industry podcasts (1hr)\n• Plan next week's priorities (0.5hr)\n• Rest and recharge ✨`
    }
  />
);

export default JobPlanner;
