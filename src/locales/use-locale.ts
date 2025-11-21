import "dayjs/locale/zh-cn";
import en_US from "antd/locale/en_US";
import az_AZ from "antd/locale/az_AZ";
import ru_RU from "antd/locale/ru_RU"

import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import type { Locale as AntdLocal } from "antd/es/locale";
import { LocalEnum } from "#/enum";

type Locale = keyof typeof LocalEnum;
type Language = {
	locale: keyof typeof LocalEnum;
	icon: string;
	label: string;
	antdLocal: AntdLocal;
};

export const LANGUAGE_MAP: Record<Locale, Language> = {
	[LocalEnum.en_US]: {
		locale: LocalEnum.en_US,
		label: "English",
		icon: "flag-us",
		antdLocal: en_US,
	},
	[LocalEnum.az_AZ]: {
		locale: LocalEnum.az_AZ,
		label: "Azerbaijani",
		icon: "flag-az",
		antdLocal: az_AZ,
	},
	[LocalEnum.ru_RU]: {
		locale: LocalEnum.ru_RU,
		label: "Russian",
		icon: "flag-ru",
		antdLocal: ru_RU,
	},
};

export default function useLocale() {
	const { t, i18n } = useTranslation();

	const locale = (i18n.resolvedLanguage || LocalEnum.en_US) as Locale;
	const language = LANGUAGE_MAP[locale];

	/**
	 * localstorage -> i18nextLng change
	 */
	const setLocale = (locale: Locale) => {
		console.log('locale123123',locale)
		i18n.changeLanguage(locale);
		// set lang ant dayjs
		document.documentElement.lang = locale;
		dayjs.locale(locale);
	};

	
	return {
		t,
		locale,
		language,
		setLocale,
	};
}
