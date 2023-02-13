import { isComment } from "./common";

export const timeToFirstCommentOrApproval = (data: any) => {

    const result = data.map((el: any, ind: number) => {
        let timerEnd = Date.parse(el.mergedAt);
        let timerStart = timerEnd;

        el?.timelineItems?.map((t: any) => {

            if (
                (isComment(t) && t.author.login !== el.author.login) ||
                (t.__typename === 'PullRequestReview' && t.state === 'APPROVED')
            ) {
                const time = t.createdAt ?? t.submittedAt;
                timerStart = Math.min(timerStart, Date.parse(time));
            }

        });

        return timerEnd - timerStart;
    });

    return result;
}