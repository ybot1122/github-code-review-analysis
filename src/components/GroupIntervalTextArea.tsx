import { useState } from "react";
import { msToHrs } from "../utils/common";
import { minMaxMedianMean } from "../utils/math";

const GroupIntervalTextArea = ({ arr }: { arr: number[] }) => {
  const [convertToHrs, setConvertToHrs] = useState(false);
  const [maxLimit, setMaxLimit] = useState(-1);

  if (!arr || !arr.length) return null;

  const { min, max } = minMaxMedianMean(arr);

  const actualMax = maxLimit === -1 ? max : maxLimit;

  let interval = (actualMax - min) / 12;

  const result: any = {};
  let curr = 0;
  while (curr < actualMax) {
    result[curr] = 0;
    curr += interval;
  }

  arr.map((num) => {
    const key = Object.keys(result).find(
      (interval_start) =>
        num >= Number(interval_start) && num < Number(interval_start) + interval
    );

    if (key) {
      result[key]++;
    } else {
      console.warn(`couldnt find interval that the value fits into ${key}`);
    }
  });

  let pretty = "";

  const keys = Object.keys(result).map((k) => Number(k));
  keys.sort((a, b) => a - b);
  keys.push(actualMax + 1);

  const prettyKeys: string[] = [];
  for (let i = 0; i < keys.length - 1; i++) {
    prettyKeys[i] =
      (convertToHrs ? Math.round(msToHrs(keys[i])) : Math.round(keys[i])) +
      " to " +
      (convertToHrs
        ? Math.round(msToHrs(keys[i + 1])) - 1
        : Math.round(keys[i + 1]) - 1);
  }

  for (let i = 0; i < keys.length - 1; i++) {
    pretty += `${prettyKeys[i]}\t${result[keys[i]]}\n`;
  }

  return (
    <>
      <textarea value={pretty} readOnly />
      <br />
      Set Max Limit
      <input
        type="number"
        onBlur={(e) => setMaxLimit(Number(e.target.value))}
        min={min}
        max={max}
      />
      <br />
      <label>
        <input
          type="checkbox"
          id="mstohrs"
          onChange={() => setConvertToHrs(!convertToHrs)}
        />
        convert ms to hrs
      </label>
    </>
  );
};

export { GroupIntervalTextArea as GroupIntervalButton };
