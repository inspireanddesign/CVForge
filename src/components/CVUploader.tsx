import React, { useRef, useState } from 'react';
import { Upload, Loader } from 'lucide-react';
import { getDocument } from 'pdfjs-dist';

// Configure PDF.js worker
const pdfjsWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;

interface CVUploaderProps {
  onExtractedData: (data: any) => void;
}

export default function CVUploader({ onExtractedData }: CVUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractTextFromPDF = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }

      return fullText;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF. Please try again with a different file.');
    }
  };

  const parseCV = (text: string) => {
    const sections = {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        title: '',
      },
      summary: '',
      experience: [],
      education: [],
      skills: [],
    };

    // Extract email
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const emailMatch = text.match(emailRegex);
    if (emailMatch) {
      sections.personalInfo.email = emailMatch[0];
    }

    // Extract phone
    const phoneRegex = /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/;
    const phoneMatch = text.match(phoneRegex);
    if (phoneMatch) {
      sections.personalInfo.phone = phoneMatch[0];
    }

    // Extract name (assuming it's at the beginning of the document)
    const lines = text.split('\n').filter(line => line.trim());
    if (lines[0]) {
      sections.personalInfo.fullName = lines[0].trim();
    }

    // Extract skills (looking for common skill section identifiers)
    const skillsSection = text.match(/Skills[\s\S]*?(?=\n\n|$)/i);
    if (skillsSection) {
      sections.skills = skillsSection[0]
        .replace(/Skills:?/i, '')
        .split(/[,\n]/)
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0 && skill.length < 50);
    }

    return sections;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      if (file.type !== 'application/pdf') {
        throw new Error('Please upload a PDF file');
      }

      const text = await extractTextFromPDF(file);
      const parsedData = parseCV(text);
      onExtractedData(parsedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process CV');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.currentTarget.classList.add('border-purple-400');
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-purple-400');
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-purple-400');
    
    const file = event.dataTransfer.files[0];
    if (file && fileInputRef.current) {
      fileInputRef.current.files = event.dataTransfer.files;
      handleFileUpload({ target: { files: event.dataTransfer.files } } as any);
    }
  };

  return (
    <div
      className="w-full p-8 border-2 border-dashed border-purple-200 rounded-lg hover:border-purple-400 transition-colors"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
        ref={fileInputRef}
      />

      <div className="text-center">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-2">
            <Loader className="w-8 h-8 text-purple-600 animate-spin" />
            <p className="text-gray-600">Processing your CV...</p>
          </div>
        ) : (
          <div
            className="flex flex-col items-center space-y-2 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-gray-600">
                Drag and drop your CV here, or{' '}
                <span className="text-purple-600 font-semibold">browse</span>
              </p>
              <p className="text-sm text-gray-500">Supports PDF format</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}