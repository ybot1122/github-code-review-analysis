import { msToDays, msToHrs, msToMins } from "../utils/common";
import { minMaxMedianMean, roundToTwoDecimalPlaces } from "../utils/math";

const MetricsHeadline = ({
  onClick,
  arr,
  name,
  isTimeUnit,
}: {
  onClick: Function;
  arr: any[];
  name: string;
  isTimeUnit: boolean;
}) => {
  const { median, mean, min, max } = minMaxMedianMean(arr);
  const unit = isTimeUnit ? "ms" : "";

  const extras = isTimeUnit
    ? [
        <tr key="days">
          <td>{`Median: ${roundToTwoDecimalPlaces(msToDays(median))}days`}</td>
          <td>{`Mean: ${roundToTwoDecimalPlaces(msToDays(mean))}days`}</td>
          <td>{`Min: ${roundToTwoDecimalPlaces(msToDays(min))}days`}</td>
          <td>{`Max: ${roundToTwoDecimalPlaces(msToDays(max))}days`}</td>
        </tr>,
        <tr key="hrs">
          <td>{`Median: ${roundToTwoDecimalPlaces(msToHrs(median))}hrs`}</td>
          <td>{`Mean: ${roundToTwoDecimalPlaces(msToHrs(mean))}hrs`}</td>
          <td>{`Min: ${roundToTwoDecimalPlaces(msToHrs(min))}hrs`}</td>
          <td>{`Max: ${roundToTwoDecimalPlaces(msToHrs(max))}hrs`}</td>
        </tr>,
        <tr key="mins">
          <td>{`Median: ${roundToTwoDecimalPlaces(msToMins(median))}mins`}</td>
          <td>{`Mean: ${roundToTwoDecimalPlaces(msToMins(mean))}mins`}</td>
          <td>{`Min: ${roundToTwoDecimalPlaces(msToMins(min))}mins`}</td>
          <td>{`Max: ${roundToTwoDecimalPlaces(msToMins(max))}mins`}</td>
        </tr>,
      ]
    : [];

  return (
    <div>
      <h2>
        <button
          onClick={() =>
            onClick({
              arr,
              name,
            })
          }
        >
          {name}
        </button>
      </h2>
      <table>
        <tbody>
          <tr>
            <td>{`Median: ${median}${unit}`}</td>
            <td>{`Mean: ${roundToTwoDecimalPlaces(mean)}${unit}`}</td>
            <td>{`Min: ${min}${unit}`}</td>
            <td>{`Max: ${max}${unit}`}</td>
          </tr>
          {extras}
        </tbody>
      </table>
    </div>
  );
};

export { MetricsHeadline };
