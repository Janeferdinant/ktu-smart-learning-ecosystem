import React from 'react';
import { X, FileText, Download, ShieldCheck, ExternalLink } from 'lucide-react';

import { downloadAcademicPdf } from '../services/pdfService';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  filename: string;
  sizeBytes?: number;
  scheme?: string;
  highlights?: string[];
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  title,
  filename,
  sizeBytes,
  scheme,
  highlights
}) => {
  if (!isOpen) return null;

  const formattedSize = sizeBytes
    ? `${(sizeBytes / 1024 / 1024).toFixed(2)} MB`
    : 'Academic Document';

  const handleDownload = async () => {
    await downloadAcademicPdf(filename, title, scheme || 'KTU 2019 Scheme', highlights);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="glass-panel w-full max-w-2xl p-6 sm:p-8 space-y-6 shadow-2xl border-white/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                <span className="font-mono">{filename}</span>
                <span>•</span>
                <span>{formattedSize}</span>
                {scheme && (
                  <>
                    <span>•</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{scheme}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="glass-button p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Verification Banner */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 text-xs text-emerald-800 dark:text-emerald-300">
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          <div>
            <span className="font-bold">Verified Academic Source: </span>
            This official question paper and valuation scheme originates from the authentic APJ Abdul Kalam Technological University (KTU) examinations.
          </div>
        </div>

        {/* Highlights if provided */}
        {highlights && highlights.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Key Valuation Scheme Rubrics:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Document Metadata & Actions */}
        <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-medium">
            Curated by Jane Rose | Assistant Professor CSE
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold glass-button"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Resource</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
