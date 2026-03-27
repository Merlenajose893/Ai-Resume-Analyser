import { getDocument } from "pdfjs-dist";
import { extractFile } from "./utils/pdfParser";
import FileUpload from "./components/FileUpload";
import { useState } from "react";
import { analyseResume } from "./api/analyseResume";

// {FileUpload}
function App()
{
  const [resumeText,setresumeText]=useState<string>('')
  const [analysis,setAnalysis]=useState<any>(null);
  const [loading,setLoading]=useState(false);
  const [jobDesc,setJobDesc]=useState('');
  console.log(getDocument);
  console.log(extractFile);
  console.log(FileUpload);

  return(
<div>
  <FileUpload  onExtract={(text)=>{
    console.log(text,"Hello");
    setresumeText(text)

    
    
  }}/>
{resumeText && (
  <pre style={{ whiteSpace: "pre-wrap" }}>
    {resumeText}
  </pre>


)}

<button disabled={!resumeText || !jobDesc}onClick={async () => {
  const res=await analyseResume(resumeText,jobDesc);
  setAnalysis(res)
  
}}>
  Analyse Resume
</button>

{analysis &&(
  <div>
    <h2>Score:{analysis.score}</h2>
    <h2>Summary:{analysis.summary}</h2>
    <h3>Strengths</h3>
    <ul>
      {analysis.strengths?.map((s,i)=>(
        <li key={i}>{s}</li>
      ))}
    </ul>
    <h3>Weakness</h3>
    <ul>
      {analysis.weakness?.map((w,i)=>(
        <li key={i}>{w}</li>
      ))}
    </ul>
    </div>
)}

<textarea placeholder="Paste Job Description here" value={jobDesc} onChange={(e)=>setJobDesc(e.target.value)}>

</textarea>
</div>
  )
  
  
  
  
}
export default App;
