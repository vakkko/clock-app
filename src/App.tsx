import "./App.css";
import { useState } from "react";
import Button from "./components/Button/Button";
import Quotes from "./components/Quotes/Quotes";
import Time from "./components/Time/Time";
import Details from "./components/Details/Details";

function App() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  return (
    <main>
      <Quotes isClicked={isClicked} />
      <Time />
      <Button isClicked={isClicked} setIsClicked={setIsClicked} />
      <Details />
    </main>
  );
}

export default App;
