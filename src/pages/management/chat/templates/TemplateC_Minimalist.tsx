// src/components/templates/TemplateC_Minimalist.tsx
import React from 'react';
import { ResumeData,ColorSettings } from '@/_mock/resume';

interface TemplateProps {
    data: ResumeData;
    colors: ColorSettings;
}

const TemplateC_Minimalist: React.FC<TemplateProps> = ({ data, colors }) => {
  const textColor = '#444444';
  const sidebarWidth = '220px';

  return (
    <div className="a4-preview shadow-lg rounded-lg overflow-hidden" style={{ display: 'grid', gridTemplateRows: '70px 1fr', gridTemplateColumns: `${sidebarWidth} 1fr`, width: '210mm', height: '297mm', fontFamily: 'Georgia, serif', fontSize: '11pt' }}>
        
        {/* HEADER AREA (Minimalist, only Name and Title) */}
        <div style={{ 
            gridRow: '1 / 2', 
            gridColumn: '1 / 3', 
            backgroundColor: 'white', 
            color: textColor, 
            padding: '20px 30px', 
            borderBottom: `1px solid ${colors.accent}`, /* Тонкая линия акцента */
        }}>
            <h1 style={{ fontSize: '28pt', margin: 0, fontWeight: 700, color: colors.headerBg }}>{data.fullName}</h1>
            <p style={{ margin: '5px 0 0 0', fontSize: '12pt', fontWeight: 400, color: textColor }}>{data.title}</p>
        </div>

        {/* SIDEBAR AREA (Used for Contacts/Skills) */}
        <aside style={{ 
            gridRow: '2 / 3', 
            gridColumn: '1 / 2', 
            backgroundColor: colors.sidebarBg, 
            padding: '25px 20px', 
            color: textColor, 
            /* ГЛАВНЫЙ АКЦЕНТ: Вертикальный цветной блок справа */
            borderRight: `5px solid ${colors.accent}`, 
        }}>
            <h3 style={{ color: colors.headerBg, fontSize: '14pt', marginTop: 0 }}>Контакты</h3>
            <p style={{ fontSize: '10pt', margin: '5px 0' }}>{data.contact.email}</p>
            {/* ... */}
            <h3 style={{ color: colors.headerBg, fontSize: '14pt', marginTop: '25px' }}>Навыки</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '15px' }}>
                {data.skills.map(s => <li key={s} style={{fontSize: '10pt', color: textColor}}>{s}</li>)}
            </ul>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main style={{ 
            gridRow: '2 / 3', 
            gridColumn: '2 / 3', 
            padding: '25px 35px', 
            color: textColor 
        }}>
            <h2 style={{ borderBottom: `2px solid ${colors.headerBg}`, color: colors.headerBg, fontSize: '20pt', marginTop: 0 }}>Опыт работы</h2>
            {/* ... рендер опыта ... */}
        </main>
    </div>
  );
};

export default TemplateC_Minimalist;