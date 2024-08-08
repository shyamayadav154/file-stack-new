'use client'
import React from "react";
import DocViewer, {
  DocViewerRenderers,
  type IDocument,
} from "react-doc-viewer";

function Fileviewer({  base64, type }: { base64: string; type: string}) {

    const arrayBuffer = Buffer.from(base64, "base64");
    // const base64 = Buffer.from(buffer).toString("base64");
    const uri = `data:${type};base64,${base64}`;
    const file = new File([base64], type);
  return (
    <div>
      Fileviewer
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        documents={[{ fileData:arrayBuffer, fileType: 'pdf'}]}
      />
    </div>
  );
}

export default Fileviewer;
