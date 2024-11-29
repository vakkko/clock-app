import { useState, useEffect } from "react";
import "./time.css";
import { fetchCurrentTime, getGreeting } from "../../utils/timeUtils";
import { TimeResponse } from "../../App";

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
      const data = await fetchCurrentTime();
      if (data) {
        setCurrentTime(data);
        setError(null);
        const hour = Number(data.hour);
        const greetingData = getGreeting(hour);
        setGreeting({
          text: greetingData.text,
          icon: greetingData.icon,
          alt: greetingData.alt,
        });
        setNightBackground(greetingData.nightBakcground ?? false);
      } else {
        setError("An error occurred while fetching time.");
      }

      setLoading(false);
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
