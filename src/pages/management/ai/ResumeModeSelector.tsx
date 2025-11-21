import { Button } from "@/ui/button";
import { LayoutList, Bot } from "lucide-react";
import { Feather } from "lucide-react";
import { EditorMode } from "./ResumeEditorPage";

interface ResumeModeSelectorProps {
    editorMode: EditorMode;
    setEditorMode: (mode: EditorMode) => void;
}

export default function ResumeModeSelector({ editorMode, setEditorMode }: ResumeModeSelectorProps) {
    return (
        <div className="border p-4 rounded-lg bg-white shadow-md">
            <h3 className="font-semibold mb-3 flex items-center">
                <Feather size={16} className="mr-2 text-gray-600"/> 1. Выбор Режима Ввода
            </h3>
            <div className="flex space-x-2">
                <Button 
                    onClick={() => setEditorMode('MANUAL')}
                    variant={editorMode === 'MANUAL' ? 'default' : 'outline'}
                    className="flex-1"
                >
                    <LayoutList size={16} className="mr-1"/> Вручную
                </Button>
                <Button 
                    onClick={() => setEditorMode('AI')}
                    variant={editorMode === 'AI' ? 'default' : 'outline'}
                    className="flex-1"
                >
                    <Bot size={16} className="mr-1"/> AI Парсинг
                </Button>
            </div>
        </div>
    );
}