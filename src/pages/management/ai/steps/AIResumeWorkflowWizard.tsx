import { MOCK_DATA } from "@/_mock/resume";
import { useCallback, useMemo, useState } from "react";
import { DEFAULT_DESIGN_A, Step1_Input } from "./Step1_Input";
import { Step2_PreviewAndEdit } from "./Step2_PreviewAndEdit";

export default function AIResumeWorkflowWizard() {
  const [step, setStep] = useState(1); // 1: Input, 2: Preview
  const [parsedData, setParsedData] = useState(MOCK_DATA);
  const [initialDesignSettings, setInitialDesignSettings] = useState(DEFAULT_DESIGN_A);

  const handleStep1Complete = useCallback((data, initialDesign) => {
      setParsedData(data);
      setInitialDesignSettings(initialDesign);
      setStep(2);
  }, []);

  const handleReset = useCallback(() => {
      setStep(1);
      setParsedData(MOCK_DATA); // Сброс данных при возврате к Шагу 1
  }, []);

  const CurrentStepComponent = useMemo(() => {
      if (step === 1) {
          return <Step1_Input onNext={handleStep1Complete} />;
      }
      return <Step2_PreviewAndEdit data={parsedData} initialDesign={initialDesignSettings} onReset={handleReset} />;
  }, [step, parsedData, initialDesignSettings, handleStep1Complete, handleReset]);

  return (
      <div className="min-h-screen w-full flex justify-center items-center bg-gray-50 p-4 sm:p-8 font-sans">
          {CurrentStepComponent}
      </div>
  );
}