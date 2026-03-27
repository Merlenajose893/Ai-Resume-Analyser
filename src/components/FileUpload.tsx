import React from 'react'
import { extractFile } from '../utils/pdfParser'

type Props={
    onExtract:(text:string)=>void;
};
const FileUpload = ({onExtract}:Props) => {

 const handleFileUpload=async (e:React.ChangeEvent<HTMLInputElement>) => {
        const file=e.target.files?.[0];
        if(!file) return;
        if(file.type!=='application/pdf')
        {
            alert("Only PDFs allowed");
            return;
        }
        const text=await extractFile(file);
        onExtract(text)
        
    }
  return (
    <input type="file" onChange={handleFileUpload}/>
  )
}

export default FileUpload