import React, { useMemo } from "react";
import { TemplateProps } from "./TemplateA_Executive";
import { cn } from "@/utils";
import { Briefcase, GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { formatDate } from "@fullcalendar/core/index.js";

const ContactItem: React.FC<{ icon: React.ReactNode, text: string, color?: string }> = ({ icon, text, color }) => (
  <div className="flex items-center text-xs font-medium space-x-2">
      {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4 opacity-70", style: { color: color } })}
      <span>{text}</span>
  </div>
);

export const TemplateD_Timeline: React.FC<TemplateProps> = ({ data, design }) => {
  const { styleOverrides } = design;
  const { primaryColorHex, accentColorHex, sectionTitleClasses } = styleOverrides;

  const timelineData = useMemo(() => {
      const combined = [
          ...data.experience.map(item => ({ ...item, type: 'experience', dateSort: item.startDate })),
          ...data.education.map(item => ({ ...item, type: 'education', dateSort: item.startDate }))
      ];
      return combined.sort((a, b) => new Date(b.dateSort).getTime() - new Date(a.dateSort).getTime());
  }, [data.experience, data.education]);

  const TimelineItem: React.FC<{ icon: React.ReactNode, title: string, subtitle: string, details: React.ReactNode, date: string, last: boolean }> = ({ icon, title, subtitle, details, date, last }) => (
      <div className="flex">
          <div className="w-12 flex flex-col items-center pt-1 pr-4">
              <div className="relative">
                  <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: primaryColorHex, backgroundColor: primaryColorHex }}>
                      {React.cloneElement(icon as React.ReactElement, { className: "w-3 h-3 text-white absolute top-0.5 left-0.5" })}
                  </div>
              </div>
              {!last && <div className="w-0.5 flex-1" style={{ backgroundColor: primaryColorHex, opacity: 0.3 }}></div>}
          </div>
          <div className="flex-1 pb-8">
              <p className="text-xs font-bold uppercase mb-0.5" style={{ color: accentColorHex }}>{date}</p>
              <h4 className="font-bold text-sm" style={{ color: primaryColorHex }}>{title}</h4>
              <h5 className="text-xs italic text-gray-600 mb-2">{subtitle}</h5>
              {details}
          </div>
      </div>
  );

  return (
      <div 
          className={cn("p-8 w-full max-w-[210mm] min-h-[297mm] bg-white border shadow-xl font-sans", styleOverrides.resumeContainerClasses)}
          style={{ color: "#333" }}
      >
          <header className="mb-6 pb-2 border-b-4" style={{ borderColor: primaryColorHex }}>
              <h1 className="text-5xl font-extrabold mb-1" style={{ color: primaryColorHex }}>{data.fullName}</h1>
              <h2 className="text-xl font-light tracking-wide uppercase" style={{ color: accentColorHex }}>{data.title}</h2>
          </header>

          <section className="flex justify-around mb-8 text-sm border-b pb-4">
              <ContactItem icon={<Mail />} text={data.contact.email} color={accentColorHex} />
              <ContactItem icon={<Phone />} text={data.contact.phone} color={accentColorHex} />
              <ContactItem icon={<MapPin />} text={data.contact.location} color={accentColorHex} />
          </section>

          {data.skills?.length > 0 && (
              <section className="mb-8">
                  <h3 className={cn("text-lg font-bold mb-4", sectionTitleClasses)} style={{ color: primaryColorHex }}>Навыки</h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                      {data.skills.map((s, i) => <span key={i} className="border px-2 py-0.5 rounded" style={{ borderColor: accentColorHex }}>{s.name} ({s.level})</span>)}
                  </div>
              </section>
          )}

          {(data.languages||[])?.length > 0 && (
              <section className="mb-8">
                  <h3 className={cn("text-lg font-bold mb-4", sectionTitleClasses)} style={{ color: primaryColorHex }}>Языки</h3>
                  <ul className="list-disc ml-4 text-sm">
                      {(data.languages||[]).map((lang, i) => <li key={i}>{lang.name} ({lang.level})</li>)}
                  </ul>
              </section>
          )}

          {(data.hobbies||[])?.length > 0 && (
              <section className="mb-8">
                  <h3 className={cn("text-lg font-bold mb-4", sectionTitleClasses)} style={{ color: primaryColorHex }}>Хобби</h3>
                  <ul className="list-disc ml-4 text-sm">
                      {(data.hobbies||[]).map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
              </section>
          )}

          <section>
              <h3 className={cn("text-xl font-bold mb-4", sectionTitleClasses)} style={{ color: primaryColorHex }}>Опыт и Образование</h3>
              {timelineData.map((item, i, arr) => {
                  const isExperience = item.type === 'experience';
                  const isLast = i === arr.length - 1;
                  return (
                      <TimelineItem
                          key={i}
                          icon={isExperience ? <Briefcase /> : <GraduationCap />}
                          title={isExperience ? item.title : item.degree}
                          subtitle={isExperience ? item.company : item.institution}
                          date={`${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}
                          last={isLast}
                          details={
                              isExperience ? (
                                  <ul className="list-disc ml-3 text-xs space-y-0.5 text-gray-700">
                                      {item.description.map((desc, j) => <li key={j}>{desc}</li>)}
                                  </ul>
                              ) : (
                                  <p className="text-xs italic text-gray-700">{item.location}</p>
                              )
                          }
                      />
                  );
              })}
          </section>
      </div>
  );
};
