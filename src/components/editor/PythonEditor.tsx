'use client';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

interface PythonEditorProps {
  value: string;
  onChange: (val: string) => void;
  language?: 'python' | 'javascript';
}

export default function PythonEditor({ value, onChange, language = 'python' }: PythonEditorProps) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      height="100%"
      theme={oneDark}
      extensions={[language === 'python' ? python() : javascript()]}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        autocompletion: true,
        bracketMatching: true,
        closeBrackets: true,
        indentOnInput: true,
      }}
      className="h-full text-sm code-editor"
    />
  );
}
