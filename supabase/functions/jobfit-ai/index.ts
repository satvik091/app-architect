import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompts: Record<string, string> = {
  "resume-optimize": `You are an expert ATS resume optimizer. Given a resume and target job title, optimize the resume for ATS systems. Include:
- An improved professional summary
- Key achievements with quantifiable metrics
- ATS-friendly keywords
- Specific recommendations for improvement
Format your response with clear sections using markdown headers.`,

  "jd-align": `You are a job description alignment expert. Given a resume and job description, analyze the match. Provide:
- An alignment score out of 100
- Hard skills match (list matched and missing)
- Soft skills match
- Missing keywords
- Specific suggestions to improve alignment
Format with clear sections and use checkmarks/crosses for matched/missing skills.`,

  "interview-prep": `You are an interview preparation coach. Given a target role and experience summary, generate exactly 10 role-specific interview questions with structured STAR-format answers. For each question:
- State the question
- Provide a complete STAR answer (Situation, Task, Action, Result)
Make answers realistic and tailored to the role. Format clearly with question numbers.`,

  "cover-letter": `You are a professional cover letter writer. Given a job title, company, job description, and candidate background, write a polished 3-paragraph cover letter that:
- Opens with genuine interest and key qualification
- Details relevant achievements aligned with the JD
- Closes with enthusiasm and call to action
Keep it concise, professional, and tailored. Do not use generic filler.`,

  "linkedin-optimize": `You are a LinkedIn profile optimization expert. Given a current About section and target role, provide:
- An optimized headline (under 120 characters)
- A rewritten About section (compelling, keyword-rich, 3-4 paragraphs)
- A recommended skills list (8-10 skills ordered by relevance)
Format clearly with section headers.`,

  "job-plan": `You are a career coach specializing in job search strategy. Given a target role, available hours per day, and current situation, create a structured 7-day job search plan that balances:
- Job applications
- Networking activities
- Interview preparation
- Skill building
- Rest and reflection
Include specific time allocations and actionable tasks for each day. Format with day headers.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tool_type, inputs } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = systemPrompts[tool_type];
    if (!systemPrompt) throw new Error(`Unknown tool type: ${tool_type}`);

    // Build user message from inputs
    let userMessage = "";
    for (const [key, value] of Object.entries(inputs)) {
      userMessage += `${key}: ${value}\n\n`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "AI processing failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("jobfit-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
