import React from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

type InputConfig = {
  height: string;
  placeholder: string;
  setOptionsType: "admin" | "main-admin";
  defaultValue: string;
  onValueChange: (value: string) => void;
};

const optionConfig = {
  admin: {
    resizingBar: false,
    buttonList: [
      ["undo", "redo", "font", "fontSize", "formatBlock"],
      [
        "bold",
        "underline",
        "italic",
        "strike",
        "subscript",
        "superscript",
        "removeFormat",
      ],
      "/",
      [
        "fontColor",
        "hiliteColor",
        "outdent",
        "indent",
        "align",
        "horizontalRule",
        "list",
        "table",
      ],
      [
        "link",
        "image",
        "video",
        "fullScreen",
        "showBlocks",
        "codeView",
        "preview",
        "print",
        "save",
      ],
    ],
  },
  "main-admin": {
    resizingBar: true,
    buttonList: [
      [
        "undo",
        "redo",
        "font",
        "fontSize",
        "formatBlock",
        "paragraphStyle",
        "blockquote",
        "bold",
        "underline",
        "italic",
        "strike",
        "subscript",
        "superscript",
        "fontColor",
        "hiliteColor",
        "textStyle",
        "removeFormat",
        "outdent",
        "indent",
        "align",
        "horizontalRule",
        "list",
        "lineHeight",
        "table",
        "link",
        "image",
        "video",
        "audio",
        "imageGallery",
        "fullScreen",
        "showBlocks",
        "codeView",
        "preview",
        "print",
        "save",
        "template",
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
