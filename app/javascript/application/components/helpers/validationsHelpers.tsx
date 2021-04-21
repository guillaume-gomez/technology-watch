import i18Next from "react-i18next";

export function required(t: i18Next.TFunction) {
  return (value: string) => {
    if (!value || value === "") {
      return { status: "error", message: t("sign-up.errors.required") };
    }
    return true;
  };
}

export function emailValidation(t: i18Next.TFunction) {
  return (value: string) => {
    const regexp = new RegExp("/^[^\s@]+@[^\s@]+$/");
    if (!value.match(regexp)) {
      return { status: "error", message: t("sign-up.errors.email") };
    }
    return true;
  };
}

export function urlValidation(t: i18Next.TFunction) {
  return (value: string) => {
    const regexp = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

    if (!value.match(regexp)) {
      return { status: "error", message: t("url-error") };
    }
    return false;
  };
}

