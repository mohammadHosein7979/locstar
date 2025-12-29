"use client";

import { Editor } from "@tinymce/tinymce-react";
import { FC, useRef } from "react";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor: FC<TextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<any>(null);

  return (
    <Editor
      apiKey="0sgnc2993bdain2yn9swox2lbbkvdxx4fjznui1p8ct7gwef"
      onInit={(_, editor) => (editorRef.current = editor)}
      value={value}
      onEditorChange={(newValue) => onChange(newValue)}
      init={{
        height: 300,
        directionality: "rtl",
        language: "fa",
        language_url: "/langs/fa.js",
        content_style: `
          @font-face {
            font-family: 'IRANSansWeb';
            src: url('/fonts/iran-sans/IRANSansWeb(FaNum).woff') format('woff');
            font-weight: 500;
          }
          body, .tox-dialog__title {
            font-family: 'IRANSansWeb', sans-serif;
          }
          .tox, .tox .tox-toolbar, .tox .tox-toolbar__group, .tox .tox-toolbar__button, .tox .tox-tooltip {
            font-family: 'IRANSansWeb', sans-serif !important;
          }
        `,
        font_formats: `
          IRANSansWeb=IRANSansWeb;
          Arial=arial,helvetica,sans-serif;
          Times New Roman=times new roman,times;
          Verdana=verdana,geneva;
        `,
        menubar: false,
        plugins: ["link", "lists", "autolink", "preview", "codesample"],
        toolbar:
          "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link | preview | codesample",
        branding: false,
      }}
    />
  );
};

export default TextEditor;
