// src/components/Resume/AIChatParser.tsx (Обновленный Светлый Дизайн)

import { Button } from "@/ui/button";
import { Textarea } from "@/ui/textarea";
import { useState } from "react";
import { Send, Loader2, Bot } from "lucide-react";
import { toast } from "sonner";
import resumeService from "@/api/services/resumeService";
import type { ResumeData } from "@/_mock/resume"; 

interface AIChatParserProps {
    onParseSuccess: (data: Partial<ResumeData>) => void;
}

// Пример текста
const EXAMPLE_TEXT = 'Меня зовут Елена Козлова. Я ищу работу как младший инженер по данным (Junior Data Engineer). Мой телефон 8-800-555-35-35, а почта elena.k@mail.ru. Я работала в "Аналитика Плюс" с 2022 по 2024 год, где отвечала за ETL-процессы, используя Python и Apache Airflow. Я окончила МГУ, факультет ВМК в 2021 году. Мои основные навыки: SQL, Python, ETL, Airflow.';

export default function AIChatParser({ onParseSuccess }: AIChatParserProps) {
    const [rawText, setRawText] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleParse = async () => {
        if (!rawText.trim()) {
            toast.error("Пожалуйста, введите текст для парсинга.");
            return;
        }

        setLoading(true);
        try {
            const parsedData = await resumeService.parseChatToResume({ rawText });
            onParseSuccess(parsedData);
            toast.success("Данные успешно извлечены и применены!");
        } catch (error) {
            console.error("AI Parse Error:", error);
            toast.error("Ошибка парсинга. Проверьте формат текста или логи бэкенда.");
        } finally {
            setLoading(false);
        }
    };

    return (
        // Фон: Белый, Растянут на всю доступную высоту
        <div className="bg-white p-0 h-full flex flex-col space-y-4"> 
            
            {/* Заголовок (Светло-зеленый акцент) */}
            <div className="p-3 border-b bg-gray-50 rounded-t-lg">
                <h3 className="font-bold flex items-center text-md text-gray-800">
                    <Bot size={20} className="mr-2 text-green-600"/> 
                    AI Парсинг
                </h3>
            </div>

            <div className="px-3 space-y-3 flex flex-col flex-1">
                {/* Описание */}
                <p className="text-xs text-gray-600">
                    Введите свободный текст о вашем опыте. ИИ структурирует данные автоматически.
                </p>
                
                {/* Кнопка с примером */}
                <Button 
                    variant="link" 
                    className="p-0 h-auto justify-start text-xs text-blue-600 hover:text-blue-800"
                    onClick={() => setRawText(EXAMPLE_TEXT)}
                >
                    Использовать пример текста
                </Button>
                
                {/* Поле ввода (Растягиваем его, чтобы занять оставшееся пространство) */}
                <Textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Начните вводить ваш опыт работы, образование и навыки..."
                    // Светлые стили для Textarea
                    className="flex-1 bg-white border-gray-300 text-gray-800 placeholder-gray-400 min-h-[150px] resize-none focus:border-green-500 focus:ring-green-500"
                    disabled={loading}
                />
            </div>

            {/* Кнопка отправки (Светло-зеленый акцент) */}
            <div className="p-3 border-t">
                <Button 
                    onClick={handleParse} 
                    disabled={loading || !rawText.trim()}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                    {loading ? (
                        <Loader2 className="animate-spin mr-2" size={20} />
                    ) : (
                        <Send size={20} className="mr-2" />
                    )}
                    {loading ? 'Анализ данных...' : 'Парсить в Резюме'}
                </Button>
            </div>
        </div>
    );
}