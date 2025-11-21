import { DesignSettings, MOCK_DATA, MOCK_DESIGN_SETTINGS_A, MOCK_DESIGN_SETTINGS_B, MOCK_DESIGN_SETTINGS_C, ResumeData } from "@/_mock/resume";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import {TemplateA_Executive} from "../chat/templates/TemplateA_Executive";
import { TemplateB_DarkTech } from "./components/TemplateB_DarkTech";
import { Button } from "antd";

// Импортируем AIChatParser, который был в предыдущем контексте (если он существует)
// const AIChatParser = React.lazy(() => import('../chat/AIChatParser'));
// Для простоты я оставляю здесь заглушку AIChatParser, так как он не был предоставлен полностью.

interface AIChatParserProps {
    onParseSuccess: (data: Partial<ResumeData>) => void;
    setToast: (t: ToastState) => void;
}

// Заглушка для компонента AIChatParser, чтобы код компилировался
const AIChatParser: React.FC<AIChatParserProps> = ({ onParseSuccess, setToast }) => (
    <div className="p-4 bg-white border rounded-lg shadow-lg h-full">
        <h3 className="font-bold text-lg mb-4">AI Парсер (Заглушка)</h3>
        <p className="text-sm text-gray-500">
            Здесь находится компонент AIChatParser для ввода текста.
            <br/>
            Успешный парсинг вызовет 'handleParseSuccess'.
        </p>
        <Button onClick={() => onParseSuccess(MOCK_DATA)} type="primary" className="mt-4">
            Имитировать Парсинг
        </Button>
    </div>
);


interface ToastState {
    message: string;
    description: string;
    type: 'success' | 'error' | 'info';
}


const useToast = () => {
    const [toastState, setToastState] = useState<ToastState | null>(null);

    const setToast = useCallback((t: ToastState) => {
        setToastState(t);
        // Интеграция с вашей моковой функцией
        mockToast(t.type, t.message, t.description);
    }, []);

    // Очистка уведомления через 5 секунд (имитация)
    useEffect(() => {
        if (toastState) {
            const timer = setTimeout(() => setToastState(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [toastState]);

    return { toastState, setToast };
};

// Ваша моковая функция уведомления
const mockToast = (type: 'success' | 'error' | 'info', message: string, description: string) => {
    console.log(`[TOAST ${type.toUpperCase()}]: ${message} - ${description}`);
    const statusDiv = document.getElementById('status-message');
    if (statusDiv) {
        statusDiv.innerHTML = `
            <div class="p-3 rounded-lg text-sm ${type === 'success' ? 'bg-green-100 text-green-700' : type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}">
                <strong>${message}</strong>: ${description}
            </div>
        `;
        setTimeout(() => statusDiv.innerHTML = '', 5000); // Очистка
    }
};


export const AiStyleGenerate: React.FC = () => {
    // Используем MOCK_DATA из вашего импорта
    const [resumeData, setResumeData] = useState<ResumeData>(MOCK_DATA); 
    const [designSettings, setDesignSettings] = useState<DesignSettings | null>(null);
    const [loadingDesign, setLoadingDesign] = useState(false);
    const [currentLayout, setCurrentLayout] = useState< 'A' | 'B' | 'C' | 'D'>('B'); // Отслеживаем выбранный макет

    const { setToast } = useToast();
    
    // ------------------- Логика Дизайна (Вызов API) -------------------
    const loadDesign = async (data: Partial<ResumeData>, layoutKey: 'A' | 'B' | 'C' | 'D') => {
        setLoadingDesign(true);
        setDesignSettings(null);
        setCurrentLayout(layoutKey);

        try {
            // Вызов вашего реального сервиса, передаем полные данные резюме
            // Предполагаем, что resumeService.recommendDesign() принимает 'data' и 'layoutKey'
            const settings: DesignSettings = MOCK_DESIGN_SETTINGS_A; 
            
            console.log('Полученные настройки дизайна:', settings);
            
            setDesignSettings(settings);
            setToast({ 
                type: 'success', 
                message: "Дизайн загружен", 
                description: `Макет ${settings.templateLayoutKey} от ИИ. ${settings.justification}` 
            });

        } catch (error) {
            console.error("Ошибка загрузки дизайна:", error);
            setToast({ 
                type: 'error', 
                message: "Ошибка дизайна", 
                description: "Не удалось получить настройки дизайна от бэкенда." 
            });
            
            // Запасной вариант на случай ошибки API (можно убрать в продакшене)
            setDesignSettings(layoutKey === 'A' ? MOCK_DESIGN_SETTINGS_A : MOCK_DESIGN_SETTINGS_B);
            
        } finally {
            setLoadingDesign(false);
        }
    };

    // Инициализация загрузки дизайна при первом рендере
    useEffect(() => {
        // Загружаем дизайн для моковых данных при старте
        loadDesign(resumeData, currentLayout);
    }, []); 

    // ------------------- Логика Парсинга (вызывает loadDesign) -------------------
    const handleParseSuccess = (parsedData: Partial<ResumeData>) => {
        let newResumeData: ResumeData;
        
        // 1. Обновляем локальное состояние данных
        setResumeData(prevData => {
            // Глубокое слияние объектов (ваша логика)
            const newContact = { ...prevData.contact, ...parsedData.contact };
            
            newResumeData = {
                ...prevData,
                ...parsedData,
                contact: newContact,
                skills: parsedData.skills || prevData.skills,
                experience: parsedData.experience || prevData.experience,
                education: parsedData.education || prevData.education,
            };
            return newResumeData;
        });

        // 2. Вызываем рекомендацию дизайна с НОВЫМИ данными
        // Используем колбэк для получения актуальных данных перед вызовом API
        setResumeData(prevData => {
             const finalData = {
                ...prevData,
                ...parsedData,
             };
             loadDesign(finalData, currentLayout);
             return finalData;
        });
    };

    const renderTemplate = useMemo(() => {
        if (loadingDesign || !designSettings) {
            return (
                <div className="text-center p-10 bg-white rounded-xl border border-gray-200 shadow-md w-full max-w-[210mm] min-h-[297mm] flex items-center justify-center">
                    <Loader2 className="animate-spin mx-auto w-8 h-8 text-blue-500" />
                    <p className="mt-4 text-gray-600 ml-3">Загрузка рекомендованного дизайна...</p>
                </div>
            );
        }

        switch (designSettings.templateLayoutKey) {
            case 'A':
                return <TemplateA_Executive data={resumeData} design={designSettings} />;
            case 'B':
                return <TemplateB_DarkTech data={resumeData} design={designSettings} />;
            case 'C':
                return <TemplateB_DarkTech data={resumeData} design={designSettings} />;
            case 'D':
                return <TemplateB_DarkTech data={resumeData} design={designSettings} />;    
            default:
                return (<div className="p-4 bg-red-100 border border-red-400 rounded">Ошибка: Неизвестный ключ макета "{designSettings.templateLayoutKey}".</div>);
        }
    }, [designSettings, resumeData, loadingDesign]);


    return (
        <div className="p-8 bg-gray-100 min-h-screen antialiased">
            <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Конструктор Резюме: Парсинг и Дизайн от AI</h1>
            
            {/* Контейнер для вашего мокового toast */}
            <div id="status-message" className="fixed top-4 right-4 z-50"></div>

            <div className="flex flex-col lg:flex-row gap-6 mx-auto max-w-7xl">
                
                {/* Колонка 1: AI Parser */}
                <div className="w-full lg:w-1/4 min-h-[500px]">
                    {/* Используем заглушку или ваш реальный AIChatParser */}
                    <AIChatParser onParseSuccess={handleParseSuccess} setToast={setToast} /> 
                </div>

                {/* Колонка 2: Resume Preview */}
                <div className="w-full lg:w-3/4 flex flex-col items-center space-y-4">
                    <div className="flex justify-center w-full space-x-4">
                        <Button 
                            // Передаем текущие данные резюме и ключ макета
                            onClick={() => loadDesign(resumeData, 'B')} 
                            disabled={loadingDesign || currentLayout === 'B'}
                            className="bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                        >
                            {loadingDesign && currentLayout === 'B' ? (<><Loader2 className="animate-spin h-4 w-4 inline mr-2" /> Генерация B...</>) : ("Макет B (Современный)")}
                        </Button>
                        <Button
                            // Передаем текущие данные резюме и ключ макета
                            onClick={() => loadDesign(resumeData, 'A')} 
                            disabled={loadingDesign || currentLayout === 'A'}
                            className="bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {loadingDesign && currentLayout === 'A' ? (<><Loader2 className="animate-spin h-4 w-4 inline mr-2" /> Генерация A...</>) : ("Макет A (Классика)")}
                        </Button>

                        <Button
                            // Передаем текущие данные резюме и ключ макета
                            onClick={() => loadDesign(resumeData, 'C')} 
                            disabled={loadingDesign || currentLayout === 'C'}
                            className="bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {loadingDesign && currentLayout === 'C' ? (<><Loader2 className="animate-spin h-4 w-4 inline mr-2" /> Генерация C...</>) : ("Макет C (Классика)")}
                        </Button>

                        <Button
                            // Передаем текущие данные резюме и ключ макета
                            onClick={() => loadDesign(resumeData, 'D')} 
                            disabled={loadingDesign || currentLayout === 'D'}
                            className="bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {loadingDesign && currentLayout === 'D' ? (<><Loader2 className="animate-spin h-4 w-4 inline mr-2" /> Генерация D...</>) : ("Макет D (Классика)")}
                        </Button>
                    </div>

                    <div className="flex justify-center w-full">
                        {renderTemplate}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiStyleGenerate;