"use client";

import React, { useState, useEffect } from "react";
import FormContainer from "./FormContainer";

const MultiStepForm = () => {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.outerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="multi-step-form w-full flex justify-center items-center h-full">
      <div className={`desktop-form w-full p-4 ${isMobile ? "hidden" : "block"}`}>
        <FormContainer isMobile={false} />
      </div>
      <div className={`mobile-form overflow-hidden h-full ${isMobile ? "block" : "hidden"}`}>
        <FormContainer isMobile={true} />
      </div>
    </div>
  );
};

export default MultiStepForm;
