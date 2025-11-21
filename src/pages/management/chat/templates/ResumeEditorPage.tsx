// src/pages/ResumeEditorPage.tsx

import { Card, CardContent, CardHeader } from "@/ui/card"; // Используем условные импорты для компонентов UI
import { Button } from "@/ui/button"; // Предполагаемые компоненты из вашей UI-библиотеки
import { Icon } from "@/components/icon";
import { useState, useMemo } from "react";

// --- Импортируем компоненты шаблонов ---
// Важно: убедитесь, что эти пути и файлы существуют!
import TemplateC_Minimalist from './TemplateC_Minimalist'; 
import { ColorSettings,MOCK_DATA, ResumeData } from "@/_mock/resume";
import ResumeDataForm from "./ResumeDataForm";
import { Feather, LayoutList, Zap } from "lucide-react";
import { TemplateA_Executive } from "./TemplateA_Executive";
import TemplateB_DarkTech from "./TemplateB_DarkTech";

// --- Инициализационные данные ---

const INITIAL_COLORS: ColorSettings = {
    // Начальные цвета
    headerBg: '#0056b3', // Синий фон шапки
    sidebarBg: '#f0f0f0', // Светло-серый фон сайдбара
    accent: '#ff9800',   // Оранжевый акцентный цвет
};

// Карта доступных шаблонов
const TEMPLATE_MAP = {
    A: { label: 'Template A: Executive', component: TemplateA_Executive, themeKey: 'executive_header' },
    B: { label: 'Template B: Dark Tech', component: TemplateB_DarkTech, themeKey: 'dark_tech' },
    C: { label: 'Template C: Minimalist', component: TemplateC_Minimalist, themeKey: 'minimalist_accent' },
};

type TemplateKey = keyof typeof TEMPLATE_MAP;

export default function ResumeEditorPage() {
    
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('A');
    const [colorSettings, setColorSettings] = useState<ColorSettings>(INITIAL_COLORS);
    const [editableData, setEditableData] = useState<ResumeData>(MOCK_DATA);

    const CurrentTemplate = useMemo(() => TEMPLATE_MAP[selectedTemplate].component, [selectedTemplate]);
    
    const handleColorChange = (key: keyof ColorSettings, value: string) => {
        setColorSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleGeneratePdf = async () => {
        const themeKey = TEMPLATE_MAP[selectedTemplate].themeKey;
        
        const payload = {
            resumeData: editableData, 
            themeKey: themeKey, 
            colors: colorSettings, 
        };

        console.log("--- Payload to Backend ---");
        console.log(JSON.stringify(payload, null, 2));
        alert(`Отправка на API: Тема=${themeKey}. Проверьте console.log для Payload. Здесь будут отправлены данные ${editableData.fullName} и выбранные цвета.`);
    };

    return (
        <div className="p-4 sm:p-8 h-screen overflow-hidden flex flex-col bg-gray-50">
            <Card className="flex-1 overflow-hidden">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="text-xl font-bold">Резюме-Редактор (Dynamic Preview)</div>
                        <Button onClick={handleGeneratePdf}>
                            Генерировать PDF
                        </Button>
                    </div>
                </CardHeader>
                
                {/* ГЛАВНОЕ ИЗМЕНЕНИЕ: СЕТКА 1:3 */}
                <CardContent className="h-full grid grid-cols-1 md:grid-cols-4 gap-6 overflow-hidden"> 

                    {/* 1. ЛЕВАЯ КОЛОНКА: ВСЕ НАСТРОЙКИ (занимает 1/4 ширины) */}
                    <div className="md:col-span-1 space-y-6 overflow-y-auto pr-2 pb-10">
                        
                        {/* 1.1. ФОРМА ВВОДА ДАННЫХ */}
                        <div className="border p-4 rounded-lg bg-white shadow-sm">
                            <h3 className="font-semibold mb-3 flex items-center"><Feather size={16} className="mr-2 text-gray-600"/> 1. Редактирование Данных</h3>
                            <ResumeDataForm
                                data={editableData} 
                                onDataChange={setEditableData} // Связь с превью
                            />
                        </div>

                        {/* 1.2. ВЫБОР ШАБЛОНА */}
                        <div className="border p-4 rounded-lg bg-gray-50 shadow-sm">
                            <h3 className="font-semibold mb-3 flex items-center"><LayoutList size={16} className="mr-2 text-gray-600"/> 2. Выбор Макетa</h3>
                            {Object.entries(TEMPLATE_MAP).map(([key, template]) => (
                                <Button
                                    key={key}
                                    onClick={() => setSelectedTemplate(key as TemplateKey)}
                                    variant={selectedTemplate === key ? 'default' : 'outline'}
                                    className={`mr-2 mb-2 w-full justify-start ${selectedTemplate === key ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                                >
                                    {template.label}
                                </Button>
                            ))}
                        </div>

                        {/* 1.3. НАСТРОЙКА ЦВЕТА */}
                        <div className="border p-4 rounded-lg bg-white shadow-sm">
                            <h3 className="font-semibold mb-3 flex items-center"><Zap size={16} className="mr-2 text-gray-600"/> 3. Настройка Цвета</h3>
                            {Object.keys(INITIAL_COLORS).map(key => (
                                <div key={key} className="flex items-center justify-between mb-2">
                                    <label className="capitalize text-sm">{key.replace('Bg', ' Background').replace('accent', ' Accent')}</label>
                                    <input
                                        type="color"
                                        value={colorSettings[key as keyof ColorSettings]}
                                        onChange={(e) => handleColorChange(key as keyof ColorSettings, e.target.value)}
                                        className="w-10 h-8 p-0 border-0 rounded cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2. ПРАВАЯ КОЛОНКА: ЖИВОЕ ПРЕВЬЮ (занимает 3/4 ширины) */}
                    <div className="md:col-span-3 flex justify-center items-center p-4 bg-gray-100 border rounded-lg h-full">
                        {/* Контейнер превью */}
                        <div className="shadow-2xl transition-shadow border-8 border-white bg-white rounded-lg">
                            {/* Рендеринг текущего шаблона с динамическими данными и цветами */}
                            {/* Масштабируем превью для лучшего размещения в широкой области */}
                            <div style={{ transform: 'scale(0.85)', transformOrigin: 'top left' }}>
                                <CurrentTemplate data={editableData} colors={colorSettings} />
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}