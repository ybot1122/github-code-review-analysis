import { getStartTime } from "./common";

export const timeToMerge = (data: any) => {
    const result = data.map((el: any) => {
        let timerEnd = Date.parse(el.mergedAt);
        let timerStart = getStartTime(el?.timelineItems, el.createdAt);
        return timerEnd - timerStart;
    });

    return result;
}