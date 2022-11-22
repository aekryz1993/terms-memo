import { Months } from "~/types/enums";

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

const setContext = (token?: string | null) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
});

function validateSetTitle(title: unknown) {
  if (typeof title !== "string" || title.length < 3) {
    return `Title must be at least 3 characters long`;
  }
}

const languages = {
  en: { nativeName: "English" },
  ar: { nativeName: "Arabic" },
};

const getPathname = (url: string) => {
  const pathnameWithQuery = url.split("//")[1].split("/")[1];
  return pathnameWithQuery.split("?")[0];
};

const customDate = (date: string) => {
  const parsedDate = new Date(date);
  return `${
    Object.values(Months)[parsedDate.getMonth()]
  } ${parsedDate.getDate()}, ${parsedDate.getFullYear()} at ${parsedDate.getHours()}:${parsedDate.getMinutes()}`;
};

export {
  validateUsername,
  validatePassword,
  setContext,
  validateSetTitle,
  languages,
  getPathname,
  customDate,
};
