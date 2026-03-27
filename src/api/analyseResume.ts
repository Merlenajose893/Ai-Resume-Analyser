export const analyseResume = async (text: string,jobDesc:string) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    console.log(apiKey);
    
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5173",
      "X-Title": "Resume Analyzer",
    },
    body: JSON.stringify({
      model: "openrouter/auto",
      messages: [
        {
          role: "user",
          content: `Return ONLY valid JSON (no extra text) with:
          score, summary, strengths, weaknesses.

          Resume:
          ${text}
          
          Job Description:${jobDesc}
          
          `
          
          
          ,
        },
      ],
    }),
  });

  const data = await response.json();
  console.log("API RESPONSE:", data);
if(data.error)
{
    console.log('api error',data.error);
    return null;
    

}

const content=data.choices[0].message.content;

  const cleanText = content
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const parsed = JSON.parse(cleanText);

return parsed;
};