import { roundToTwoDecimalPlaces } from "./math";

export const bots = ["bot-fuzzbucket", "mergify", "jenkins-wse"];

// Given a PR's timeline events, return the "timerStart"
// which is after the PR leaves draft mode and after the WIP label
// is removed for the last time
export const getStartTime = (timeline: any[], initialValue: string) => {
  let timerStart = Date.parse(initialValue);

  timeline?.map((t: any) => {
    if (
      t.__typename === "ReadyForReviewEvent" ||
      (t.__typename === "UnlabeledEvent" && t.label.name === "WIP")
    ) {
      timerStart = Math.max(timerStart, Date.parse(t.createdAt));
    }
  });

  return timerStart;
};

// returns true if the event is a "comment" from a human.
// this can be IssueComment or PullRequestReview.
// the body of the comment must be non-empty.
export const isComment = (timelineEvent: any) => {
  if (
    timelineEvent.__typename === "IssueComment" &&
    !bots.includes(timelineEvent.author.login) &&
    timelineEvent.bodyText.length
  ) {
    return true;
  }

  if (
    timelineEvent.__typename === "PullRequestReview" &&
    !bots.includes(timelineEvent.author.login) &&
    timelineEvent.bodyText.length
  ) {
    return true;
  }

  return false;
};

export const msToDays = (ms: number): number => ms / 86400000;

export const msToHrs = (ms: number): number => {
  return ms / 3600000;
};

export const msToMins = (ms: number): number => {
  return ms / 60000;
};
