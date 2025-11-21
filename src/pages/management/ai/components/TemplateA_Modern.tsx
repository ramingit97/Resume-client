import { DesignSettings, ResumeData } from "@/_mock/resume";
import { cn } from "@/utils";
import { Mail, Phone, Globe, Star } from "lucide-react";

export interface TemplateProps {
  data: ResumeData;
  design: DesignSettings;
}

export const TemplateA_Modern: React.FC<TemplateProps> = ({ data, design }) => {
  const { styleOverrides } = design;
  const primaryColor = styleOverrides.primaryColorHex;
  const accentColor = styleOverrides.accentColorHex;

  return (
    <div
      className={cn(
        styleOverrides.resumeContainerClasses,
        "a4-preview overflow-hidden bg-white w-full max-w-[210mm] min-h-[297mm] flex"
      )}
      style={{ fontFamily: "Roboto, Arial, sans-serif" }}
    >
      {/* Sidebar */}
      <aside
        className="w-64 flex-shrink-0 p-6 flex flex-col justify-start space-y-6"
        style={{ backgroundColor: accentColor, color: "white" }}
      >
        <div>
          <h1 className="text-2xl font-bold">{data.fullName}</h1>
          <p className="text-sm opacity-90">{data.title}</p>
        </div>

        <div className="space-y-2 text-xs">
          <p className="flex items-center gap-2">
            <Mail size={14} /> {data.contact.email}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={14} /> {data.contact.phone}
          </p>
          {data.contact.linkedin && (
            <p className="flex items-center gap-2">
              <Globe size={14} /> {data.contact.linkedin}
            </p>
          )}
        </div>

        {/* Хобби */}
        {(data.hobbies||[])?.length > 0 && (
          <div>
            <h3 className="uppercase font-semibold text-sm border-b border-white pb-1 mb-2">Хобби</h3>
            <ul className="list-disc list-inside space-y-1 text-xs">
              {(data.hobbies||[]).map((hobby, idx) => (
                <li key={idx}>{hobby}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Языки */}
        {(data.languages || [])?.length > 0 && (
          <div>
            <h3 className="uppercase font-semibold text-sm border-b border-white pb-1 mb-2">Языки</h3>
            <ul className="list-disc list-inside space-y-1 text-xs">
              {(data.languages || []).map((lang, idx) => (
                <li key={idx}>
                  {lang.name} <span className="text-gray-400">({lang.level})</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">
        {/* Summary */}
        <section>
          <h2
            className="text-lg font-bold pb-1 mb-2 border-b-2"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Краткое Резюме
          </h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>

        {/* Опыт работы */}
        <section>
          <h2
            className="text-lg font-bold pb-1 mb-4 border-b-2"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Опыт работы
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-semibold" style={{ color: primaryColor }}>
                    {exp.position}
                  </h3>
                  <span className="text-xs italic text-gray-500">
                    {exp.start_date} – {exp.end_date}
                  </span>
                </div>
                <p className="text-sm italic mb-2 text-gray-700">{exp.company}</p>
                <ul className="pl-5 text-sm space-y-1 list-disc">
                  {exp.description.map((point, i) => (
                    <li key={i} className="leading-normal">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Навыки */}
        <section>
          <h2
            className="text-lg font-bold pb-1 mb-4 border-b-2"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Навыки
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 px-2 py-1 rounded-full border text-xs font-medium"
                style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}10` }}
              >
                <span>{skill.name}</span>
                {/* Отображаем уровень как звездочки */}
                <span className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      size={12}
                      style={{ color: starIdx < skill.level ? primaryColor : "#ddd" }}
                    />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Образование */}
        <section>
          <h2
            className="text-lg font-bold pb-1 mb-4 border-b-2"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Образование
          </h2>
          <div className="space-y-3 text-sm">
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <p className="font-semibold m-0">{edu.degree}</p>
                <p className="m-0">{edu.institution}</p>
                <p className="m-0 italic text-gray-500">
                  {edu.end_date}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
