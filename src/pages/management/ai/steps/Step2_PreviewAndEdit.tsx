import React, { useState, useMemo, useCallback } from 'react';
import { LayoutList, Feather, Download, Palette, Edit } from 'lucide-react';
import { TemplateA_Executive } from '../components/TemplateA_Executive';
import { TemplateB_DarkTech } from '../components/TemplateB_DarkTech';
import { TemplateC_Minimalist } from '../components/TemplateC_Minimalist';
import { TemplateD_Timeline } from '../components/TemplateD_Timeline';

// --- (Предполагаемые импорты и константы из родительского файла) ---

// Используем заглушки для констант, которые должны быть в глобальной области
// или импортированы из родительского файла (AIResumeWorkflowWizard.jsx)
const TEMPLATE_MAP = {
    A: { label: 'A: Executive (Классика)', component: ({ data, design }) => <div>Макет A: {data.fullName}</div> },
    B: { label: 'B: Dark Tech (Боковая панель)', component: ({ data, design }) => <div>Макет B: {data.fullName}</div> },
    C: { label: 'C: Minimalist (Монохром)', component: ({ data, design }) => <div>Макет C: {data.fullName}</div> },
    D: { label: 'D: Timeline (Хронолог)', component: ({ data, design }) => <div>Макет D: {data.fullName}</div> },
};

// Расширенная палитра для детальных настроек
const COLOR_OPTIONS = {
    // Основные цвета
    PRIMARY: [
        { key: 'P_INDIGO', hex: '#4f46e5', name: 'Синий' },
        { key: 'P_EMERALD', hex: '#059669', name: 'Зеленый' },
        { key: 'P_BLACK', hex: '#000000', name: 'Черный' }
    ],
    // Вспомогательные/Акцентные цвета
    ACCENT: [
        { key: 'A_ROSE', hex: '#e11d48', name: 'Роза' },
        { key: 'A_ORANGE', hex: '#ff9800', name: 'Оранж' },
        { key: 'A_GRAY', hex: '#666666', name: 'Серый' }
    ],
};

// --- Mock UI Components (для автономности) ---
const cn = (...classes) => classes.filter(Boolean).join(' ');
const Button = ({ children, onClick, disabled, className, variant = 'default', title }) => (
    <button 
        onClick={onClick} 
        disabled={disabled}
        title={title}
        className={cn(
            "px-4 py-2 rounded-lg font-semibold transition duration-200 flex items-center justify-center text-sm",
            variant === 'default' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100',
            className,
            disabled && 'opacity-50 cursor-not-allowed'
        )}
    >
        {children}
    </button>
);

const ColorPicker = ({ label, value, onChange, options }) => (
    <div className="space-y-1">
        <label className="text-xs font-medium text-gray-700 block">{label}</label>
        <div className="flex flex-wrap gap-2">
            {options.map((color) => (
                <button
                    key={color.key}
                    title={color.name}
                    onClick={() => onChange(color.hex)}
                    className={cn(
                        "w-6 h-6 rounded-full border-2 transition duration-200",
                        value === color.hex ? 'scale-110 ring-2 ring-offset-2' : 'hover:scale-105 border-gray-300'
                    )}
                    style={{ backgroundColor: color.hex, ringColor: color.hex }}
                />
            ))}
        </div>
    </div>
);

// --- (Template Components - заменены на заглушки для краткости) ---


/**
 * Шаг 2: Просмотр и Детальная Настройка Дизайна
 * @param {object} props
 * @param {object} props.data - Данные резюме, распарсенные AI.
 * @param {object} props.initialDesign - Начальные настройки дизайна.
 * @param {function} props.onReset - Функция для возврата к Шагу 1.
 */
export const Step2_PreviewAndEdit = ({ data, initialDesign, onReset }) => {
  // Инициализация состояний дизайна из данных, предложенных AI
  const [selectedTemplateKey, setSelectedTemplateKey] = useState(initialDesign.templateLayoutKey);

  // Локальное состояние для детальных цветов
  const [customColors, setCustomColors] = useState({
      headerColor: initialDesign.styleOverrides.primaryColorHex,
      sidebarColor: initialDesign.styleOverrides.sidebarBg || '#f0f0f0', 
      accentColor: initialDesign.styleOverrides.accentColorHex,
  });
  
  // Нам нужно локально хранить данные, чтобы пользователь мог их редактировать (заглушка)
  const [editableData] = useState(data); 

  // Вычисление текущих настроек дизайна на основе выбора
  const currentDesign = useMemo(() => {
      
      return {
          ...initialDesign, 
          templateLayoutKey: selectedTemplateKey,
          styleOverrides: {
              ...initialDesign.styleOverrides,
              // Переопределяем стили детальными настройками
              primaryColorHex: customColors.headerColor, 
              sidebarBg: customColors.sidebarColor,      
              accentColorHex: customColors.accentColor, 
          },
          themeName: TEMPLATE_MAP[selectedTemplateKey]?.label,
      };
  }, [selectedTemplateKey, customColors, initialDesign]);

  // Получаем компонент для рендеринга
  const CurrentTemplate = TEMPLATE_MAP[selectedTemplateKey]?.component; 

  const handleColorChange = useCallback((key, hex) => {
      setCustomColors(prev => ({ ...prev, [key]: hex }));
  }, []);
  
  // Адаптивное отображение настроек шаблона
  const TemplatePicker = (
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
          <h4 className="font-semibold flex items-center text-gray-700 shrink-0"><LayoutList size={18} className="mr-2"/> Макет:</h4>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              {Object.entries(TEMPLATE_MAP).map(([key, template]) => (
                  <Button
                      key={key}
                      onClick={() => setSelectedTemplateKey(key)}
                      variant={currentDesign.templateLayoutKey === key ? 'default' : 'outline'}
                      className={`justify-center h-8 px-3 py-1 ${currentDesign.templateLayoutKey === key ? 'bg-indigo-600 hover:bg-indigo-700' : 'text-gray-600'}`}
                  >
                      {key} ({template.label.split('(')[0].trim()})
                  </Button>
              ))}
          </div>
      </div>
  );

  return (
      <div className="flex flex-col h-full w-full p-4 md:p-8 bg-gray-50">
          
          {/* TOP BAR: КОМПАКТНЫЕ НАСТРОЙКИ (Full Width) */}
          <Card className="mb-6 p-4 shadow-lg border-indigo-200">
              <h1 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4 flex items-center" style={{ color: currentDesign.styleOverrides.primaryColorHex }}>
                  <Edit size={20} className="mr-2"/> Шаг 2: Настройка Дизайна Резюме
              </h1>
              
              {/* 1. Настройки Макетa */}
              {TemplatePicker}

              {/* 2. Детальная Настройка Цвета */}
              <div className="space-y-3 mt-4 pt-4 border-t">
                  <h3 className="font-semibold flex items-center text-gray-700"><Palette size={18} className="mr-2"/> Цвета:</h3>
                  
                  <div className="flex flex-wrap gap-6 items-start">
                      <ColorPicker 
                          label="Цвет Заголовка / Основной"
                          value={customColors.headerColor}
                          onChange={(hex) => handleColorChange('headerColor', hex)}
                          options={COLOR_OPTIONS.PRIMARY}
                      />

                      <ColorPicker 
                          label="Цвет Боковой Панели (Sidebar)"
                          value={customColors.sidebarColor}
                          onChange={(hex) => handleColorChange('sidebarColor', hex)}
                          options={[
                              ...COLOR_OPTIONS.PRIMARY, 
                              { key: 'WHITE', hex: '#ffffff', name: 'Белый' }, 
                              { key: 'LIGHT_GRAY', hex: '#f0f0f0', name: 'Светло-серый' }
                          ]}
                      />

                      <ColorPicker 
                          label="Цвет Акцента / Разделителей"
                          value={customColors.accentColor}
                          onChange={(hex) => handleColorChange('accentColor', hex)}
                          options={COLOR_OPTIONS.ACCENT}
                      />

                      {/* Действия */}
                      <div className="ml-auto flex items-end gap-3 pt-2">
                           <Button
                              onClick={onReset}
                              variant="outline"
                              className="text-gray-700 bg-gray-100 hover:bg-gray-200 h-10"
                          >
                              <Feather size={16} className="mr-2"/>
                              Шаг 1 (Текст)
                          </Button>
                          <Button
                              onClick={() => alert(`Скачивание PDF для ${currentDesign.templateLayoutKey} с текущими настройками.`)}
                              className="bg-purple-600 hover:bg-purple-700 shadow-md h-10"
                          >
                              <Download size={20} className="mr-2"/>
                              Скачать PDF
                          </Button>
                      </div>
                  </div>
              </div>
          </Card>

          {/* MAIN AREA: ЖИВОЕ ПРЕВЬЮ (Использует всю ширину) */}
          <div className="flex-grow flex justify-center items-start p-4 bg-gray-200 border border-gray-300 rounded-xl shadow-inner overflow-auto">
              <div className="shadow-2xl transition-shadow border-8 border-white bg-white rounded-lg">
                  {/* Масштабирование для удобства просмотра на небольших экранах */}
                  <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
                      {CurrentTemplate ? (
                          <CurrentTemplate data={editableData} design={currentDesign} />
                      ) : (
                          <div className="p-8 text-center text-red-500">Ошибка: Шаблон не найден.</div>
                      )}
                  </div>
              </div>
          </div>
      </div>
  );
};