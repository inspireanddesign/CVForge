import React, { useState } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useTranslation } from 'react-i18next';
import TermsModal from './TermsModal';

interface PDFExportProps {
  cvRef: React.RefObject<HTMLDivElement>;
}

export default function PDFExport({ cvRef }: PDFExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const { t } = useTranslation();

  const exportToPDF = async () => {
    if (!cvRef.current) return;

    try {
      setIsExporting(true);

      // Get the CV element
      const cvElement = cvRef.current;
      
      // Calculate dimensions
      const aspectRatio = 1.4142; // A4 aspect ratio
      const width = cvElement.offsetWidth;
      const height = width * aspectRatio;

      // Create canvas with proper dimensions
      const canvas = await html2canvas(cvElement, {
        scale: 2,
        width,
        height,
        windowWidth: width,
        windowHeight: height,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Create PDF with proper dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = 297; // A4 height in mm
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Add metadata
      pdf.setProperties({
        title: 'CV',
        subject: 'Curriculum Vitae',
        creator: 'CVforge',
        author: 'CVforge',
        keywords: 'cv, resume, curriculum vitae',
      });

      // Add image to PDF
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        0,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );

      // Save PDF
      pdf.save('cv.pdf');

    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExport = () => {
    setShowTerms(true);
  };

  return (
    <>
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`
          w-full px-4 py-3 rounded-lg
          flex items-center justify-center gap-2
          font-medium shadow-sm hover:shadow-md
          transition-all duration-200
          ${isExporting 
            ? 'bg-purple-400 cursor-wait' 
            : 'bg-purple-600 hover:bg-purple-700'
          }
          text-white
        `}
      >
        <Download className="w-5 h-5" />
        <span>
          {isExporting ? t('preview.export.generating') : t('preview.export.button')}
        </span>
      </button>

      <TermsModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        onAccept={() => {
          setShowTerms(false);
          exportToPDF();
        }}
      />
    </>
  );
}