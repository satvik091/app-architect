import ToolPage from "@/components/ToolPage";

const LinkedInOptimizer = () => (
  <ToolPage
    title="LinkedIn Optimizer"
    description="Optimize your About section, headline, and skills for maximum recruiter visibility."
    inputFields={[
      { key: "current", label: "Current LinkedIn About", placeholder: "Paste your current About section...", type: "textarea" },
      { key: "role", label: "Target Role", placeholder: "e.g. Data Scientist", type: "input" },
    ]}
    generateResult={(inputs) =>
      `📝 Optimized Headline\n"${inputs.role} | AI & Machine Learning | Driving Data-Driven Impact at Scale"\n\n📝 Optimized About Section\nI'm a results-oriented ${inputs.role.toLowerCase()} passionate about turning complex data into actionable business insights. With experience spanning predictive modeling, machine learning pipelines, and cross-functional strategy, I help organizations make smarter decisions faster.\n\nMy approach combines deep technical expertise with strong business acumen — I don't just build models, I build solutions that move the needle. From reducing customer churn by 25% to optimizing supply chain forecasting, I focus on impact that matters.\n\n🔑 Core competencies: Machine Learning • Statistical Analysis • Python • SQL • Data Visualization • A/B Testing • Deep Learning • NLP\n\n📫 Open to connecting with fellow data professionals and exploring new opportunities.\n\n📝 Recommended Skills\n1. Machine Learning\n2. Python\n3. Data Analysis\n4. SQL\n5. TensorFlow\n6. Statistical Modeling\n7. Data Visualization\n8. Natural Language Processing`
    }
  />
);

export default LinkedInOptimizer;
