import { useState } from "react";
import { Button, Input, Spin } from "antd";
import { toast } from "sonner";
import { Brain, Sparkles } from "lucide-react";
import { ResumeData } from "@/_mock/resume";
import resumeService from "@/api/services/resumeService";

interface AiGeneratorTabProps {
  resume: ResumeData;
  onGenerate: (data: ResumeData) => void;
  onSwitchTab: (tab: string) => void;
}

const defaultJobText = `Мы ищем опытного Full-Stack разработчика с сильным опытом в NestJS, микросервисной архитектуре и Docker. Идеальный кандидат имеет опыт работы с CRM-системами, Kafka, RabbitMQ и AWS (S3, Lambda). Знание английского языка обязательно для взаимодействия с международной командой. Дополнительные преимущества: опыт работы с React/TypeScript, умение оптимизировать backend-процессы и опыт работы с CI/CD.`;

export const AiGeneratorTab: React.FC<AiGeneratorTabProps> = ({
  resume,
  onGenerate,
  onSwitchTab,
}) => {
  const [jobDescription, setJobDescription] = useState(defaultJobText);
  const [isLoading, setIsLoading] = useState(false);
  const [atsFeedback, setAtsFeedback] = useState<string | null>(null);
  const [optimizedResume, setOptimizedResume] = useState<ResumeData | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error("Пожалуйста, вставьте описание вакансии.");
      return;
    }

    setIsLoading(true);
    try {
      const { atsFeedback, optimizedResume } = await resumeService.optimizeResumeForJob({
        resume,
        jobDescription,
      });

      setAtsFeedback(atsFeedback);
      setOptimizedResume(optimizedResume);
    } catch (err) {
      console.error("Ошибка анализа:", err);
      toast.error("Не удалось получить анализ и оптимизацию резюме.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyOptimization = () => {
    if (!optimizedResume) return;

    onGenerate(optimizedResume);
    toast.success("Резюме успешно оптимизировано!");
    setAtsFeedback(null);
    setOptimizedResume(null);
    setJobDescription("");
    onSwitchTab("1");
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-3xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:border-blue-100">
      {/* Фоновый световой эффект */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-50 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-500" />
          AI Оптимизация под вакансию
        </h3>

        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          Вставьте описание вакансии — AI проанализирует и предложит, как улучшить ваше резюме
          под требования работодателя.
        </p>

        <Input.TextArea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={7}
          className="rounded-2xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-700 placeholder:text-gray-400"
          placeholder="Например: Мы ищем Senior Backend Developer..."
        />

        <div className="flex justify-end mt-5">
          <Button
            type="primary"
            loading={isLoading}
            onClick={handleAnalyze}
            className="!bg-gradient-to-r !from-blue-500 !to-blue-600 hover:!from-blue-600 hover:!to-blue-700 border-none rounded-xl px-6 py-2 font-medium text-white flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            {isLoading ? (
              <>
                <Spin size="small" />
                <span>Анализируем...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Сравнить с топ-резюме</span>
              </>
            )}
          </Button>
        </div>

        {atsFeedback && (
          <div className="mt-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-5 shadow-inner">
            <h4 className="text-base font-semibold text-gray-800 mb-2">
              Результаты анализа (ATS Feedback)
            </h4>
            <div className="whitespace-pre-line text-sm text-gray-600 leading-relaxed">
              {atsFeedback}
            </div>

            {optimizedResume && (
              <Button
                type="primary"
                onClick={handleApplyOptimization}
                className="mt-5 w-full rounded-xl py-2 font-medium shadow-md hover:shadow-lg transition-all !bg-green-500 hover:!bg-green-600 border-none flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Применить оптимизацию и перейти к превью
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
