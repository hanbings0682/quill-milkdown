'use client';

import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import Quill, { type EmitterSource, type Range as RangeStatic, QuillOptions as QuillOptionsStatic } from 'quill';

interface UnprivilegedEditor {
  getLength: Quill['getLength'];
  getText: Quill['getText'];
  getHTML: () => string;
  getSemanticHTML: Quill['getSemanticHTML'];
  getBounds: Quill['getBounds'];
  getSelection: Quill['getSelection'];
  getContents: Quill['getContents'];
}

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function QuillEditorWrapper() {
    const [editorInstance, setEditorInstance] = useState<UnprivilegedEditor | null>(null);
    const [value, setValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

    const handleChange = (content: string, delta: any, source: EmitterSource, editor: UnprivilegedEditor) => {
      console.log("1111")

        setValue(content);
        const atIndex = content.lastIndexOf('@');
        if (atIndex !== -1 && editor) {
            const range = editor.getSelection();
            if (range) {
                const bounds = editor.getBounds(range.index, 1) as unknown as any;
                setDropdownPosition({ top: bounds.bottom, left: bounds.left });
                setShowDropdown(true);
            }
        } else {
            setShowDropdown(false);
        }
    };

    const insertOption = (option: string) => {
        if (editorInstance) {
            const range = editorInstance.getSelection();
            setShowDropdown(false);
        }
    };

    return (
      <div className="h-96 w-[1280px] relative">
        <ReactQuill 
          theme="snow" 
          value={value} 
          onChange={handleChange} 
          modules={{
            toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['clean']
            ]
          }}
        />
        {showDropdown && (
          <div style={{ position: 'absolute', top: dropdownPosition.top, left: dropdownPosition.left }}>
            <button onClick={() => insertOption('A')}>A</button>
            <button onClick={() => insertOption('B')}>B</button>
            <button onClick={() => insertOption('C')}>C</button>
          </div>
        )}
      </div>
    );
}