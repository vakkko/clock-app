import { useState, useEffect } from "react";
import "./time.css";

interface TimeResponse {
  time: string;
  timeZone: string;
  hour: string;
  day: string;
  date: string;
}

interface TimeProps {
  currentTime: TimeResponse | null;
  setCurrentTime: React.Dispatch<React.SetStateAction<TimeResponse | null>>;
}

function Time({ currentTime, setCurrentTime }: TimeProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [greeting, setGreeting] = useState<{
    text: string;
    icon: string;
    alt: string;
  }>({ text: "", icon: "", alt: "" });
  const [nightBackground, setNightBackground] = useState<boolean>(false);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch(
          "https://timeapi.io/api/time/current/zone?timeZone=Asia/Tbilisi"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch time");
        }

        const data: TimeResponse = await response.json();
        setCurrentTime(data);
        setError(null);
        const hour = Number(data.hour);

        if (hour > 5 && hour <= 12) {
          setGreeting({
            text: "GOOD MORNING, IT’S CURRENTLY",
            icon: "./assets/desktop/icon-sun.svg",
            alt: "sun icon",
          });
          setNightBackground(false);
        } else if (hour > 12 && hour < 18) {
          setGreeting({
            text: "GOOD AFTEERNOON, IT’S CURRENTLY",
            icon: "./assets/desktop/icon-sun.svg",
            alt: "sun icon",
          });
          setNightBackground(false);
        } else {
          setGreeting({
            text: "GOOD EVENING, IT’S CURRENTLY",
            icon: "./assets/desktop/icon-moon.svg",
            alt: "moon icon",
          });
          setNightBackground(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTime();

    const interval = setInterval(fetchTime, 60000);

    return () => clearInterval(interval);
  }, [setCurrentTime]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (nightBackground) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  return (
    <div className="greeting-time">
      {currentTime && (
        <>
          <div>
            <div className="greeting">
              <img src={greeting.icon} alt={greeting.alt} />
              <p className="greeting-text">{greeting.text}</p>
            </div>

            <p className="time">{currentTime.time}</p>
            <p className="time-zone">{currentTime.timeZone}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Time;
