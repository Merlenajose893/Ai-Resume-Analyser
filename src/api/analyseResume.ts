export const analyseResume = async (text: string, jobDesc: string) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-lite",
      messages: [
        {
          role: "user",
          content: `Return ONLY valid JSON with EXACT structure:

{
  "score": number (0-100),
  "summary": string,
  "strengths": string[],
  "weaknesses": string[]
}

Resume:
${text}

Job Description:
${jobDesc}
`,
        },
      ],
    }),
  });

  const data = await response.json();

  const raw = data.choices?.[0]?.message?.content;

  const cleaned = raw
    ?.replace("```json", "")
    ?.replace("```", "")
    ?.trim();

  const parsed = JSON.parse(cleaned);

  return parsed;
};