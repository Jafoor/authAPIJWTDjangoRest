import React from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

type InputConfig = {
  height: string;
  placeholder: string;
  setOptionsType: "admin" | "institute-admin";
  defaultValue: string;
  onValueChange: (value: string) => void;
};

const optionConfig = {
  admin: {
    resizingBar: false,
    buttonList: [
      ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
'/', 
      ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
      ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save']
    ],
  },
  "institute-admin": {
    resizingBar: true,
    buttonList: [
      [
        "formatBlock",
        "bold",
        "underline",
        "italic",
        "strike",
        "blockquote",
        "showBlocks",
        "fontColor",
        "hiliteColor",
        "align",
        "list",
        "table",
        "link",
        "image",
        "video",
        "removeFormat",
      ],
    ],
  },
};

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const SunTextEditor = ({
  height,
  placeholder,
  setOptionsType,
  onValueChange,
  defaultValue,
}: InputConfig) => {
  return (
    <div>
      <SunEditor
        lang="en"
        height={height}
        placeholder={placeholder}
        setOptions={optionConfig[setOptionsType]}
        defaultValue={defaultValue}
        onChange={(val) => onValueChange(val)}
      />
    </div>
  );
};
export default SunTextEditor;
