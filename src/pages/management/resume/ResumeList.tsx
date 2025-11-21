// src/pages/resume/ResumeList.tsx
import { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Button } from "@/ui/button";
import { Icon } from "@/components/icon";
import resumeService,{ GetAllResumesRes, ResumeApi } from "@/api/services/resumeService";


export default function ResumeList() {
  const [resumes, setResumes] = useState<GetAllResumesRes>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  async function fetchResumes() {
    setLoading(true);
    try {
      const data = await resumeService.getAllResumes();
      setResumes(data);
    } catch (err) {
      console.error("Ошибка при загрузке резюме", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadPDF(resumeId: number) {
    try {
      const res = await resumeService.pdfGenerate({ resumeId });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      a.click();
    } catch (err) {
      console.error("Ошибка при генерации PDF", err);
    }
  }

  const columns: ColumnsType<any> = [
    {
      title: "Title",
      dataIndex: "title",
      render: (_, record) => <span>{record.title}</span>,
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Button
            onClick={() => window.open(`/management/resume/view/${record.id}`, "_blank")}
            variant="outline"
            size="sm"
          >
            <Icon icon="mdi:card-account-details" size={18} /> Посмотреть
          </Button>
          <Button
            onClick={() => handleDownloadPDF(record.id)}
            variant="outline"
            size="sm"
          >
            <Icon icon="mdi:download" size={18} /> Скачать PDF
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>My Resumes</div>
          <Button onClick={() => window.open("/resume/new", "_self")}>Создать</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: "max-content" }}
          pagination={false}
          columns={columns}
          dataSource={resumes}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
}
