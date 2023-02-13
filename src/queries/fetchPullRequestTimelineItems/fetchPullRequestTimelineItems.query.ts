// https://studio.apollographql.com/public/github/schema/reference/unions/PullRequestTimelineItem?query=timeline&variant=current
// https://studio.apollographql.com/public/github/schema/reference/unions/PullRequestTimelineItems?query=returnType%3Areadyforreviewevent&variant=current

import {repo} from '../../repo';

const build = (after: string, prNumber: string) => {
    const afterSearch = (after) ? ` after: \"${after}\", ` : ' ';

    return `query {
        repository(owner: "${repo.owner}", name: "${repo.name}") {
            pullRequest(number: ${prNumber}) {
                number
                timelineItems(first:100${afterSearch}itemTypes: [UNLABELED_EVENT, READY_FOR_REVIEW_EVENT, ISSUE_COMMENT, PULL_REQUEST_REVIEW]) {
                    pageInfo {
                        endCursor
                    }
                    nodes {
                        ... on UnlabeledEvent {
                            __typename
                            createdAt
                            label {
                                description
                                name
                            }
                        }
                        ... on ReadyForReviewEvent {
                            __typename
                            createdAt
                        }
                        ... on IssueComment {
                            __typename
                            createdAt
                            bodyText
                            author {
                                login
                            }
                        }
                        ... on PullRequestReview {
                            __typename
                            state
                            submittedAt
                            bodyText
                            author {
                                login
                            }
                        }
                    }
                }
            }
        }
    }`
};

export {
    build
}
