import { Button } from "@/ui/button";
import { Plus } from "lucide-react";
import type { ResumeData } from "@/_mock/resume"; 

interface ResumeContentEditorProps {
    data: ResumeData;
    onDataChange: (data: ResumeData) => void;
}

// Этот компонент должен стать сложным, содержащим все формы для редактирования
export default function ResumeContentEditor({ data, onDataChange }: ResumeContentEditorProps) {

    // --- Пример функции-заглушки для обновления ---
    const updateGeneralData = (key: keyof ResumeData, value: string) => {
        onDataChange({ ...data, [key]: value });
    };

    // --- Пример: Простая форма для General Info ---
    const renderGeneralInfo = () => (
        <div className="space-y-3">
            <h4 className="font-semibold text-sm">Основная информация</h4>
            <input 
                type="text" 
                value={data.fullName || ''} 
                onChange={(e) => updateGeneralData('fullName', e.target.value)}
                placeholder="Полное имя"
                className="w-full border p-2 rounded text-sm"
            />
            <input 
                type="email" 
                value={data.contact.email || ''} 
                onChange={(e) => onDataChange({...data, contact: {...data.contact, email: e.target.value}})}
                placeholder="Email"
                className="w-full border p-2 rounded text-sm"
            />
        </div>
    );

    // --- Пример: Секция Опыт Работы ---
    const renderExperienceSection = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm">Опыт работы ({data.experience.length})</h4>
                <Button variant="outline" size="sm">
                    <Plus size={16} className="mr-1" /> Добавить
                </Button>
            </div>
            {/* Здесь будет рендеринг и редактирование элементов опыта */}
            <div className="text-xs text-gray-500">
                ... (формы для редактирования опыта)
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {renderGeneralInfo()}
            <hr className="border-gray-200"/>
            {renderExperienceSection()}
            {/* Добавить секции для Education и Skills */}
        </div>
    );
}