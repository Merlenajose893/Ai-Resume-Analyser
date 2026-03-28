const getKeywords = (text: string): string[] => {
  const cleaned = text.replace(/[^a-zA-Z0-9 ]/g, "");
  const words = cleaned.toLowerCase().split(" ");
  return [...new Set(words)];
};

export const matchKeywords = (
  resumeText: string,
  jobDesc: string
): { matched: string[]; missing: string[] } => {
  const resumeKeywords = getKeywords(resumeText);
  const jobKeywords = getKeywords(jobDesc);

  const matched = resumeKeywords.filter(p => jobKeywords.includes(p));
  const missing = jobKeywords.filter(p => !resumeKeywords.includes(p));

  return { matched, missing };
};

