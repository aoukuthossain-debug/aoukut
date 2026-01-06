
import React, { useEffect, useRef } from 'react';

interface PreviewFrameProps {
  html: string;
}

const PreviewFrame: React.FC<PreviewFrameProps> = ({ html }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                body { margin: 0; padding: 20px; min-height: 100vh; background: #f1f5f9; }
                /* Custom styles for the preview container */
                #preview-root { display: flex; justify-content: center; align-items: flex-start; }
              </style>
            </head>
            <body>
              <div id="preview-root">
                ${html}
              </div>
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [html]);

  return (
    <div className="w-full h-full bg-white rounded-xl overflow-hidden shadow-inner border border-slate-200">
      <iframe
        ref={iframeRef}
        title="Component Preview"
        className="w-full h-full border-none"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default PreviewFrame;
