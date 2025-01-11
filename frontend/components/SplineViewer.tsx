"use client";

import { useEffect } from "react";

interface SplineViewerProps {
  sceneUrl: string;
}

const SplineViewer: React.FC<SplineViewerProps> = ({ sceneUrl }) => {
  useEffect(() => {
    // Dynamically load the Spline Viewer script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.59/build/spline-viewer.js";
    script.type = "module";
    script.async = true;
    document.body.appendChild(script);
    
    // Clean up the script after component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <spline-viewer url={sceneUrl}></spline-viewer>;
};

export default SplineViewer;
