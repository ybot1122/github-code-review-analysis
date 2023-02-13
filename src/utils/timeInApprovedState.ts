export const timeInApprovedState = (data: any) => {

    const result = data.map((el: any, ind: number) => {
        let timerEnd = Date.parse(el.mergedAt);
        let timerStart = timerEnd;

        const approvers = new Set();

        el?.timelineItems?.map((t: any) => {

            if (t.__typename === 'PullRequestReview') {
                if (t.state === 'APPROVED') {
                    approvers.add(t.author.login);

                    if (approvers.size === 2) {
                        timerStart = Date.parse(t.submittedAt);
                    }
                } else if (t.state === 'CHANGES_REQUESTED' || t.state === 'DISMISSED') {
                    approvers.delete(t.author.login);
                }
            }

        });

        return timerEnd - timerStart;
    });

    return result;
}