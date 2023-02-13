import { useState } from "react";
import { msToHrs } from "../utils/common";

const RawDataTextArea = ({arr}: {arr: number[]}) => {

    const [convertToHrs, setConvertToHrs] = useState(false);

    if (!arr || !arr.length) return null;

    let pretty = ''

    for (let i = 0; i < arr.length; i++) {
        pretty += `${(convertToHrs) ? Math.round(msToHrs(arr[i]) * 100 ) / 100 : arr[i]}\n`;
    }

    return (
        <>
         <textarea value={pretty} readOnly /><br />
        <label><input type="checkbox" id="mstohrs" onChange={() => setConvertToHrs(!convertToHrs)} />convert ms to hrs</label>
        </>
    )

};

export {
    RawDataTextArea,
}