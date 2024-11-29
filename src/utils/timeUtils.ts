import { TimeResponse } from "../App";

export const fetchCurrentTime = async (): Promise<TimeResponse | null> => {
  try {
    const response = await fetch(
      "https://timeapi.io/api/time/current/zone?timeZone=Asia/Tbilisi"
    );
    if (!response.ok) throw new Error("Failed to fetch");
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getGreeting = (hour: number) => {
  if (hour > 5 && hour <= 12) {
    return {
      text: "GOOD MORNING, IT’S CURRENTLY",
      icon: "./assets/desktop/icon-sun.svg",
      alt: "sun icon",
      nightBackground: false,
    };
  } else if (hour > 12 && hour < 18) {
    return {
      text: "GOOD AFTEERNOON, IT’S CURRENTLY",
      icon: "./assets/desktop/icon-sun.svg",
      alt: "sun icon",
      nightBakcground: false,
    };
  } else {
    return {
      text: "GOOD EVENING, IT’S CURRENTLY",
      icon: "./assets/desktop/icon-moon.svg",
      alt: "moon icon",
      nightBakcground: true,
    };
  }
};

export function dayOfYear(dateString: string): number {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format. Please use a valid date string.");
  }

  const startOfYear = new Date(date.getFullYear(), 0, 0);

  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  return dayOfYear;
}
