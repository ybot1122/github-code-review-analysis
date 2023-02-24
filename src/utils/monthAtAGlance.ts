import { bots, isComment } from "./common";

type TimelineEvent =
  | "IssueComment"
  | "ReadyForReviewEvent"
  | "UnlabeledEvent"
  | "PullRequestReview";

export const countUniqueAuthors = (data: any) => {
  const authors = new Set();
  data.map((el: any) => {
    authors.add(el.author.login);
  });

  return authors.size;
};

export const countUniqueReviewers = (data: any) => {
  const authors = new Set();
  data.map((el: any) => {
    el?.timelineItems?.map((t: any) => {
      if (isComment(t)) {
        authors.add(t.author.login);
      }
    });
    authors.add(el.author.login);
  });

  return authors.size;
};

export const countNumberOfComments = (data: any) => {
  let count = 0;
  data.map((el: any) => {
    el?.timelineItems?.map((t: any) => {
      if (isComment(t)) {
        count++;
      }
    });
  });

  return count;
};

export const countLinesAdded = (data: any) => {
  let total = 0;
  data.map((el: any) => {
    total += el.additions;
  });

  return total;
};

export const countLinesRemoved = (data: any) => {
  let total = 0;
  data.map((el: any) => {
    total += el.deletions;
  });

  return total;
};
