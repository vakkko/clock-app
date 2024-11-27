import { useEffect, useState } from "react";
import axios from "axios";
import "./quote.css";

interface QuoteProp {
  isClicked: boolean;
}

const Quotes = ({ isClicked }: QuoteProp) => {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const fetchQuote = () => {
    axios
      .get("https://programming-quotesapi.vercel.app/api/random")
      .then((response) => {
        setQuote(response.data.quote);
        setAuthor(response.data.author);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        setQuote("Failed to load quote. Try again");
        setAuthor("");
      });
  };

  useEffect(() => fetchQuote(), []);

  return (
    <>
      {!isClicked && (
        <div className="quote-container">
          <div>
            <p className="quote">"{quote}"</p>
            <img
              onClick={fetchQuote}
              src="./assets/desktop/icon-refresh.svg"
              alt="refresh icon"
              className="refresh-icon"
            />
          </div>
          <p className="author">{author}</p>
        </div>
      )}
    </>
  );
};

export default Quotes;
