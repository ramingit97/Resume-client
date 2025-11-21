import { DesignSettings, ResumeData } from "@/_mock/resume";
import { cn } from "@/utils";
import { formatDate } from "@fullcalendar/core/index.js";
import { Code, Mail, MapPin, Phone } from "lucide-react";
import { TemplateProps } from "./TemplateA_Executive";

export const TemplateB_DarkTech: React.FC<TemplateProps> = ({ data, design }) => {
    const { styleOverrides } = design;
    const { primaryColorHex, accentColorHex, sidebarClasses, textColorHex } = styleOverrides;
    const sidebarText = sidebarClasses?.includes('text-') ? sidebarClasses.match(/text-([a-z]+-\d+|[a-z]+)/)?.[0] || 'text-white' : 'text-white';

    return (
        <div 
            className={cn(styleOverrides.resumeContainerClasses, "flex w-full max-w-[210mm] min-h-[297mm] bg-gray-900 shadow-lg font-sans")}
            style={{ color: textColorHex }}
        >
            {/* Боковая панель */}
            <aside className={cn("w-1/3 p-6 flex flex-col space-y-6", sidebarClasses)} style={{ backgroundColor: primaryColorHex }} >
                <h1 className={cn("text-3xl font-bold border-b pb-2", sidebarText)}>{data.fullName}</h1>
                <h2 className={cn("text-md font-medium uppercase tracking-widest", sidebarText)}>{data.title}</h2>

                <div className="space-y-3">
                    <h3 className={cn("text-sm font-semibold uppercase tracking-wider mb-1 border-b", sidebarText)} style={{ borderColor: accentColorHex }}>Контакты</h3>
                    <p className="flex items-center space-x-2 text-xs"><Mail size={12} style={{ color: accentColorHex }}/>{data.contact.email}</p>
                    <p className="flex items-center space-x-2 text-xs"><Phone size={12} style={{ color: accentColorHex }}/>{data.contact.phone}</p>
                    <p className="flex items-center space-x-2 text-xs"><MapPin size={12} style={{ color: accentColorHex }}/>{data.contact.location}</p>
                </div>

                <div className="space-y-3">
                    <h3 className={cn("text-sm font-semibold uppercase tracking-wider mb-1 border-b", sidebarText)} style={{ borderColor: accentColorHex }}>Навыки</h3>
                    <div className="flex flex-col gap-1">
                        {data.skills.map((skill, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: accentColorHex, color: sidebarText === 'text-white' ? '#111' : 'white' }}>
                                {skill.name} ({skill.level})
                            </span>
                        ))}
                    </div>
                </div>

                {(data.languages||[])?.length > 0 && (
                    <div className="space-y-1">
                        <h3 className={cn("text-sm font-semibold uppercase tracking-wider mb-1 border-b", sidebarText)} style={{ borderColor: accentColorHex }}>Языки</h3>
                        {(data.languages||[]).map((lang, i) => (
                            <p key={i} className="text-xs">{lang.name} ({lang.level})</p>
                        ))}
                    </div>
                )}

                {(data.hobbies||[])?.length > 0 && (
                    <div className="space-y-1">
                        <h3 className={cn("text-sm font-semibold uppercase tracking-wider mb-1 border-b", sidebarText)} style={{ borderColor: accentColorHex }}>Хобби</h3>
                        {(data.hobbies||[]).map((hobby, i) => <p key={i} className="text-xs">{hobby}</p>)}
                    </div>
                )}
            </aside>

            {/* Основная часть */}
            <main className="w-2/3 p-8 space-y-6 text-white">
                <section>
                    <h3 className={cn("text-lg font-bold mb-3 border-b-2 pb-1", styleOverrides.sectionTitleClasses)} style={{ borderColor: accentColorHex, color: primaryColorHex }}>ПРОФИЛЬ</h3>
                    <p className="text-sm leading-relaxed">{data.summary}</p>
                </section>

                <section>
                    <h3 className={cn("text-lg font-bold mb-3 border-b-2 pb-1", styleOverrides.sectionTitleClasses)} style={{ borderColor: accentColorHex, color: primaryColorHex }}>ОПЫТ</h3>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-4 text-sm">
                            <p className="font-semibold" style={{ color: accentColorHex }}>{exp.title} - {exp.company}</p>
                            <p className="text-xs text-gray-400 mb-1">{formatDate(exp.startDate)} - {formatDate(exp.endDate)} | {exp.location}</p>
                            <ul className="list-disc ml-4 text-xs space-y-0.5">
                                {exp.description.map((d, j) => <li key={j}>{d}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>

                <section>
                    <h3 className={cn("text-lg font-bold mb-3 border-b-2 pb-1", styleOverrides.sectionTitleClasses)} style={{ borderColor: accentColorHex, color: primaryColorHex }}>ОБРАЗОВАНИЕ</h3>
                    {data.education.map((edu, i) => (
                        <div key={i} className="mb-2 text-sm">
                            <p className="font-semibold">{edu.degree}</p>
                            <p className="italic">{edu.institution}, {edu.location}</p>
                            <p className="text-xs">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</p>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};
