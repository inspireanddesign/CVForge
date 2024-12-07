import React, { useState } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useTranslation } from 'react-i18next';
import TermsModal from './TermsModal';

interface PDFExportProps {
  cvRef: React.RefObject<HTMLDivElement>;
  onSave: (e: React.FormEvent) => void;
  dictionary: any;
}

export default function PDFExport({ cvRef, onSave, dictionary }: PDFExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const { t } = useTranslation();

  const exportToPDF = async () => {
    if (!cvRef.current) return;

    try {
      setIsExporting(true);

      // Clone the CV element
      const cvElement = cvRef.current.cloneNode(true) as HTMLDivElement;
      
      // Force A4 dimensions (in pixels at 96 DPI)
      const A4_WIDTH = 794; // 210mm at 96 DPI
      const A4_HEIGHT = 1123; // 297mm at 96 DPI

      // Force left column width to be exactly 30% of total width
      const leftColumn = cvElement.querySelector('[data-column="left"]');
      const rightColumn = cvElement.querySelector('[data-column="right"]');
      
      if (leftColumn instanceof HTMLElement) {
        leftColumn.style.width = '30%';
        leftColumn.style.minWidth = '30%';
        leftColumn.style.maxWidth = '30%';
        leftColumn.style.flexBasis = '30%';
      }
      
      if (rightColumn instanceof HTMLElement) {
        rightColumn.style.width = '70%';
        rightColumn.style.minWidth = '70%';
        rightColumn.style.maxWidth = '70%';
        rightColumn.style.flexBasis = '70%';
      }

      // Apply fixed dimensions and styles
      Object.assign(cvElement.style, {
        width: `${A4_WIDTH}px`,
        height: `${A4_HEIGHT}px`,
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
        display: 'flex',
        flexDirection: 'row',
        margin: '0',
        padding: '0',
        transform: 'none',
        transformOrigin: 'top left',
        maxWidth: 'none',
        maxHeight: 'none',
        overflow: 'hidden'
      });

      // Temporarily add to document
      document.body.appendChild(cvElement);

      // Wait for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      // Create canvas with fixed dimensions
      const canvas = await html2canvas(cvElement, {
        width: A4_WIDTH,
        height: A4_HEIGHT,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: A4_WIDTH,
        windowHeight: A4_HEIGHT,
        onclone: (_, element) => {
          // Ensure flex layout is preserved
          const container = element.querySelector('[data-cv-container]');
          if (container instanceof HTMLElement) {
            container.style.display = 'flex';
            container.style.flexDirection = 'row';
            container.style.width = '100%';
            container.style.height = '100%';
          }
        }
      });

      // Remove temporary element
      document.body.removeChild(cvElement);

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Add to PDF with proper dimensions
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        0,
        210, // A4 width in mm
        297, // A4 height in mm
        undefined,
        'MEDIUM'
      );

      pdf.save(`cv_forge_${Date.now().toString()}.pdf`);

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
          {isExporting ? dictionary.preview.export.generating : dictionary.preview.export.button}
        </span>
      </button>

      <TermsModal
        isOpen={showTerms}
        onSave={onSave}
        onClose={() => setShowTerms(false)}
        onAccept={() => {
          setShowTerms(false);
          exportToPDF();
        }}
      />
    </>
  );
}