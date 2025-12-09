import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProposalScore = ({ score, colour }) => {
  if (typeof score !== "number") return null;

  return (
    <div className="w-14 h-14">
      <CircularProgressbar
        value={score}
        text={`${score}%`}
        styles={buildStyles({
          textColor: "#ffffff",
          pathColor: colour,
          trailColor: "rgba(255,255,255,0.1)",
          textSize: "28px",
        })}
      />
    </div>
  );
};

export default ProposalScore;
