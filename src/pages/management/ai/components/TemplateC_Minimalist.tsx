import { cn } from "@/utils";
import { TemplateProps } from "./TemplateA_Executive";
import { formatDate } from "@fullcalendar/core/index.js";

export const TemplateC_Minimalist: React.FC<TemplateProps> = ({ data, design }) => {
    const { styleOverrides } = design;
    const { primaryColorHex, accentColorHex, headerClasses, sectionTitleClasses, textColorHex } = styleOverrides;

    return (
        <div 
            className={cn("p-12 w-full max-w-[210mm] min-h-[297mm] bg-white border shadow-lg font-mono", styleOverrides.resumeContainerClasses)}
            style={{ color: textColorHex }}
        >
            <header className="mb-10 text-center">
                <h1 className={cn("text-6xl font-black tracking-tighter", headerClasses)} style={{ color: primaryColorHex }}>
                    {data.fullName}
                </h1>
                <h2 className="text-lg font-light tracking-widest mt-1 uppercase opacity-80" style={{ color: textColorHex }}>
                    {data.title}
                </h2>
                <div className="flex justify-center space-x-4 mt-3 text-sm">
                    <span className="opacity-70">{data.contact.email}</span>
                    <span className="opacity-70">{data.contact.phone}</span>
                    <span className="opacity-70">{data.contact.location}</span>
                </div>
            </header>

            <section className="mb-6 border-t-2 pt-4" style={{ borderColor: primaryColorHex }}>
                <h3 className={cn("text-lg font-extrabold mb-3", sectionTitleClasses)} style={{ color: primaryColorHex }}>ПРОФИЛЬ</h3>
                <p className="text-sm leading-relaxed">{data.summary}</p>
            </section>

            <section className="mb-6 border-t pt-4" style={{ borderColor: primaryColorHex }}>
                <h3 className={cn("text-lg font-extrabold mb-3", sectionTitleClasses)} style={{ color: primaryColorHex }}>ОПЫТ</h3>
                {data.experience.map((exp, i) => (
                    <div key={i} className="mb-4 text-sm">
                        <div className="flex justify-between font-semibold">
                            <span style={{ color: textColorHex }}>{exp.title}</span>
                            <span className="text-xs font-light" style={{ color: accentColorHex }}>{formatDate(exp.startDate)} – {formatDate(exp.endDate)}</span>
                        </div>
                        <p className="text-xs mb-1 italic opacity-70">{exp.company}, {exp.location}</p>
                        <ul className="list-disc ml-4 text-xs space-y-0.5">
                            {exp.description.map((desc, j) => <li key={j}>— {desc}</li>)}
                        </ul>
                    </div>
                ))}
            </section>

            <section className="mb-6 border-t pt-4" style={{ borderColor: primaryColorHex }}>
                <h3 className={cn("text-lg font-extrabold mb-3", sectionTitleClasses)} style={{ color: primaryColorHex }}>НАВЫКИ</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                    {data.skills.map((s, i) => (
                        <span key={i} className="border-b px-2 py-0.5" style={{ borderColor: accentColorHex }}>{s.name} ({s.level})</span>
                    ))}
                </div>
            </section>

            {(data.languages||[])?.length > 0 && (
                <section className="mb-6 border-t pt-4" style={{ borderColor: primaryColorHex }}>
                    <h3 className={cn("text-lg font-extrabold mb-3", sectionTitleClasses)} style={{ color: primaryColorHex }}>ЯЗЫКИ</h3>
                    <ul className="list-disc ml-4 text-sm">
                        {(data.languages||[]).map((lang, i) => <li key={i}>{lang.name} ({lang.level})</li>)}
                    </ul>
                </section>
            )}

            {(data.hobbies||[])?.length > 0 && (
                <section className="mb-6 border-t pt-4" style={{ borderColor: primaryColorHex }}>
                    <h3 className={cn("text-lg font-extrabold mb-3", sectionTitleClasses)} style={{ color: primaryColorHex }}>ХОББИ</h3>
                    <ul className="list-disc ml-4 text-sm">
                        {(data.hobbies||[]).map((hobby, i) => <li key={i}>{hobby}</li>)}
                    </ul>
                </section>
            )}
        </div>
    );
};
