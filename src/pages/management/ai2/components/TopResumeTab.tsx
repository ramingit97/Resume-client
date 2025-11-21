import { useState } from "react";
import { Button, Input, Spin } from "antd";
import { toast } from "sonner";
import resumeService from "@/api/services/resumeService";
import { ResumeData } from "@/_mock/resume";
import { BarChart3, Trophy } from "lucide-react";

interface BenchmarkTabProps {
  resume: ResumeData;
  onGenerate: (data: ResumeData) => void;
  onSwitchTab: (tab: string) => void;
}

export const BenchmarkTab: React.FC<BenchmarkTabProps> = ({
  resume,
  onGenerate,
  onSwitchTab,
}) => {
  const [targetRole, setTargetRole] = useState("Senior Backend Developer (Node.js, AWS, Kafka)");
  const [isLoading, setIsLoading] = useState(false);
  const [benchmarkSummary, setBenchmarkSummary] = useState<string | null>(null);
  const [idealResume, setIdealResume] = useState<ResumeData | null>(null);

  const handleAnalyze = async () => {
    if (!targetRole.trim()) {
      toast.error("Пожалуйста, укажите целевую должность.");
      return;
    }

    setIsLoading(true);
    try {
      const { benchmarkSummary, idealResume } = await resumeService.analyzeAgainstTopResumes({
        resume,
        targetRole,
      });

      setBenchmarkSummary(benchmarkSummary);
      setIdealResume(idealResume);
    } catch (err) {
      console.error("Ошибка анализа:", err);
      toast.error("Не удалось выполнить сравнение с топ-резюме.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyIdeal = () => {
    if (!idealResume) return;

    onGenerate(idealResume);
    toast.success("Пример идеального резюме применён!");
    onSwitchTab("1");
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-3xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:border-blue-100">
      {/* Фоновый мягкий световой эффект */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-50 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-blue-500" />
          Сравнение с топ-резюме
        </h3>

        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          Укажите должность, и AI сравнит ваше резюме с лучшими примерами по этой позиции.
        </p>

        <Input
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          className="rounded-2xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-700 placeholder:text-gray-400"
          placeholder="Введите целевую позицию (например: Backend Developer, Node.js)"
        />

        <div className="flex justify-end mt-5">
          <Button
            type="primary"
            icon={<BarChart3 className="w-4 h-4" />}
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
                <span>Сравнить с топ-резюме</span>
              </>
            )}
          </Button>
        </div>

        {benchmarkSummary && (
          <div className="mt-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-5 shadow-inner">
            <h4 className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              Результаты анализа
            </h4>

            <div className="whitespace-pre-line text-sm text-gray-600 leading-relaxed">
              {benchmarkSummary}
            </div>

            {idealResume && (
              <Button
                type="primary"
                onClick={handleApplyIdeal}
                className="mt-5 w-full rounded-xl py-2 font-medium shadow-md hover:shadow-lg transition-all !bg-green-500 hover:!bg-green-600 border-none flex items-center justify-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                Применить пример идеального резюме
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
