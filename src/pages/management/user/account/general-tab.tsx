import userService from "@/api/services/userService";
import { UploadAvatar } from "@/components/upload";
import useUserStore, { useUserInfo } from "@/store/userStore";
import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter } from "@/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { Switch } from "@/ui/switch";
import { Textarea } from "@/ui/textarea";
import { Text } from "@/ui/typography";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Contact = {
	email?: string;
	phone?: string;
	location?: string;
};

type ProfileData = {
	fullName?: string;
	gender?: string;
	about?: string;
	contact?: Contact;
	hobbies?: string[];
	languages?: { name: string; level?: string }[];
	skills?: { name: string; category?: string; level?: number }[];
};

type FieldType = {
	name?: string;
	fullName?: string;
	email?: string;
	phone?: string;
	location?: string;
	about?: string;
};

export default function GeneralTab({ initialData }: { initialData?: ProfileData }) {
	const { avatar } = useUserInfo();
	const { userInfo } = useUserStore();


	const form = useForm<FieldType>({
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			location: "",
			about: "",
		},
	});

	// 🔁 Когда приходят новые данные от ИИ — обновляем поля формы
	useEffect(() => {
		if (initialData) {
			form.reset({
				fullName: initialData.fullName || "",
				email: initialData.contact?.email || "",
				phone: initialData.contact?.phone || "",
				location: initialData.contact?.location || "",
				about: initialData.about || "",
			});
		}
	}, [initialData, form]);

	useEffect(() => {
		if (userInfo) {
			form.reset({
				name: userInfo.name || "",
				fullName: userInfo.fullName || "",
				email: userInfo.email || "",
				phone: userInfo.phone || "",
				location: userInfo.location || "",
				about: userInfo.about || "",
			});
		}
	}, [userInfo]);

	const handleSave = async() => {
		const data = form.getValues();
		const res = await userService.update(data)

		console.log('res',res)
		toast.success("Изменения успешно сохранены!");
	};

	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			{/* Левая колонка — аватар и настройки */}
			<div className="col-span-1">
				<Card className="flex-col items-center px-6! pb-10! pt-20!">
					<UploadAvatar defaultAvatar={avatar} />

					<div className="flex items-center py-6 gap-2 w-40">
						<Text variant="body1">Public Profile</Text>
						<Switch />
					</div>

					<Button variant="destructive" className="w-40">
						Delete User
					</Button>
				</Card>
			</div>

			{/* Правая колонка — форма */}
			<div className="col-span-1">
				<Card>
					<CardContent>
						<Form {...form}>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Enter your username" />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="fullName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Full Name</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Enter your full name" />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Enter your email" />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Enter your phone" />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="location"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Location</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Enter your city" />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<div className="mt-4">
								<FormField
									control={form.control}
									name="about"
									render={({ field }) => (
										<FormItem>
											<FormLabel>About</FormLabel>
											<FormControl>
												<Textarea {...field} rows={5} placeholder="Write a few sentences about yourself..." />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</Form>
					</CardContent>

					<CardFooter className="flex justify-end">
						<Button onClick={handleSave}>Save Changes</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
