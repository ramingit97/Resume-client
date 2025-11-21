import { useState } from "react";
import { Textarea } from "@/ui/textarea";
import { Button } from "@/ui/button";
import { useUserActions } from "@/store/userStore";
import { toast } from "sonner";

export default function AiAssistantTab({ onGenerated }: { onGenerated: (data: any) => void }) {
  const { setUserInfo } = useUserActions();
  const [messages, setMessages] = useState([{ role: "assistant", text: "Привет! Расскажи немного о себе 😎" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5004/user/parse-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: input }),
      });


      const data = await res.json();
      onGenerated(data);
      useUserActions().setUserInfo(data);

      if (data.profile) {
        // обновляем профиль пользователя
        setUserInfo(data.profile);
        toast.success("Профиль обновлен на основе диалога!");
      }

      setMessages([...newMessages, { role: "assistant", text: data.reply }]);
    } catch (err) {
      toast.error("Ошибка при обработке сообщения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto bg-muted rounded-lg p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl ${msg.role === "assistant" ? "bg-gray-100 text-gray-800" : "bg-blue-500 text-white self-end"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <Textarea
          placeholder="Введите сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleSend} disabled={loading}>
          {loading ? "..." : "Отправить"}
        </Button>
      </div>
    </div>
  );
}
