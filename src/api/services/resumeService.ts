// src/api/user.ts (Обновление)
import apiClient from "../apiClient";
// Импортируем типы данных с бэкенда

// Расширяем UserApi или создаем новый
export enum ResumeApi {
  Base = "/resume",
  Add = "/resume/add",
  ParseChat = "/parse-chat",
  RecommendDesign = "/recommendDesign",
  PdfGenerate = "/pdf",
  OptimizeResumeForJob = "/optimizeResumeForJob",
  AnalyzeAgainstTopResumes = "/analyzeAgainstTopResumes"
}

// Тип ответа для получения всех резюме
export type GetAllResumesRes = any[]; 
export type AddResumeRes = { message: string, resumeId: number };


// --- Новые функции API ---
const addResume = (data: any) => apiClient.post<AddResumeRes>({ url: ResumeApi.Add, data });
const getAllResumes = () => apiClient.get<GetAllResumesRes>({ url: ResumeApi.Base });
const getResumeById = (id: number) => apiClient.get<any>({ url: `${ResumeApi.Base}/${id}` });

const parseChatToResume = (data: any) => apiClient.post<any>({ url: ResumeApi.ParseChat, data });


const recommendDesign = () => apiClient.post<any>({ url: ResumeApi.RecommendDesign });
const pdfGenerate = (data:any) => apiClient.post<any>({ url: ResumeApi.PdfGenerate,data });
const optimizeResumeForJob = (data:any) => apiClient.post<any>({ url: ResumeApi.OptimizeResumeForJob,data });
const analyzeAgainstTopResumes = (data:any) => apiClient.post<any>({ url: ResumeApi.AnalyzeAgainstTopResumes,data });



export default {
  // ... (существующие методы)
  addResume,
  getAllResumes,
  getResumeById,
  parseChatToResume,
  recommendDesign,
  pdfGenerate,
  optimizeResumeForJob,
  analyzeAgainstTopResumes
};