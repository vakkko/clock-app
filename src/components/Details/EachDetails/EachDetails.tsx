import "../EachDetails/eachDetails.css";

interface EachDetailsProps {
  heading: string;
  detail: string | undefined;
}

export default function EachDetails(props: EachDetailsProps) {
  return (
    <div className="each-detail">
      <h2>{props.heading}</h2>
      <p>{props.detail}</p>
    </div>
  );
}
