import { useState, useRef } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractTextFromPdf, extractTextFromMultiplePdfs } from "@/lib/pdf-utils";

interface PdfUploadProps {
  label: string;
  placeholder: string;
  multiple?: boolean;
  onTextExtracted: (text: string) => void;
  onMultipleExtracted?: (results: { name: string; text: string }[]) => void;
}

const PdfUpload = ({ label, placeholder, multiple = false, onTextExtracted, onMultipleExtracted }: PdfUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [parsing, setParsing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    const fileArray = Array.from(selectedFiles).filter(f => f.type === "application/pdf");
    if (fileArray.length === 0) return;

    setFiles(fileArray);
    setParsing(true);

    try {
      if (multiple && onMultipleExtracted) {
        const results = await extractTextFromMultiplePdfs(fileArray);
        onMultipleExtracted(results);
      } else {
        const text = await extractTextFromPdf(fileArray[0]);
        onTextExtracted(text);
      }
    } catch {
      onTextExtracted("");
    } finally {
      setParsing(false);
    }
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (updated.length === 0) {
      onTextExtracted("");
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
      <div
        className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors bg-card"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {parsing ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground py-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Extracting text from PDF...</span>
          </div>
        ) : files.length > 0 ? (
          <div className="space-y-2">
            {files.map((file, i) => (
              <div key={i} className="flex items-center justify-between bg-secondary/50 rounded-md px-3 py-2">
                <div className="flex items-center gap-2 text-sm text-foreground truncate">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">{file.name}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">Click to replace</p>
          </div>
        ) : (
          <div className="py-4">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">{placeholder}</p>
            <p className="text-xs text-muted-foreground mt-1">PDF files only</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfUpload;
