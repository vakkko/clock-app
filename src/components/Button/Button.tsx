import "./button.css";
import { Dispatch, SetStateAction } from "react";

interface ButtonProp {
  isClicked: boolean;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
}

export default function Button({
  isClicked,
  setIsClicked,
}: ButtonProp): JSX.Element {
  function handleButtonClick(): void {
    setIsClicked(!isClicked);
  }

  if (isClicked) {
    document.body.classList.add("click-more");
  } else {
    document.body.classList.remove("click-more");
  }

  return (
    <div className={`btn-${isClicked ? "less" : "more"}`}>
      <button onClick={handleButtonClick}>
        {isClicked ? "LESS " : "MORE "}
        <img
          className="arrow"
          src="./assets/desktop/icon-arrow-down.svg"
          alt="arrow down"
        />{" "}
      </button>
    </div>
  );
}
