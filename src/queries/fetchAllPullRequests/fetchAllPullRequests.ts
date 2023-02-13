import personalAccessToken from "../../personalAccessToken"
import {build} from './fetchAllPullRequests.query'
import {repo} from '../../repo';

const fetchAllPullRequests = async () => {
    
    let after;
    let nodes: any[] = [];

     do {
            const response: any = await fetch(repo.hostname, {
                method: 'POST',
                headers: {
                    Authorization: `bearer ${personalAccessToken}`
                },
                body: JSON.stringify({
                    query: build(after),
                })
            })

        const payload = await response.json();

        if (payload?.data?.search?.nodes.length === 0) {
            return nodes;
        }

        nodes = nodes.concat(payload?.data?.search?.nodes);
        
        after = payload?.data?.search?.pageInfo?.endCursor;

    } while(!!after);

    return nodes;
}

export {
    fetchAllPullRequests,
}