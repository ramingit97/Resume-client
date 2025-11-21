import { ResumeData, DesignSettings, TemplateKey } from "@/_mock/resume";
import { TemplateA_Executive } from "../../ai/components/TemplateA_Executive";
import { TemplateB_DarkTech } from "../../ai/components/TemplateB_DarkTech";
import { TemplateC_Minimalist } from "../../ai/components/TemplateC_Minimalist";
import { TemplateD_Timeline } from "../../ai/components/TemplateD_Timeline";
import { TemplateA_Modern } from "../../ai/components/TemplateA_Modern";

interface ResumePreviewProps {
  resume: ResumeData;
  design: DesignSettings;
}

export function ResumePreview({ resume, design }: ResumePreviewProps) {
  const TemplateMap: Record<TemplateKey, any> = {
    A: TemplateA_Executive,
    B: TemplateB_DarkTech,
    C: TemplateC_Minimalist,
    D: TemplateD_Timeline,
    E: TemplateA_Modern
  };

  const TemplateComponent = TemplateMap[design.templateLayoutKey];

  return (
    <div
          id="resume-preview-container"
          className="overflow-hidden border p-4 bg-white rounded-lg"
          style={{ 
            width: '210mm', 
            minHeight: '297mm',
            // Fallback цвета на случай проблем с CSS переменными
            ['--chart-1' as any]: '#f97316',
            ['--chart-2' as any]: '#06b6d4',
            ['--chart-3' as any]: '#3b82f6',
            ['--chart-4' as any]: '#facc15',
            ['--chart-5' as any]: '#eab308',
          }}
      >
    <TemplateComponent data={resume} design={design} />
  </div>
  );
}
