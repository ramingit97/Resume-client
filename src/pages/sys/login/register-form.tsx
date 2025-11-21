import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLoginStateContext, LoginStateEnum } from "./providers/login-provider";
import { useSignUp } from "@/store/userStore";

export function RegisterForm() {
  const { t } = useTranslation();
  const { loginState, backToLogin } = useLoginStateContext();
  const signUp = useSignUp();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  if (loginState !== LoginStateEnum.REGISTER) return null;

  const onFinish = async (values: any) => {
    await signUp(values);
    backToLogin();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFinish)} className="space-y-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t("sys.login.signUpFormTitle")}</h1>
        </div>

        <FormField
          control={form.control}
          name="name"
          rules={{ required: t("sys.login.accountPlaceholder") }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t("sys.login.userName")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{ required: t("sys.login.emaildPlaceholder") }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t("sys.login.email")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          rules={{ required: t("sys.login.passwordPlaceholder") }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder={t("sys.login.password")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {t("sys.login.registerButton")}
        </Button>

        <div className="text-center text-sm">
          {t("sys.login.alreadyAccount")}
          <Button variant="link" onClick={backToLogin} className="px-1">
            {t("sys.login.signInFormTitle")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
