import { getDocument } from "pdfjs-dist";
import { extractFile } from "./utils/pdfParser";
import FileUpload from "./components/FileUpload";
import { useState } from "react";
import { analyseResume } from "./api/analyseResume";
import { matchKeywords } from "./utils/ats";
console.log(getDocument);
console.log(extractFile);

function App() {
  const [resumeText, setResumeText] = useState<string>("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [jobDesc, setJobDesc] = useState("");

  const handleAnalyse = async () => {
    setLoading(true);
    try {
      // const res = await analyseResume(resumeText, jobDesc);
      const res = await analyseResume(resumeText, jobDesc);

const ats = matchKeywords(resumeText, jobDesc);

setAnalysis({
  ...res,
  matched: ats.matched,
  missing: ats.missing
});
      // setAnalysis(res);
    } finally {
      setLoading(false);
    }
  };


  const scoreColor =
    analysis?.score >= 80
      ? "text-emerald-400"
      : analysis?.score >= 50
      ? "text-amber-400"
      : "text-rose-400";

  const scoreRing =
    analysis?.score >= 80
      ? "stroke-emerald-400"
      : analysis?.score >= 50
      ? "stroke-amber-400"
      : "stroke-rose-400";

  return (
    <div className="min-h-screen bg-[#0c0e14] text-slate-100 font-['DM_Sans',sans-serif]">
      {/* Ambient glow background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-60 w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-cyan-600/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-14">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            AI-Powered
          </div>
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-3">
            Resume Analyser
          </h1>
          <p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed">
            Upload your resume and a job description to get an instant AI-powered match score and feedback.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left: Upload + Preview */}
          <div className="flex flex-col gap-5">
            <FileUpload onExtract={(text) => { setResumeText(text); setAnalysis(null); }} />

            {resumeText && (
              <div className="relative rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/60">
                  <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
                    Extracted Text
                  </span>
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Ready
                  </span>
                </div>
                <pre className="p-4 text-xs text-slate-400 leading-relaxed max-h-52 overflow-y-auto whitespace-pre-wrap font-mono scrollbar-thin scrollbar-thumb-slate-700">
                  {resumeText.slice(0, 800)}{resumeText.length > 800 ? "\n…" : ""}
                </pre>
              </div>
            )}
          </div>

          {/* Right: Job Description */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold tracking-widest uppercase text-slate-400 pl-1">
              Job Description
            </label>
            <textarea
              placeholder="Paste the job description here…"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              className="flex-1 min-h-[260px] resize-none rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm px-5 py-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all leading-relaxed"
            />
            <p className="text-xs text-slate-600 pl-1">
              {jobDesc.length} characters
            </p>
          </div>
        </div>

        {/* Analyse Button */}
        <div className="flex justify-center mb-10">
          <button
            disabled={!resumeText || !jobDesc || loading}
            onClick={handleAnalyse}
            className="group relative px-10 py-4 rounded-2xl font-bold text-base tracking-wide overflow-hidden
              bg-gradient-to-br from-indigo-600 to-violet-600
              disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed
              enabled:hover:from-indigo-500 enabled:hover:to-violet-500
              transition-all duration-300 shadow-lg shadow-indigo-900/40 enabled:hover:shadow-indigo-700/50
              enabled:hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                  Analysing…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                  Analyse Resume
                </>
              )}
            </span>
          </button>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="animate-[fadeUp_0.4s_ease_forwards]">
            {/* Score card */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm p-6 mb-5 flex flex-col sm:flex-row items-center gap-6">
              {/* Circular score */}
              <div className="relative w-28 h-28 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="42" fill="none"
                    className={`${scoreRing} transition-all duration-1000`}
                    strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={`${2 * Math.PI * 42 * (1 - (analysis.score ?? 0) / 100)}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-black ${scoreColor}`}>{analysis.score}</span>
                  <span className="text-xs text-slate-500 font-medium">/100</span>
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">Match Score</div>
                <p className="text-slate-200 text-sm leading-relaxed">{analysis.summary}</p>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-emerald-800/40 bg-emerald-950/30 backdrop-blur-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">Strengths</span>
                </div>
                <ul className="space-y-2.5">
                  {analysis.strengths?.map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-rose-800/40 bg-rose-950/30 backdrop-blur-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-rose-400">Weaknesses</span>
                </div>
                <ul className="space-y-2.5">
                  {analysis.weaknesses?.map((w: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
  <h3 className="text-indigo-400 font-bold mb-2">Matched Keywords</h3>
  <div className="flex flex-wrap gap-2">
    {analysis.matched?.map((m: string, i: number) => (
      <span key={i} className="bg-emerald-500/20 px-2 py-1 rounded text-xs">
        {m}
      </span>
    ))}
  </div>

  <h3 className="text-rose-400 font-bold mt-4 mb-2">Missing Keywords</h3>
  <div className="flex flex-wrap gap-2">
    {analysis.missing?.map((m: string, i: number) => (
      <span key={i} className="bg-rose-500/20 px-2 py-1 rounded text-xs">
        {m}
      </span>
    ))}
  </div>
</div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 9999px; }
      `}</style>
    </div>
  );
}

export default App;