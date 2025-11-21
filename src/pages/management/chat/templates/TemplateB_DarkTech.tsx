// src/components/templates/TemplateB_DarkTech.tsx
import { ResumeData,ColorSettings } from '@/_mock/resume';
import React from 'react';

interface TemplateProps {
    data: ResumeData;
    colors: ColorSettings;
}

const TemplateB_DarkTech: React.FC<TemplateProps> = ({ data, colors }) => {
  const textColor = '#333333';
  const sidebarWidth = '200px';

  return (
    <div className="a4-preview shadow-lg rounded-lg overflow-hidden" style={{ display: 'grid', gridTemplateRows: '120px 1fr', gridTemplateColumns: `${sidebarWidth} 1fr`, width: '210mm', height: '297mm', fontFamily: 'Helvetica Neue, sans-serif', fontSize: '10pt' }}>
        
        {/* HEADER AREA (Dark Background) */}
        <div style={{ 
            gridRow: '1 / 2', 
            gridColumn: '1 / 3', 
            backgroundColor: colors.headerBg, 
            color: 'white', 
            padding: '25px 35px', 
            borderBottom: `5px solid ${colors.accent}`,
        }}>
            <h1 style={{ fontSize: '32pt', margin: 0, fontWeight: 300 }}>{data.fullName}</h1>
            <p style={{ margin: '5px 0 0 0', fontSize: '16pt', fontWeight: 500, color: colors.accent }}>{data.title}</p>
        </div>

        {/* SIDEBAR AREA (Light Background) */}
        <aside style={{ 
            gridRow: '2 / 3', 
            gridColumn: '1 / 2', 
            backgroundColor: colors.sidebarBg, 
            padding: '20px', 
            color: textColor, 
            borderRight: '1px solid #ddd',
            boxShadow: '2px 0 5px -2px rgba(0,0,0,0.05)'
        }}>
            <h3 style={{ borderBottom: `2px solid ${colors.headerBg}`, paddingBottom: '5px', color: colors.headerBg }}>Контакты</h3>
            <p style={{ fontSize: '10pt', margin: '5px 0' }}>Phone: {data.contact.phone}</p>
            {/* ... */}
            <h3 style={{ borderBottom: `2px solid ${colors.headerBg}`, paddingBottom: '5px', marginTop: '20px', color: colors.headerBg }}>Навыки</h3>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {data.skills.slice(0, 5).map(s => <li key={s} style={{fontSize: '9pt', color: textColor}}>{s}</li>)}
            </ul>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main style={{ 
            gridRow: '2 / 3', 
            gridColumn: '2 / 3', 
            padding: '20px 30px', 
            color: textColor 
        }}>
            <h2 style={{ borderBottom: `3px solid ${colors.accent}`, color: colors.headerBg, fontSize: '18pt', marginTop: 0 }}>Опыт работы</h2>
            {data.experience.map((exp, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                    <h4 style={{ margin: 0, fontWeight: 700, color: colors.accent }}>{exp.position}</h4>
                    <p style={{ margin: '2px 0', fontSize: '9pt' }}>{exp.company} | {exp.years}</p>
                    <ul style={{ marginLeft: '15px', paddingLeft: 0, fontSize: '9.5pt' }}>
                        {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                </div>
            ))}
            {/* ... Education ... */}
        </main>
    </div>
  );
};

export default TemplateB_DarkTech;