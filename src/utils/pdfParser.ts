import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
import { getDocument } from "pdfjs-dist";

export const extractFile=async (file:File) => {
    const arrayBuffer=await file.arrayBuffer();
    console.log(arrayBuffer);
    const pdf=await getDocument({data:arrayBuffer}).promise;
    console.log(pdf);
    let text='';
    for(let i=1;i<=pdf.numPages;i++)
    {
        const page=await pdf.getPage(i);
        const content=await page.getTextContent();
        text+=content.items.map((item:any)=>item.str).join(' ')+'\n';

    }
    return text;
    
}