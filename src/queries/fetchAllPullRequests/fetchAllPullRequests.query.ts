// explorer: https://docs.github.com/en/graphql/overview/explorer

import {repo} from '../../repo';

const build = (after?: string) => {
    const afterSearch = (after) ? ` after: \"${after}\", ` : ' ';

    return `query {
        search(first: 100,${afterSearch}query: "repo:${repo.owner}/${repo.name} is:pr is:merged merged:2023-01-01..2023-01-31", type: ISSUE) {
            pageInfo {
                hasNextPage
                endCursor
            }      
            nodes {
                ... on PullRequest {
                    title
                    url
                    number
                    createdAt
                    mergedAt
                    additions
                    deletions
                    baseRefName
                    author {
                        login
                    }
                }
            }
        }
    }`
};

export {
    build,
}