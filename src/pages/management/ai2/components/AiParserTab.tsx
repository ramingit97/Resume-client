import { useState } from "react";
import { Button, Input, Spin } from "antd";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { ResumeData } from "@/_mock/resume";
import resumeService from "@/api/services/resumeService";

interface AiParserTabProps {
  onParseSuccess: (data: Partial<ResumeData>) => void;
}

const defaultText = `Меня зовут Гасанов Рамин Али оглы, работал более 6 лет как фуллстек разработчик, 5 лет в Cubics Technology как фуллстек (NestJS, Docker, Kafka). Потом в Blink BI как бекенд, где разрабатывали CHRM. Родные языки русский и азербайджанский. Учился с 2015 по 2019 в Азербайджанском Университете. Люблю футбол и шахматы.`;

export const AiParserTab: React.FC<AiParserTabProps> = ({ onParseSuccess }) => {
  const [rawText, setRawText] = useState(defaultText);
  const [isLoading, setIsLoading] = useState(false);

  const handleParse = async () => {
    if (!rawText.trim()) {
      toast.error("Пожалуйста, введите текст для парсинга.");
      return;
    }

    setIsLoading(true);
    try {
      const parsedData: Partial<ResumeData> = await resumeService.parseChatToResume({ rawText });
      onParseSuccess(parsedData);
      toast.success("✅ Данные успешно извлечены!");
      setRawText("");
    } catch (error) {
      console.error("AI Parse Error:", error);
      toast.error("Ошибка при парсинге. Проверьте текст или логи бэкенда.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-blue-500" />
        AI Парсер Резюме
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        Вставьте описание вашего опыта — AI автоматически создаст структурированные данные резюме.
      </p>

      <Input.TextArea
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
        rows={6}
        className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        placeholder="Например: Меня зовут ... Я работал ..."
      />

      <div className="flex justify-end mt-4">
        <Button
          type="primary"
          loading={isLoading}
          onClick={handleParse}
          className="flex items-center gap-2 px-5 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
        >
          {isLoading ? (
            <>
              <Spin size="small" />
              <span>Парсим...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Парсить через AI</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
