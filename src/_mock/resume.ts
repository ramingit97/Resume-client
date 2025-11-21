// --- Вспомогательные Типы ---

// 1. Определение типа для Навыков (Skills)
export interface Skill {
  name: string;
  level: number; // 1-5 для визуального отображения
  category: string; // Например, 'Programming', 'Soft Skills'
}

export interface Language {
    name: string;
    level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  }

// 2. Определение типа для Образования (Education)
export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  endDate: string | null; // YYYY-MM-DD или null для текущего
}

// 3. Определение типа для Опыта Работы (Experience)
export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  endDate: string | null; // YYYY-MM-DD или null для текущего
  description: string[]; // Массив пунктов (буллетов)
}

// 4. Определение типа для Настроек Цвета
export interface ColorSettings {
    headerBg: string;
    sidebarBg: string;
    accent: string;
}

// --- Основной Интерфейс Данных Резюме ---

export interface ResumeData {
  fullName: string;
  title: string;
  summary: string; // Добавлено для секции "О СЕБЕ"
  
  contact: {
    phone: string;
    email: string;
    linkedin: string;
    location: string; // Добавлено для отображения в шаблоне
  };

  skills: Skill[]; // ОБНОВЛЕНО: теперь массив объектов Skill
  experience: Experience[];
  education: Education[]; // ОБНОВЛЕНО: теперь массив объектов Education

  hobbies?: string[];
  languages?: Language[];
}

// --- МОКОВЫЕ ДАННЫЕ для инициализации ---

export const MOCK_DATA: ResumeData = {
    fullName: "Иванов Иван Иванович",
    title: "Старший Фронтенд-разработчик",
    summary: "Высокоэффективный Senior Frontend Engineer с 8-летним опытом работы над масштабируемыми веб-приложениями. Глубокое знание React, TypeScript и архитектуры микрофронтендов. Успешный опыт менторства и управления небольшими командами разработки.",
    
    contact: {
        phone: "+7 (999) 123-45-67",
        email: "ivan.ivanov@example.com",
        linkedin: "linkedin.com/in/ivanov",
        location: "Москва, Россия",
    },

    skills: [
        { name: "React / Redux", level: 1, category: "Programming" },
        { name: "TypeScript", level: 4, category: "Programming" },
        { name: "Tailwind CSS", level: 4, category: "Styling" },
        { name: "Node.js (Express)", level: 5, category: "Backend" },
        { name: "Agile / Scrum", level: 5, category: "Methodology" },
        { name: "CI/CD (GitLab)", level: 3, category: "DevOps" },
    ],

    experience: [
        {
            title: "Старший Разработчик",
            company: "TechSolutions Pro",
            location: "Москва",
            startDate: "2020-09-01",
            endDate: null, // Текущая работа
            description: [
                "Разработал и внедрил систему микрофронтендов на базе React и Webpack Module Federation, что сократило время сборки на 40%.",
                "Руководил командой из 4-х человек, проводя технические ревью кода и менторство младших разработчиков.",
                "Оптимизировал критические пути рендеринга, улучшив показатели Core Web Vitals на 35%.",
            ],
        },
        {
            title: "Фронтенд-разработчик",
            company: "Digital Startup",
            location: "Санкт-Петербург",
            startDate: "2018-03-01",
            endDate: "2020-08-30",
            description: [
                "Создал основной пользовательский интерфейс для SaaS-платформы с использованием React и Redux.",
                "Интегрировал RESTful API и GraphQL запросы, обеспечивая эффективный обмен данными.",
            ],
        },
    ],
    
    education: [
        {
            degree: "Магистр, Прикладная информатика",
            institution: "МГТУ им. Баумана",
            location: "Москва",
            startDate: "2016-09-01",
            endDate: "2018-07-01",
        },
        {
            degree: "Бакалавр, Информационные системы",
            institution: "МГТУ им. Баумана",
            location: "Москва",
            startDate: "2012-09-01",
            endDate: "2016-07-01",
        },
    ],
    hobbies:["Футбол","Шахматы"],

    languages: [
        { name: "Английский", level: "C1" },
        { name: "Русский", level: "C2" },
        { name: "Немецкий", level: "B2" },
        { name: "Французский", level: "B1" },
      ]
};

// --- Типы для Дизайна (Генерируемого AI) ---
interface StyleOverrides {
    resumeContainerClasses: string; 
    headerClasses: string;         
    sectionTitleClasses: string;   
    primaryColorHex: string;        
    accentColorHex: string;      
    textColorHex: string;          
    sidebarClasses?: string;        
}

export interface DesignSettings {
    templateLayoutKey: 'A' | 'B' | 'C' | 'D' | 'E';  
    themeName: string;              
    styleOverrides: StyleOverrides;
    justification: string;          
}

export const MOCK_DESIGN_SETTINGS_B: DesignSettings = {
    templateLayoutKey: 'B', 
    themeName: 'Техно-Контраст (Современный)',
    styleOverrides: {
        resumeContainerClasses: 'shadow-2xl font-sans',
        headerClasses: 'text-4xl font-extrabold tracking-tight',
        sectionTitleClasses: 'text-xl font-bold uppercase',
        primaryColorHex: '#1D4ED8', // Dark Blue
        accentColorHex: '#34D399', // Emerald Green
        sidebarClasses: 'bg-gray-800 text-gray-100', // Темная боковая панель
    },
    justification: 'Макет с боковой панелью (B) и современными, смелыми цветами идеален для Ведущего Архитектора ПО, подчеркивая техническую направленность.',
};

export const MOCK_DESIGN_SETTINGS_A: DesignSettings = {
    templateLayoutKey: 'A', 
    themeName: 'Строгая Классика (Корпоративный)',
    styleOverrides: {
        resumeContainerClasses: 'shadow-xl font-serif',
        headerClasses: 'text-3xl font-bold',
        sectionTitleClasses: 'text-lg font-bold tracking-wider',
        primaryColorHex: '#153A6A', // Classic Navy Blue
        accentColorHex: '#B8C0D4', // Light Accent Gray-Blue
        sidebarClasses: undefined, 
    },
    justification: 'Классический одноколоночный макет (A) сдержанных корпоративных цветов подходит для Старших/Исполнительных ролей.',
};


export const MOCK_DESIGN_SETTINGS_C: DesignSettings = {
    templateLayoutKey: 'C', 
    themeName: 'Монохромный Минималист (The Editor)',
    styleOverrides: {
        resumeContainerClasses: 'shadow-none border border-gray-400 font-mono',
        headerClasses: 'text-6xl font-black tracking-tighter',
        sectionTitleClasses: 'text-xl font-extrabold',
        primaryColorHex: '#000000', // Pure Black
        accentColorHex: '#666666', // Dark Gray Accent
        sidebarClasses: undefined, 
    },
    justification: 'Макет C — это минимализм с упором на сильную типографику и чистоту. Монохромная палитра и моноширинный шрифт идеальны для академических или журналистских резюме.',
};

export const MOCK_DESIGN_SETTINGS_D: DesignSettings = {
    templateLayoutKey: 'D', 
    themeName: 'Хронолог (The Timeline)',
    styleOverrides: {
        resumeContainerClasses: 'shadow-2xl font-sans',
        headerClasses: 'text-5xl font-extrabold',
        sectionTitleClasses: 'text-xl font-bold',
        primaryColorHex: '#6D28D9', // Deep Violet (для линии времени)
        accentColorHex: '#93C5FD', // Light Blue (акцентные элементы)
        sidebarClasses: undefined, 
    },
    justification: 'Макет D использует яркий вертикальный акцент (Timeline) для визуализации карьерного пути, идеально подходит для проектных и технических менеджеров.',
};


export const MOCK_DESIGN_SETTINGS_E: DesignSettings = {
    templateLayoutKey: 'E', 
    themeName: 'Современная Классика (Корпоративный)',
    styleOverrides: {
        resumeContainerClasses: 'shadow-xl font-serif',
        headerClasses: 'text-3xl font-bold',
        sectionTitleClasses: 'text-lg font-bold tracking-wider',
        primaryColorHex: '#153A6A', // Classic Navy Blue
        accentColorHex: '#B8C0D4', // Light Accent Gray-Blue
        sidebarClasses: undefined, 
    },
    justification: 'Классический одноколоночный макет (A) сдержанных корпоративных цветов подходит для Старших/Исполнительных ролей.',
};

export interface DesignSettings {
    templateLayoutKey: 'A' | 'B' | 'C' | 'D' | 'E'; // Расширение
    themeName: string; 
    styleOverrides: StyleOverrides; 
    justification: string;          
}

export type TemplateKey = DesignSettings['templateLayoutKey'];


export const ALL_MOCK_DESIGNS: Record<TemplateKey, DesignSettings> = {
    A: MOCK_DESIGN_SETTINGS_A,
    B: MOCK_DESIGN_SETTINGS_B,
    C: MOCK_DESIGN_SETTINGS_C,
    D: MOCK_DESIGN_SETTINGS_D,
    E: MOCK_DESIGN_SETTINGS_E
};

export const COLOR_PALETTES = [
    { key: 'Indigo', primary: '#4f46e5', accent: '#a5b4fc', name: 'Индиго' },
    { key: 'Emerald', primary: '#059669', accent: '#6ee7b7', name: 'Изумруд' },
    { key: 'Rose', primary: '#e11d48', accent: '#fda4af', name: 'Розовый' },
    { key: 'Black', primary: '#000000', accent: '#666666', name: 'Монохром' },
  ];

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