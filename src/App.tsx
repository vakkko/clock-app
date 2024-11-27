import "./App.css";
import { useState } from "react";
import Button from "./components/Button/Button";
import Quotes from "./components/Quotes/Quotes";
import Time from "./components/Time/Time";
import Details from "./components/Details/Details";

interface TimeResponse {
  time: string;
  timeZone: string;
  hour: string;
  day: string;
  date: string;
}

function App() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<TimeResponse | null>(null);

  return (
    <main>
      <Quotes isClicked={isClicked} />
      <div className="time-button">
        <Time currentTime={currentTime} setCurrentTime={setCurrentTime} />
        <Button isClicked={isClicked} setIsClicked={setIsClicked} />
      </div>
      {isClicked && <Details currentTime={currentTime} />}
    </main>
  );
}

export default App;
