import { isComment } from "./common";

export const numberOfComments = (data: any) => {
  const result = data.map((el: any) => {
    let count = 0;

    el?.timelineItems?.map((t: any) => {
      if (isComment(t)) count++;
    });

    return count;
  });

  return result;
};
