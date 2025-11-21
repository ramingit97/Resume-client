import { useState } from "react";
import {
  ResumeData,
  DesignSettings,
  TemplateKey,
  ALL_MOCK_DESIGNS,
} from "@/_mock/resume";
import {
  Input,
  Select,
  Button,
  Space,
  Card,
  ColorPicker,
  Slider,
  Tag,
  Tooltip,
} from "antd";
import type { Color } from "antd/es/color-picker";
import resumeService from "@/api/services/resumeService";
import { toast } from "sonner";
import * as htmlToImage from "html-to-image";
import {
  Save,
  Download,
  User,
  Phone,
  Mail,
  MapPin,
  Palette,
  FileText,
  Briefcase,
  GraduationCap,
  Languages,
  Heart,
  Settings,
  Plus,
  X,
} from "lucide-react";

interface ResumeEditorProps {
  initialResume: ResumeData | null;
  initialDesign: DesignSettings;
  onChangeResume: (data: ResumeData) => void;
  onChangeDesign: (design: DesignSettings) => void;
}

export function ResumeEditor({
  initialResume,
  initialDesign,
  onChangeResume,
  onChangeDesign,
}: ResumeEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  // Состояние для нового хобби (для тегов)
  const [newHobby, setNewHobby] = useState("");
  
  const handleFieldChange = (field: keyof ResumeData, value: any) => {
    onChangeResume({ ...initialResume, [field]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        resume: initialResume,
        design: initialDesign,
        template: initialDesign.templateLayoutKey,
      };
      await resumeService.addResume(payload);
      toast.success("Резюме успешно сохранено на сервере!");
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при сохранении резюме");
    } finally {
      setIsSaving(false);
    }
  };

  async function handleDownloadPDF() {
    const el = document.getElementById("resume-preview-container");
    if (!el) return;

    const pngDataUrl = await htmlToImage.toPng(el);
    const resBlob = await (await fetch(pngDataUrl)).blob();

    const formData = new FormData();
    formData.append("file", resBlob, "resume.png");

    const res = await fetch("http://16.171.6.163:5004/pdf", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    a.click();
  }

  const ColorPickerItem = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: Color | string;
    onChange: (color: any) => void;
  }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <ColorPicker value={value} onChangeComplete={onChange} showText size="large" />
    </div>
  );
  
  // --- Функции для Хобби (Теги) ---
  const handleAddHobby = () => {
    const trimmedHobby = newHobby.trim();
    if (trimmedHobby && !initialResume?.hobbies?.includes(trimmedHobby)) {
      handleFieldChange("hobbies", [...(initialResume?.hobbies || []), trimmedHobby]);
      setNewHobby("");
    }
  };

  const handleRemoveHobby = (hobbyToRemove: string) => {
    const updatedHobbies = (initialResume?.hobbies || []).filter(
      (hobby) => hobby !== hobbyToRemove
    );
    handleFieldChange("hobbies", updatedHobbies);
  };
  
  // --- Функции для Описания Опыта ---
  const handleAddExperienceDescription = (expIndex: number) => {
    const updatedExperience = [...(initialResume?.experience || [])];
    if (updatedExperience[expIndex]) {
      updatedExperience[expIndex].description.push(""); // Добавляем пустой элемент
      handleFieldChange("experience", updatedExperience);
    }
  };
  
  const handleUpdateExperienceDescription = (expIndex: number, descIndex: number, value: string) => {
    const updatedExperience = [...(initialResume?.experience || [])];
    if (updatedExperience[expIndex] && updatedExperience[expIndex].description[descIndex] !== undefined) {
      updatedExperience[expIndex].description[descIndex] = value;
      handleFieldChange("experience", updatedExperience);
    }
  };
  
  const handleRemoveExperienceDescription = (expIndex: number, descIndex: number) => {
    const updatedExperience = [...(initialResume?.experience || [])];
    if (updatedExperience[expIndex]) {
      updatedExperience[expIndex].description.splice(descIndex, 1);
      handleFieldChange("experience", updatedExperience);
    }
  };


  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Заголовок */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Редактор резюме
          </h1>
          <p className="text-gray-500 text-sm">
            Создайте профессиональное резюме за несколько минут
          </p>
        </div>

        ---

        {/* Основная информация */}
        <Card
          className="shadow-lg border-0 rounded-2xl overflow-hidden"
          title={
            <div className="flex items-center gap-2 text-lg">
              <User className="text-blue-500" size={20} />
              <span>Основная информация</span>
            </div>
          }
        >
          <Space direction="vertical" size="middle" className="w-full">
            <Input
              size="large"
              value={initialResume?.fullName}
              onChange={(e) => handleFieldChange("fullName", e.target.value)}
              placeholder="Иван Иванов"
              prefix={<User className="text-gray-400" size={18} />}
            />
            <Input
              size="large"
              value={initialResume?.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              placeholder="Frontend разработчик"
              prefix={<FileText className="text-gray-400" size={18} />}
            />
            <Input.TextArea
              value={initialResume?.summary}
              onChange={(e) => handleFieldChange("summary", e.target.value)}
              rows={4}
              placeholder="Опишите ваш опыт и навыки..."
              className="rounded-lg"
            />
          </Space>
        </Card>

        ---

        {/* Контактная информация */}
        <Card
          className="shadow-lg border-0 rounded-2xl overflow-hidden"
          title={
            <div className="flex items-center gap-2 text-lg">
              <Phone className="text-green-500" size={20} />
              <span>Контактная информация</span>
            </div>
          }
        >
          <Space direction="vertical" size="middle" className="w-full">
            <Input
              size="large"
              value={initialResume?.contact?.phone}
              onChange={(e) =>
                handleFieldChange("contact", {
                  ...initialResume?.contact,
                  phone: e.target.value,
                })
              }
              placeholder="+7 (999) 123-45-67"
              prefix={<Phone className="text-gray-400" size={18} />}
            />
            <Input
              size="large"
              value={initialResume?.contact?.email}
              onChange={(e) =>
                handleFieldChange("contact", {
                  ...initialResume?.contact,
                  email: e.target.value,
                })
              }
              placeholder="example@email.com"
              prefix={<Mail className="text-gray-400" size={18} />}
            />
            <Input
              size="large"
              value={initialResume?.contact?.location}
              onChange={(e) =>
                handleFieldChange("contact", {
                  ...initialResume?.contact,
                  location: e.target.value,
                })
              }
              placeholder="Москва, Россия"
              prefix={<MapPin className="text-gray-400" size={18} />}
            />
          </Space>
        </Card>

        ---

        {/* Опыт работы */}
        <Card
          className="shadow-lg border-0 rounded-2xl overflow-hidden"
          title={
            <div className="flex items-center gap-2 text-lg">
              <Briefcase className="text-blue-600" size={20} />
              <span>Опыт работы</span>
            </div>
          }
        >
          {initialResume?.experience?.map((exp, expIdx) => (
            <div key={expIdx} className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
              <Space direction="vertical" size="middle" className="w-full">
                <Input
                  size="large"
                  placeholder="Компания"
                  value={exp.company}
                  onChange={(e) => {
                    const updated = [...(initialResume?.experience || [])];
                    updated[expIdx].company = e.target.value;
                    handleFieldChange("experience", updated);
                  }}
                />
                <Input
                  size="large"
                  placeholder="Должность"
                  value={exp.title}
                  onChange={(e) => {
                    const updated = [...(initialResume?.experience || [])];
                    updated[expIdx].title = e.target.value;
                    handleFieldChange("experience", updated);
                  }}
                />
                <Input
                  size="large"
                  placeholder="Местоположение"
                  value={exp.location}
                  onChange={(e) => {
                    const updated = [...(initialResume?.experience || [])];
                    updated[expIdx].location = e.target.value;
                    handleFieldChange("experience", updated);
                  }}
                />
                <Space>
                  <Input
                    type="date"
                    value={exp.startDate?.split("T")[0] || ""}
                    onChange={(e) => {
                      const updated = [...(initialResume?.experience || [])];
                      updated[expIdx].startDate = e.target.value;
                      handleFieldChange("experience", updated);
                    }}
                  />
                  <Input
                    type="date"
                    value={exp.endDate?.split("T")[0] || ""}
                    onChange={(e) => {
                      const updated = [...(initialResume?.experience || [])];
                      updated[expIdx].endDate = e.target.value;
                      handleFieldChange("experience", updated);
                    }}
                  />
                </Space>
                
                {/* Новый компонент для Описания обязанностей (массив) */}
                <div className="space-y-2 pt-2">
                  <span className="text-sm font-medium text-gray-700 block">Обязанности (по пунктам):</span>
                  {exp.description?.map((desc, descIdx) => (
                    <Input
                      key={descIdx}
                      value={desc}
                      onChange={(e) => handleUpdateExperienceDescription(expIdx, descIdx, e.target.value)}
                      placeholder={`Пункт обязанности ${descIdx + 1}`}
                      suffix={
                        <Tooltip title="Удалить">
                          <X
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            size={16}
                            onClick={() => handleRemoveExperienceDescription(expIdx, descIdx)}
                          />
                        </Tooltip>
                      }
                    />
                  ))}
                  <Button
                    type="dashed"
                    block
                    icon={<Plus size={16} />}
                    onClick={() => handleAddExperienceDescription(expIdx)}
                  >
                    Добавить обязанность
                  </Button>
                </div>
                {/* Конец нового компонента для Описания обязанностей */}

              </Space>
            </div>
          ))}
          <Button
            type="dashed"
            block
            onClick={() =>
              handleFieldChange("experience", [
                ...(initialResume?.experience || []),
                {
                  company: "",
                  title: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  description: [],
                },
              ])
            }
          >
            + Добавить опыт
          </Button>
        </Card>

        ---

        {/* Образование */}
        <Card
          className="shadow-lg border-0 rounded-2xl overflow-hidden"
          title={
            <div className="flex items-center gap-2 text-lg">
              <GraduationCap className="text-red-500" size={20} />
              <span>Образование</span>
            </div>
          }
        >
          {initialResume?.education?.map((edu, idx) => (
            <div key={idx} className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
              <Space direction="vertical" size="middle" className="w-full">
                <Input
                  size="large"
                  placeholder="Учебное заведение"
                  value={edu.institution}
                  onChange={(e) => {
                    const updated = [...(initialResume?.education || [])];
                    updated[idx].institution = e.target.value;
                    handleFieldChange("education", updated);
                  }}
                />
                <Input
                  size="large"
                  placeholder="Специальность"
                  value={edu.fieldOfStudy}
                  onChange={(e) => {
                    const updated = [...(initialResume?.education || [])];
                    updated[idx].fieldOfStudy = e.target.value;
                    handleFieldChange("education", updated);
                  }}
                />
                <Space>
                  <Input
                    type="date"
                    value={edu.startDate?.split("T")[0] || ""}
                    onChange={(e) => {
                      const updated = [...(initialResume?.education || [])];
                      updated[idx].startDate = e.target.value;
                      handleFieldChange("education", updated);
                    }}
                  />
                  <Input
                    type="date"
                    value={edu.endDate?.split("T")[0] || ""}
                    onChange={(e) => {
                      const updated = [...(initialResume?.education || [])];
                      updated[idx].endDate = e.target.value;
                      handleFieldChange("education", updated);
                    }}
                  />
                </Space>
              </Space>
            </div>
          ))}
          <Button
            type="dashed"
            block
            onClick={() =>
              handleFieldChange("education", [
                ...(initialResume?.education || []),
                {
                  institution: "",
                  degree: "",
                  fieldOfStudy: "",
                  startDate: "",
                  endDate: "",
                },
              ])
            }
          >
            + Добавить образование
          </Button>
        </Card>

        ---

        {/* Навыки */}
        <Card
          className="shadow-lg border-0 rounded-2xl overflow-hidden"
          title={
            <div className="flex items-center gap-2 text-lg">
              <Settings className="text-gray-600" size={20} />
              <span>Навыки</span>
            </div>
          }
        >
          {initialResume?.skills?.map((skill, idx) => (
          <div key={idx} className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
            {/* Добавлено поле для Категории */}
            <Input
              size="large"
              placeholder="Категория (например, Программирование)"
              value={skill.category} // Предполагается, что skill теперь содержит поле category
              onChange={(e) => {
                const updated = [...(initialResume?.skills || [])];
                updated[idx].category = e.target.value;
                handleFieldChange("skills", updated);
              }}
              className="mb-3" // Добавим немного отступа снизу
            />
            {/* Существующее поле для Названия навыка */}
            <Input
              size="large"
              placeholder="Название навыка"
              value={skill.name}
              onChange={(e) => {
                const updated = [...(initialResume?.skills || [])];
                updated[idx].name = e.target.value;
                handleFieldChange("skills", updated);
              }}
            />
            <Slider
              min={1}
              max={5}
              value={skill.level}
              marks={{ 1: "Нач", 3: "Сред", 5: "Эксп" }}
              onChange={(val) => {
                const updated = [...(initialResume?.skills || [])];
                updated[idx].level = val as number;
                handleFieldChange("skills", updated);
              }}
            />
          </div>
        ))}
          <Button
            type="dashed"
            block
            onClick={() =>
              handleFieldChange("skills", [
                ...(initialResume?.skills || []),
                { name: "", level: 3 },
              ])
            }
          >
            + Добавить навык
          </Button>
        </Card>

        ---

        {/* Языки */}
        <Card
          className="shadow-lg border-0 rounded-2xl overflow-hidden"
          title={
            <div className="flex items-center gap-2 text-lg">
              <Languages className="text-indigo-500" size={20} />
              <span>Языки</span>
            </div>
          }
        >
          {initialResume?.languages?.map((lang, idx) => (
            <Space key={idx} direction="horizontal" className="w-full mb-3">
              <Input
                size="large"
                placeholder="Язык"
                value={lang.name}
                onChange={(e) => {
                  const updated = [...(initialResume?.languages || [])];
                  updated[idx].name = e.target.value;
                  handleFieldChange("languages", updated);
                }}
              />
              <Select
                size="large"
                className="flex-1"
                value={lang.level}
                onChange={(val) => {
                  const updated = [...(initialResume?.languages || [])];
                  updated[idx].level = val;
                  handleFieldChange("languages", updated);
                }}
                options={[
                  { label: "Начальный", value: "начальный" },
                  { label: "Средний", value: "средний" },
                  { label: "Продвинутый", value: "продвинутый" },
                  { label: "Родной", value: "родной" },
                ]}
              />
            </Space>
          ))}
          <Button
            type="dashed"
            block
            onClick={() =>
              handleFieldChange("languages", [
                ...(initialResume?.languages || []),
                { name: "", level: "" },
              ])
            }
          >
            + Добавить язык
          </Button>
        </Card>

        ---

        {/* Хобби (Теги) */}
        <Card
          className="shadow-lg border-0 rounded-2xl overflow-hidden"
          title={
            <div className="flex items-center gap-2 text-lg">
              <Heart className="text-pink-500" size={20} />
              <span>Хобби (Теги)</span>
            </div>
          }
        >
          <Space direction="vertical" size="middle" className="w-full">
            {/* Текущие хобби в виде тегов */}
            <div className="flex flex-wrap gap-2 min-h-[32px]">
              {initialResume?.hobbies?.map((hobby, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => handleRemoveHobby(hobby)}
                  className="px-3 py-1 text-base rounded-full border-pink-300 bg-pink-50"
                >
                  {hobby}
                </Tag>
              ))}
            </div>

            {/* Добавление нового хобби */}
            <Space.Compact className="w-full">
              <Input
                size="large"
                placeholder="Введите новое хобби (например: футбол)"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                onPressEnter={handleAddHobby}
              />
              <Button 
                type="primary" 
                size="large" 
                onClick={handleAddHobby}
                icon={<Plus size={16} />}
              >
                Добавить
              </Button>
            </Space.Compact>
          </Space>
        </Card>

        ---

        {/* Дизайн и цвета */}
        <Card
          className="shadow-lg border-0 rounded-2xl overflow-hidden"
          title={
            <div className="flex items-center gap-2 text-lg">
              <Palette className="text-purple-500" size={20} />
              <span>Дизайн и цвета</span>
            </div>
          }
        >
          <Space direction="vertical" size="middle" className="w-full">
            <ColorPickerItem
              label="Основной цвет"
              value={initialDesign.styleOverrides.primaryColorHex as Color}
              onChange={(color) =>
                onChangeDesign({
                  ...initialDesign,
                  styleOverrides: {
                    ...initialDesign.styleOverrides,
                    primaryColorHex: color.toHexString(),
                  },
                })
              }
            />
            <ColorPickerItem
              label="Цвет акцента"
              value={initialDesign.styleOverrides.accentColorHex as Color}
              onChange={(color) =>
                onChangeDesign({
                  ...initialDesign,
                  styleOverrides: {
                    ...initialDesign.styleOverrides,
                    accentColorHex: color.toHexString(),
                  },
                })
              }
            />
            <ColorPickerItem
              label="Цвет текста"
              value={
                (initialDesign.styleOverrides.textColorHex as Color) || "#333333"
              }
              onChange={(color) =>
                onChangeDesign({
                  ...initialDesign,
                  styleOverrides: {
                    ...initialDesign.styleOverrides,
                    textColorHex: color.toHexString(),
                  },
                })
              }
            />
          </Space>
        </Card>

        ---

        {/* Шаблон */}
        <Card
          className="shadow-lg border-0 rounded-2xl overflow-hidden"
          title={
            <div className="flex items-center gap-2 text-lg">
              <FileText className="text-orange-500" size={20} />
              <span>Шаблон резюме</span>
            </div>
          }
        >
          <Select
            size="large"
            value={initialDesign.templateLayoutKey}
            onChange={(key: TemplateKey) =>
              onChangeDesign({ ...ALL_MOCK_DESIGNS[key] })
            }
            options={Object.values(ALL_MOCK_DESIGNS).map((design) => ({
              label: design.templateName,
              value: design.templateLayoutKey,
            }))}
            className="w-full"
          />
        </Card>

        ---

        {/* Кнопки */}
        <div className="flex justify-between mt-8 gap-4">
          <Button
            type="primary"
            size="large"
            loading={isSaving}
            onClick={handleSave}
            icon={<Save size={18} />}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Сохранить
          </Button>
          <Button
            size="large"
            onClick={handleDownloadPDF}
            icon={<Download size={18} />}
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Скачать PDF
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResumeEditor;