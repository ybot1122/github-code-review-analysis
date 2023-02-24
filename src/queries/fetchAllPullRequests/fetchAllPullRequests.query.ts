// explorer: https://docs.github.com/en/graphql/overview/explorer

import { repo } from "../../repo";

const build = (startDate: string, endDate: string, after?: string) => {
  const afterSearch = after ? ` after: \"${after}\", ` : " ";

  return `query {
        search(first: 100,${afterSearch}query: "repo:${repo.owner}/${repo.name} is:pr is:merged merged:${startDate}..${endDate}", type: ISSUE) {
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
    }`;
};

export { build };
