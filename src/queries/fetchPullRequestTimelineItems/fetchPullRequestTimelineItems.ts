import personalAccessToken from "../../personalAccessToken"
import {build} from './fetchPullRequestTimelineItems.query'
import {repo} from '../../repo';

const fetchPullRequestTimelineItems = async (prID: string) => {
    
    let after;
    let nodes: any[] = [];

     do {
            const response: any = await fetch(repo.hostname, {
                method: 'POST',
                headers: {
                    Authorization: `bearer ${personalAccessToken}`
                },
                body: JSON.stringify({
                    query: build(after, prID),
                })
            })

        const payload = await response.json();

        if (payload?.data?.repository?.pullRequest?.timelineItems?.nodes.length === 0) {
            return nodes;
        }

        nodes = nodes.concat(payload?.data?.repository?.pullRequest?.timelineItems?.nodes);
        
        after = payload?.data?.repository?.pullRequest?.timelineItems?.pageInfo?.endCursor;
    } while(!!after);

    return nodes;
}

export {
    fetchPullRequestTimelineItems,
}
