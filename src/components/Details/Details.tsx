import "./details.css";
import { TimeResponse } from "../../App";
import EachDetails from "./EachDetails/EachDetails";
import { dayOfYear } from "../../utils/timeUtils";

interface DetailsProps {
  currentTime: TimeResponse | null;
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
