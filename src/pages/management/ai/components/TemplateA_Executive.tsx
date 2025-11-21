import { DesignSettings, ResumeData } from "@/_mock/resume";
import { cn } from "@/utils";
import { formatDate } from "@fullcalendar/core/index.js";
import { Mail, Phone } from "lucide-react";

export interface TemplateProps {
	data: ResumeData;
	design: DesignSettings; 
}

export const TemplateA_Executive: React.FC<TemplateProps> = ({ data, design }) => {

    console.log('data',data)
  const { styleOverrides } = design;
  const primaryColor = styleOverrides.primaryColorHex;
  const accentColor = styleOverrides.accentColorHex;
  const headerBg = primaryColor;
  const textColor = styleOverrides.textColorHex || "#333333"; // 👈 по умолчанию
  
  return (
      <div 
          className={cn(styleOverrides.resumeContainerClasses, "a4-preview overflow-hidden bg-white w-full max-w-[210mm] min-h-[297mm]")}
          style={{ fontFamily: "Roboto, Arial, sans-serif", color: textColor }} // 👈 применили цвет текста глобально
      >
          <header style={{ 
              backgroundColor: headerBg, 
              color: 'white', 
              padding: '20px 30px', 
              borderBottom: `4px solid ${accentColor}`,
          }} className={cn(styleOverrides.headerClasses, "flex items-center justify-between")}>
              <div>
                  <h1 className="text-3xl m-0 font-bold">{data.fullName || "Ramin"}</h1>
                  <p className="m-0 text-xl font-light opacity-80">{data.title}</p>
              </div>
              <div className="flex flex-col text-sm items-end space-y-1">
                  <p className="flex items-center space-x-2 text-white/90"><Mail size={12} style={{ color: accentColor }}/><span>{data.contact.email}</span></p>
                  <p className="flex items-center space-x-2 text-white/90"><Phone size={12} style={{ color: accentColor }}/><span>{data.contact.phone}</span></p>
              </div>
          </header>

          <main className="p-8 space-y-6 text-sm" style={{ color: textColor }}>
              <section>
                  <h2 className={cn(styleOverrides.sectionTitleClasses, "pb-1 mb-2 border-b")} style={{ borderColor: primaryColor, color: primaryColor }}>Краткое Резюме</h2>
                  <p className="leading-relaxed">{data.summary}</p>
              </section>

              <section>
                  <h2 className={cn(styleOverrides.sectionTitleClasses, "pb-1 mb-4 border-b-2")} style={{ borderColor: primaryColor, color: primaryColor }}>ОПЫТ РАБОТЫ</h2>
                  <div className="space-y-6">
                      {data.experience.map((exp, index) => (
                          <div key={index}>
                              <div className="flex justify-between items-baseline">
                                  <h3 className="text-base font-semibold" style={{ color: primaryColor }}>{exp.title}</h3>
                                  <span className="text-xs italic text-gray-500">
                                      {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                                  </span>
                              </div>
                              <p className="text-sm italic mb-2 text-gray-700">{exp.company} | {exp.location}</p>
                              <ul className="pl-5 text-sm space-y-1 list-disc">
                                  {exp.description.map((point, i) => (<li key={i} className="leading-normal">{point}</li>))}
                              </ul>
                          </div>
                      ))}
                  </div>
              </section>

              <div className="grid grid-cols-2 gap-8 pt-4">
                  <section>
                      <h2 className={cn(styleOverrides.sectionTitleClasses, "pb-1 mb-4 border-b-2")} style={{ borderColor: primaryColor, color: primaryColor }}>НАВЫКИ</h2>
                      <div className="flex flex-wrap gap-2">
                          {data.skills.map((s, index) => (
                              <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-100 font-medium" style={{ border: `1px solid ${accentColor}` }}>
                                  {s.name} ({s.level})
                              </span>
                          ))}
                      </div>
                  </section>

                  <section>
                      <h2 className={cn(styleOverrides.sectionTitleClasses, "pb-1 mb-4 border-b-2")} style={{ borderColor: primaryColor, color: primaryColor }}>ОБРАЗОВАНИЕ</h2>
                      <div className="space-y-3">
                          {data.education.map((edu, index) => (
                              <div key={index}>
                                  <p className="font-semibold m-0">{edu.degree}</p>
                                  <p className="m-0 text-sm">{edu.institution}</p>
                                  <p className="m-0 text-xs italic" style={{ color: accentColor }}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</p>
                              </div>
                          ))}
                      </div>
                  </section>
              </div>

              {(data.languages||[])?.length > 0 && (
                <section>
                  <h2 className={cn(styleOverrides.sectionTitleClasses, "pb-1 mb-2 border-b")} style={{ borderColor: primaryColor, color: primaryColor }}>ЯЗЫКИ</h2>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {(data.languages||[]).map((lang, idx) => (
                        <li key={idx}>{lang.name} ({lang.level})</li>
                    ))}
                  </ul>
                </section>
              )}

              {(data.hobbies||[])?.length > 0 && (
                <section>
                  <h2 className={cn(styleOverrides.sectionTitleClasses, "pb-1 mb-2 border-b")} style={{ borderColor: primaryColor, color: primaryColor }}>ХОББИ</h2>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {(data.hobbies||[]).map((hobby, idx) => <li key={idx}>{hobby}</li>)}
                  </ul>
                </section>
              )}
          </main>
      </div>
  );
};
