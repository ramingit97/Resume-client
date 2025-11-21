import { Card, CardContent, CardHeader } from "@/ui/card";
import { Button } from "@/ui/button";
import { useMemo, useState } from "react";
import { Feather, LayoutList, Zap } from "lucide-react";

// --- Импорты компонентов ---

// --- Типы и Моковые данные ---
import { ALL_MOCK_DESIGNS, ColorSettings, DesignSettings, MOCK_DATA, MOCK_DESIGN_SETTINGS_A, ResumeData } from "@/_mock/resume"; // Предполагаем, что этот файл существует
import {TemplateA_Executive} from "./components/TemplateA_Executive";
import AIChatParser from "./AIChatParser";
import ResumeContentEditor from "./ResumeContentEditor";
import ResumeModeSelector from "./ResumeModeSelector";
import { TemplateC_Minimalist } from "./components/TemplateC_Minimalist";
import { TemplateD_Timeline } from "./components/TemplateD_Timeline";
import { TemplateB_DarkTech } from "./components/TemplateB_DarkTech";

// --- Инициализационные данные ---

const INITIAL_COLORS: ColorSettings = {
    headerBg: '#0056b3',
    sidebarBg: '#f0f0f0',
    accent: '#ff9800',
};

const TEMPLATE_MAP = {
    A: { label: 'Template A: Executive', component: TemplateA_Executive, themeKey: 'executive_header' },
    B: { label: 'Template B: Dark Tech', component: TemplateB_DarkTech, themeKey: 'dark_tech' },
};

type TemplateKey = keyof typeof TEMPLATE_MAP;
export type EditorMode = 'MANUAL' | 'AI'; // Экспортируем для использования в ResumeModeSelector

export default function ResumeEditorPage() {
    
     // Используем DesignSettings как основное состояние дизайна
     const [designSettings, setDesignSettings] = useState<DesignSettings>(MOCK_DESIGN_SETTINGS_A);
     const [editableData, setEditableData] = useState<ResumeData>(MOCK_DATA);
     const [editorMode, setEditorMode] = useState<EditorMode>('MANUAL'); 
 
     // --- Карта шаблонов (обновлена для 4 макетов) ---
     const TEMPLATE_MAP = useMemo(() => ({
         A: { label: 'A: Executive (Классика)', component: TemplateA_Executive },
         B: { label: 'B: Dark Tech (Боковая панель)', component: TemplateB_DarkTech },
         C: { label: 'C: Minimalist (Монохром)', component: TemplateC_Minimalist },
         D: { label: 'D: Timeline (Хронолог)', component: TemplateD_Timeline },
     }), []);
     
     // --- Мемоизированные значения ---
     const CurrentTemplate = useMemo(() => TEMPLATE_MAP[designSettings.templateLayoutKey].component, [designSettings.templateLayoutKey, TEMPLATE_MAP]);
     
     // --- Обработчики ---
     
     // Единый обработчик для смены дизайна (включая макет и стили)
     const handleSelectDesign = (key: TemplateKey) => {
         setDesignSettings(ALL_MOCK_DESIGNS[key]);
     };
 
     const handleGeneratePdf = async () => {
         console.log("Saving or Generating PDF for:", editableData.fullName);
     };
 
     // Обновление данных после парсинга AI
     const handleAIParsedData = (parsedData: Partial<ResumeData>) => {
         setEditableData(prev => ({ ...prev, ...parsedData, }));
         setEditorMode('MANUAL');
     };
 
     // --- Компонент Редактирования на основе режима ---
     const EditorComponent = useMemo(() => {
         if (editorMode === 'AI') {
             return (<AIChatParser onParseSuccess={handleAIParsedData} />);
         }
         return (<ResumeContentEditor data={editableData} onDataChange={setEditableData} />);
     }, [editorMode, editableData]);
 
     return (
         <div className="p-4 sm:p-8 h-screen overflow-hidden flex flex-col bg-gray-50">
             <Card className="flex-1 overflow-hidden">
                 <CardHeader>
                     <div className="flex items-center justify-between">
                         <div className="text-xl font-bold">Резюме-Редактор (Design: {designSettings.themeName})</div>
                         <Button onClick={handleGeneratePdf}>
                             Генерировать / Сохранить
                         </Button>
                     </div>
                 </CardHeader>
                 
                 {/* СЕТКА: Настройки (1/4) | Превью (3/4) */}
                 <CardContent className="h-full grid grid-cols-1 md:grid-cols-4 gap-6 overflow-hidden"> 
 
                     {/* 1. ЛЕВАЯ КОЛОНКА: Настройки и Редактирование */}
                     <div className="md:col-span-1 space-y-6 overflow-y-auto pr-2 pb-10">
                         
                         {/* 1.0 ВЫБОР РЕЖИМА */}
                         <ResumeModeSelector editorMode={editorMode} setEditorMode={setEditorMode} />
 
                         {/* 1.1 ФОРМА ВВОДА ДАННЫХ ИЛИ AI ЧАТ */}
                         <div className="border p-4 rounded-lg bg-white shadow-sm">
                             <h3 className="font-semibold mb-3 flex items-center">
                                 {editorMode === 'MANUAL' ? '2. Ручное Редактирование' : '2. AI Парсинг'}
                             </h3>
                             {EditorComponent}
                         </div>
 
                         {/* 1.2. ВЫБОР ШАБЛОНА */}
                         <div className="border p-4 rounded-lg bg-gray-50 shadow-sm">
                             <h3 className="font-semibold mb-3 flex items-center"><LayoutList size={16} className="mr-2 text-gray-600"/> 3. Выбор Макетa</h3>
                             {Object.entries(TEMPLATE_MAP).map(([key, template]) => (
                                 <Button
                                     key={key}
                                     onClick={() => handleSelectDesign(key as TemplateKey)}
                                     variant={designSettings.templateLayoutKey === key ? 'default' : 'outline'}
                                     className={`mr-2 mb-2 w-full justify-start ${designSettings.templateLayoutKey === key ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                                 >
                                     {template.label}
                                 </Button>
                             ))}
                         </div>
 
                         {/* 1.3. ТЕКУЩИЙ СТИЛЬ (Вместо настройки цвета) */}
                         <div className="border p-4 rounded-lg bg-white shadow-sm">
                             <h3 className="font-semibold mb-3 flex items-center"><Zap size={16} className="mr-2 text-gray-600"/> 4. Текущий Стиль (AI-Driven)</h3>
                             <p className="text-sm font-semibold mb-1">Тема: {designSettings.themeName}</p>
                             <p className="text-xs text-gray-600 italic mb-3">Обоснование: {designSettings.justification}</p>
                             
                             <div className="flex items-center space-x-2">
                                 <span className="text-xs font-medium">Основной:</span>
                                 <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: designSettings.styleOverrides.primaryColorHex }}></div>
                                 <span className="text-xs">{designSettings.styleOverrides.primaryColorHex}</span>
                                 
                                 <span className="text-xs font-medium ml-4">Акцент:</span>
                                 <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: designSettings.styleOverrides.accentColorHex }}></div>
                                 <span className="text-xs">{designSettings.styleOverrides.accentColorHex}</span>
                             </div>
                         </div>
                     </div>
 
                     {/* 2. ПРАВАЯ КОЛОНКА: ЖИВОЕ ПРЕВЬЮ */}
                     <div className="md:col-span-3 flex justify-center items-center p-4 bg-gray-100 border rounded-lg h-full">
                         <div className="shadow-2xl transition-shadow border-8 border-white bg-white rounded-lg">
                             <div style={{ transform: 'scale(0.85)', transformOrigin: 'top left' }}>
                                 {/* ИСПРАВЛЕНИЕ: Передаем designSettings как проп design */}
                                 <CurrentTemplate data={editableData} design={designSettings} /> 
                             </div>
                         </div>
                     </div>
                 </CardContent>
             </Card>
         </div>
     );
}