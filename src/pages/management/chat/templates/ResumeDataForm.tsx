// src/components/ResumeDataForm.tsx (Новый вспомогательный компонент)

import React from 'react';
import { Input } from "@/ui/input"; // Предполагаемый компонент ввода
import { CardContent } from "@/ui/card";
import { ResumeData } from '@/_mock/resume';

interface ResumeDataFormProps {
  data: ResumeData;
  onDataChange: (newData: ResumeData) => void;
}

const ResumeDataForm: React.FC<ResumeDataFormProps> = ({ data, onDataChange }) => {
  
  // Хелпер для обновления вложенных полей
  const handleBaseChange = (field: keyof ResumeData, value: string) => {
    onDataChange({ ...data, [field]: value });
  };
  
  // Хелпер для обновления вложенных объектов (например, контактов)
  const handleContactChange = (field: keyof ResumeData['contact'], value: string) => {
    onDataChange({ 
        ...data, 
        contact: { ...data.contact, [field]: value } 
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold border-b pb-1 text-lg">Основная Информация</h3>
      
      {/* 1. ФИО */}
      <div>
        <label className="text-sm font-medium">Полное Имя</label>
        <Input 
          value={data.fullName} 
          onChange={(e) => handleBaseChange('fullName', e.target.value)}
          placeholder="Иван Петров"
        />
      </div>

      {/* 2. Должность */}
      <div>
        <label className="text-sm font-medium">Заголовок/Должность</label>
        <Input 
          value={data.title} 
          onChange={(e) => handleBaseChange('title', e.target.value)}
          placeholder="Senior Full-Stack Developer"
        />
      </div>

      {/* 3. Контакт Email */}
      <div>
        <label className="text-sm font-medium">Email</label>
        <Input 
          value={data.contact.email} 
          onChange={(e) => handleContactChange('email', e.target.value)}
          placeholder="email@example.com"
        />
      </div>
      
      {/* Здесь будут формы для Опыта, Навыков и Образования */}
      <p className="text-xs text-gray-500 mt-4">
        *Для простоты показаны только базовые поля. Опыт и Навыки будут реализованы аналогично.
      </p>
    </div>
  );
};

export default ResumeDataForm;