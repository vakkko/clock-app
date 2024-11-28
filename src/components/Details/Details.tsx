import "./details.css";

interface TimeResponse {
  timeZone: string;
  hour: string;
  day: string;
  date: string;
}

interface DetailsProps {
  currentTime: TimeResponse | null;
}

interface EachDetailsProps {
  heading: string;
  detail: string | undefined;
}

function EachDetails(props: EachDetailsProps) {
  return (
    <div className="each-detail">
      <h2 className="">{props.heading}</h2>
      <p>{props.detail}</p>
    </div>
  );
}

function dayOfYear(dateString: string): number {
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

export default function Details({ currentTime }: DetailsProps) {
  const currentDay: number = currentTime?.date
    ? dayOfYear(currentTime.date)
    : NaN;
  const currentDayOfWeek: string = (currentDay % 7).toString();
  const currentWeek: string = Math.floor(currentDay / 7).toString();

  return (
    <div className="details-container">
      (
      <div className="details">
        <div className="timeZone-day">
          <EachDetails
            heading="CURRENT TIMEZONE"
            detail={currentTime?.timeZone}
          />
          <EachDetails
            heading="DAY OF THE YEAR"
            detail={currentDay.toString()}
          />
        </div>
        <div>
          <EachDetails heading="DAY OF THE WEEK" detail={currentDayOfWeek} />
          <EachDetails heading="WEEK NUMBER" detail={currentWeek} />
        </div>
      </div>
      )
    </div>
  );
}
