import { useEffect, useState, useMemo } from "react";
import { ResumeData, DesignSettings, MOCK_DESIGN_SETTINGS_A } from "@/_mock/resume";
import { ResumeEditor } from "./components/ResumeEditor";
import { ResumePreview } from "./components/ResumePreview";
import { useParams } from "react-router";
import resumeService from "@/api/services/resumeService";
import useUserStore from "@/store/userStore";

export default function ResumeSinglePage() {
  const { id } = useParams<{ id: string }>();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [design, setDesign] = useState<DesignSettings>(MOCK_DESIGN_SETTINGS_A);

  const { userInfo } = useUserStore();

  // Объединяем данные пользователя и резюме
  const mergedResume: ResumeData = useMemo(() => {
    return {
      fullName: resumeData?.fullName || userInfo.fullName || "",
      title: resumeData?.title || "",
      summary: resumeData?.summary || userInfo.about || "",
      contact: {
        email: resumeData?.contact?.email || userInfo.email || "",
        phone: resumeData?.contact?.phone || userInfo.phone || "",
        location: resumeData?.contact?.location || userInfo.location || "",
      },
      skills: resumeData?.skills || [],
      hobbies: resumeData?.hobbies || [],
      languages: resumeData?.languages || [],
      experience: resumeData?.experience || [],
      education: resumeData?.education || [],
    };
  }, [resumeData, userInfo]);

  useEffect(() => {
    if (!id) return;

    async function fetchResume() {
      try {
        const res = await resumeService.getResumeById(Number(id));

        setResumeData({
          title: res.title,
          fullName: res.fullName, // если есть на бэке
          summary: res.summary,
          contact: res.contact || { phone: "", email: "", location: "" },
          hobbies: res.hobbies || [],
          skills: res.skills || [],
          experience: res.experience || [],
          education: res.education || [],
          languages: res.languages || [],
        });

        setDesign(res.design || MOCK_DESIGN_SETTINGS_A);
      } catch (err) {
        console.error("Ошибка при загрузке резюме:", err);
      }
    }

    fetchResume();
  }, [id]);



  if (!mergedResume) return null;

  return (
    <div className="flex w-full h-screen bg-gray-50">
      {/* Левая панель редактора */}
      <div className="w-[40%] border-r border-gray-300 overflow-auto p-4">
        <ResumeEditor
          initialResume={mergedResume}
          initialDesign={design}
          onChangeResume={setResumeData}
          onChangeDesign={setDesign}
        />
      </div>

      {/* Правая панель preview */}
      <div className="w-[60%] overflow-auto p-6">
        <ResumePreview resume={mergedResume} design={design} />
      </div>
    </div>
  );
}
