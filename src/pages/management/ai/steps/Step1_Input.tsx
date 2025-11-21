import resumeService from "@/api/services/resumeService";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { TemplateA_Executive } from "../components/TemplateA_Executive";
import { TemplateB_DarkTech } from "../components/TemplateB_DarkTech";
import { TemplateC_Minimalist } from "../components/TemplateC_Minimalist";
import { TemplateD_Timeline } from "../components/TemplateD_Timeline";
import { Button, Card } from "antd";
import { Bot, Loader2 } from "lucide-react";
import { Textarea } from "@/ui/textarea";
import { TemplateKey } from "@/_mock/resume";

const EXAMPLE_TEXT = 'Имя: Елена Козлова. Ищу работу как младший инженер по данным (Junior Data Engineer). Мой телефон 8-800-555-35-35, а почта elena.k@mail.ru. Я работала в "Аналитика Плюс" с 2022 по 2024 год, где отвечала за ETL-процессы, используя Python и Apache Airflow. Окончила МГУ в 2021 году. Навыки: SQL, Python, ETL, Airflow.';

export const COLOR_PALETTES = [
  { key: 'Indigo', primary: '#4f46e5', accent: '#a5b4fc', name: 'Индиго' },
  { key: 'Emerald', primary: '#059669', accent: '#6ee7b7', name: 'Изумруд' },
  { key: 'Rose', primary: '#e11d48', accent: '#fda4af', name: 'Розовый' },
  { key: 'Black', primary: '#000000', accent: '#666666', name: 'Монохром' },
];

// --- Mock-структура для базового дизайна A (Executive), используемая по умолчанию ---
export const DEFAULT_DESIGN_A = {
  templateLayoutKey: 'A',
  themeName: 'Executive',
  styleOverrides: {
    primaryColorHex: '#4f46e5', // Используем цвет Indigo по умолчанию
    accentColorHex: '#a5b4fc',
    textColorHex: '#333333',
  },
  justification: 'Классический, строгий дизайн.',
};
// ---------------------------------------------------------------------------------


export const Step1_Input = ({ onNext }) => {
    const [rawText, setRawText] = useState(EXAMPLE_TEXT);
    const [isLoading, setIsLoading] = useState(false);

    // Карта шаблонов нужна только для отображения и получения базовых настроек,
    // но в данном случае мы будем использовать только DEFAULT_DESIGN_A.
    const TEMPLATE_MAP = useMemo(() => ({
      A: { label: 'A: Executive (Классика)', component: TemplateA_Executive },
      B: { label: 'B: Dark Tech (Боковая панель)', component: TemplateB_DarkTech },
      C: { label: 'C: Minimalist (Монохром)', component: TemplateC_Minimalist },
      D: { label: 'D: Timeline (Хронолог)', component: TemplateD_Timeline },
    }), []);

    const handleSubmit = async () => {
        if (!rawText.trim()) return;
        setIsLoading(true);

        try {
            // Реальный вызов (через локальный mock) API для парсинга
            const aiResult = await resumeService.parseChatToResume({ rawText });
            
            // --- ИСПРАВЛЕННЫЙ БЛОК: Инициализация дизайна по умолчанию (A - Indigo) ---
            
            // 1. Берем дефолтный дизайн (A: Executive)
            const templateBase = DEFAULT_DESIGN_A; 
            
            // 2. Берем первый цвет из палитры (Indigo)
            const defaultColor = COLOR_PALETTES[0];
            
            // 3. Формируем финальные настройки дизайна
            const currentTemplateKey = templateBase.templateLayoutKey as TemplateKey;
            
            // 3. Формируем финальные настройки дизайна
            const initialDesign = {
                ...templateBase,
                styleOverrides: {
                    ...templateBase.styleOverrides,
                    primaryColorHex: defaultColor.primary,
                    accentColorHex: defaultColor.accent,
                },
                // ИСПОЛЬЗУЕМ ПРИВЕДЕННЫЙ КЛЮЧ
                themeName: defaultColor.name + ' ' + TEMPLATE_MAP[currentTemplateKey].label, 
            };
            
            // 4. В ответе AI ожидаем только данные резюме (resumeData)
            // Предполагаем, что aiResult содержит только данные, без suggestedDesign
            const resumeData = aiResult; 
            
            onNext(resumeData, initialDesign);
            toast.success("Данные успешно извлечены и применены!");
            
        } catch (error) {
            console.error("AI Parse Error:", error);
            // Уведомление об ошибке
            toast.error("Ошибка парсинга. Проверьте формат текста или логи.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="flex flex-col space-y-6 max-w-2xl w-full p-8 shadow-2xl">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">Шаг 1: Введите информацию о себе</h1>
                <p className="text-gray-600 mt-2">Опишите ваш опыт в свободной форме. AI структурирует данные.</p>
            </div>

            <Textarea
                className="w-full h-64 p-4 border-2 focus:border-indigo-500 min-h-[150px]"
                placeholder="Начните вводить ваш опыт работы, образование и навыки..."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                disabled={isLoading}
            />
            
            <div className="flex justify-between items-center text-xs text-gray-500">
                <Button 
                    onClick={() => setRawText(EXAMPLE_TEXT)}
                    className="p-0 h-auto justify-start text-xs bg-transparent text-blue-600 hover:text-blue-800 hover:bg-transparent"
                    variant="link"
                >
                    Использовать пример текста
                </Button>
            </div>


            <Button
                onClick={handleSubmit}
                disabled={isLoading || !rawText.trim()}
                className={`flex items-center justify-center px-6 py-3 text-white font-semibold rounded-full shadow-lg transition duration-300 ${
                    isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 active:shadow-none active:bg-green-800'
                }`}
            >
                {isLoading ? (
                    <><Loader2 className="animate-spin mr-2" size={18} /> Анализ данных...</>
                ) : (
                    <>
                        <Bot size={18} className="mr-2" />
                        Парсить и Перейти к Дизайну
                    </>
                )}
            </Button>
        </Card>
    );
};