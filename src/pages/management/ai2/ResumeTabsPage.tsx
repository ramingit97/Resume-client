import { useEffect, useState, useMemo } from "react";
import { ResumeData, DesignSettings, MOCK_DESIGN_SETTINGS_A } from "@/_mock/resume";
import ResumeEditor  from "./components/ResumeEditor";
import { ResumePreview } from "./components/ResumePreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import useUserStore from "@/store/userStore";
import { AiParserTab } from "./components/AiParserTab";
import { AiGeneratorTab } from "./components/AiGeneratorTabProps";
import { BenchmarkTab } from "./components/TopResumeTab";
import { useTranslation } from "react-i18next";

export default function ResumeTabsPage() {
  const { t } = useTranslation();
  const { userInfo } = useUserStore();

  const [activeTab, setActiveTab] = useState("1");
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [design, setDesign] = useState<DesignSettings>(MOCK_DESIGN_SETTINGS_A);

  // Объединяем данные пользователя и резюме
  const mergedResume: ResumeData = useMemo(() => ({
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
  }), [resumeData, userInfo]);

  // ----------------- Функции для AI -----------------
  const handleParseSuccess = (parsedData: Partial<ResumeData>) => {
    setResumeData(prev => ({
      ...prev,
      ...parsedData,
      contact: {
        ...prev?.contact,
        ...parsedData.contact
      },
      skills: parsedData.skills || prev?.skills || [],
      experience: parsedData.experience || prev?.experience || [],
      education: parsedData.education || prev?.education || [],
    }));
    setActiveTab("1"); // показываем preview
  };

  const handleAiGenerate = (generatedData: Partial<ResumeData>) => {
    setResumeData(prev => ({
      ...prev,
      ...generatedData,
      contact: {
        ...prev?.contact,
        ...generatedData.contact
      },
      skills: generatedData.skills || prev?.skills || [],
      experience: generatedData.experience || prev?.experience || [],
      education: generatedData.education || prev?.education || [],
    }));
    setActiveTab("1"); // показываем preview
  };

  // ----------------- Рендер -----------------
  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
       <TabsList>
          <TabsTrigger value="1">{t("sys.resume.tabs.editorPreview")}</TabsTrigger>
          <TabsTrigger value="2">{t("sys.resume.tabs.aiParser")}</TabsTrigger>
          <TabsTrigger value="3">{t("sys.resume.tabs.aiGenerator")}</TabsTrigger>
          <TabsTrigger value="4">{t("sys.resume.tabs.benchmark")}</TabsTrigger>
        </TabsList>

        {/* Tab 1: Основная форма и preview */}
        <TabsContent value="1">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2 border p-4 overflow-auto">
              <ResumeEditor
                initialResume={mergedResume}
                initialDesign={design}
                onChangeResume={setResumeData}
                onChangeDesign={setDesign}
              />
            </div>
            <div className="w-full lg:w-1/2 overflow-auto p-4">
              <ResumePreview resume={mergedResume} design={design} />
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: AI Parser */}
        <TabsContent value="2">
          <AiParserTab onParseSuccess={handleParseSuccess} />
        </TabsContent>

        {/* Tab 3: AI Resume Generator */}
        <TabsContent value="3">
          <AiGeneratorTab
            resume={mergedResume}
            onGenerate={handleAiGenerate}
            onSwitchTab={()=>{
              setActiveTab("1"); // показываем preview
            }}
          />
        </TabsContent>


        <TabsContent value="4">
          <BenchmarkTab
            resume={mergedResume}
            onGenerate={handleAiGenerate}
            onSwitchTab={()=>{
              setActiveTab("1"); // показываем preview
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
