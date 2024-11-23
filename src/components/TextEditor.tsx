import React, { useRef, useEffect } from 'react';
import { Bold, Italic, Underline } from 'lucide-react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TextEditor({ value, onChange, placeholder }: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleFormat = (command: string) => {
    if (!editorRef.current) return;
    document.execCommand(command, false);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (!editorRef.current) return;
    const content = editorRef.current.innerHTML;
    onChange(content);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertLineBreak', false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="flex items-center gap-1 p-2 border-b border-gray-300 bg-gray-50">
          <button
            type="button"
            onClick={() => handleFormat('bold')}
            className="p-1.5 rounded hover:bg-gray-200 transition-colors"
            title="Gras"
          >
            <Bold className="w-4 h-4 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('italic')}
            className="p-1.5 rounded hover:bg-gray-200 transition-colors"
            title="Italique"
          >
            <Italic className="w-4 h-4 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={() => handleFormat('underline')}
            className="p-1.5 rounded hover:bg-gray-200 transition-colors"
            title="Souligné"
          >
            <Underline className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div
          ref={editorRef}
          contentEditable
          className="p-3 h-[150px] overflow-y-auto focus:outline-none"
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder}
          suppressContentEditableWarning
        />
      </div>
    </div>
  );
}