import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useTranslation } from 'react-i18next';
import TermsModal from './TermsModal';

interface PDFExportProps {
  cvRef: React.RefObject<HTMLDivElement>;
  onSave: (e: React.FormEvent) => void;
}

export default function PDFExport({ cvRef, onSave }: PDFExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const { t } = useTranslation();

  const prepareDOMElement = (element: HTMLElement) => {
    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Apply necessary styles for better PDF rendering
    clone.style.width = '794px'; // A4 width in pixels at 96 DPI
    clone.style.margin = '0';
    clone.style.padding = '0';
    
    // Temporarily append to document
    document.body.appendChild(clone);
    
    return clone;
  };

  const cleanupDOMElement = (element: HTMLElement) => {
    document.body.removeChild(element);
  };

  const exportToPDF = async () => {
    if (!cvRef.current) {
      console.error('CV reference not found');
      return;
    }

    try {
      setIsExporting(true);

      // Prepare the element for export
      const preparedElement = prepareDOMElement(cvRef.current);

      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 500));

      const scale = 2; // Higher scale for better quality
      const canvas = await html2canvas(preparedElement, {
        scale,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (doc, element) => {
          // Additional modifications to cloned element if needed
          element.style.visibility = 'visible';
        }
      });

      // Clean up the temporary element
      cleanupDOMElement(preparedElement);

      // PDF dimensions (A4)
      const pdfWidth = 210; // mm
      const pdfHeight = 297; // mm

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Calculate positions to center the content
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const aspectRatio = canvas.width / canvas.height;
      
      let imgWidth = pdfWidth;
      let imgHeight = pdfWidth / aspectRatio;
      
      // Adjust if height exceeds page height
      if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = imgHeight * aspectRatio;
      }
      
      // Center the image
      const xOffset = (pdfWidth - imgWidth) / 2;
      const yOffset = (pdfHeight - imgHeight) / 2;

      // Add metadata
      pdf.setProperties({
        title: 'CV',
        subject: 'Curriculum Vitae',
        creator: 'CVforge',
        author: 'CVforge',
        keywords: 'cv, resume, curriculum vitae',
      });

      // Add image with improved quality settings
      pdf.addImage(
        imgData,
        'JPEG',
        xOffset,
        yOffset,
        imgWidth,
        imgHeight,
        undefined,
        'MEDIUM'
      );

      // Save PDF
      pdf.save('cv.pdf');

    } catch (error) {
      console.error('Error generating PDF:', error);
      // Vous pourriez ajouter ici une notification pour l'utilisateur
    } finally {
      setIsExporting(false);
    }
  };

  const handleExport = () => {
    setShowTerms(true);
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      const tempElements = document.querySelectorAll('[data-temp-pdf-element]');
      tempElements.forEach(element => element.remove());
    };
  }, []);

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