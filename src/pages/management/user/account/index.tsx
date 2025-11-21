import { Icon } from "@/components/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import GeneralTab from "./general-tab";
import NotificationsTab from "./notifications-tab";
import SecurityTab from "./security-tab";
import {  useState } from "react";
import AiAssistantTab from "./AIAssistantTab";

function UserAccount() {


	const [activeTab, setActiveTab] = useState("1");
  const [profileData, setProfileData] = useState<any>(null);

  const handleAiGenerated = (data: any) => {
    // сохраняем данные от ИИ
    setProfileData(data);
		console.log('ddd',data);
    // переключаемся на GeneralTab
    setActiveTab("1");
  };


	

	return (
		<Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
			<TabsList>
				<TabsTrigger value="1">
					<div className="flex items-center">
						<Icon icon="solar:user-id-bold" size={24} className="mr-2" />
						<span>General</span>
					</div>
				</TabsTrigger>
				<TabsTrigger value="2">
					<div className="flex items-center">
						<Icon icon="solar:bell-bing-bold-duotone" size={24} className="mr-2" />
						<span>Notifications</span>
					</div>
				</TabsTrigger>
				<TabsTrigger value="3">
					<div className="flex items-center">
						<Icon icon="solar:key-minimalistic-square-3-bold-duotone" size={24} className="mr-2" />
						<span>Security</span>
					</div>
				</TabsTrigger>
				<TabsTrigger value="4">
					<div className="flex items-center">
						<Icon icon="solar:chat-square-bold-duotone" size={24} className="mr-2" />
						<span>AI Assistant</span>
					</div>
				</TabsTrigger>
			</TabsList>
			<TabsContent value="1">
				<GeneralTab initialData={profileData} />
			</TabsContent>
			<TabsContent value="2">
				<NotificationsTab />
			</TabsContent>
			<TabsContent value="3">
				<SecurityTab />
			</TabsContent>
			<TabsContent value="4">
				<AiAssistantTab onGenerated={handleAiGenerated} />
			</TabsContent>
		</Tabs>
	);
}

export default UserAccount;
