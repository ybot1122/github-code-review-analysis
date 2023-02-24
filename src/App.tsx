import JSONPretty from "react-json-pretty";

import { useEffect, useState } from "react";
import "./App.css";

import { fetchAllPullRequests } from "./queries/fetchAllPullRequests/fetchAllPullRequests";
import { fetchPullRequestTimelineItems } from "./queries/fetchPullRequestTimelineItems/fetchPullRequestTimelineItems";
import * as monthAtAGlance from "./utils/monthAtAGlance";
import { timeToMerge } from "./utils/timeToMerge";
import sample from "./hardcoded_data/sample.json";
import { sum } from "./utils/math";
import { timeToFirstCommentOrApproval } from "./utils/timeToFirstComment";
import { timeInApprovedState } from "./utils/timeInApprovedState";
import { numberOfComments } from "./utils/numberOfComments";
import { numberOfLinesAdded } from "./utils/linesAdded";
import { numberOfLinesDeleted } from "./utils/linesDeleted";
import { bots, msToMins } from "./utils/common";
import { MetricsHeadline } from "./components/MetricsHeadline";
import { GroupIntervalButton } from "./components/GroupIntervalTextArea";
import { RawDataTextArea } from "./components/RawDataTextArea";
import { DatePickerForm } from "./components/DatePickerForm";

function App() {
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "2023-01-01",
    end: "2023-01-31",
  });
  const [data, setData] = useState<any[]>(sample as any[]);
  const [activeArray, setActiveArray] = useState<{ arr: any[]; name: string }>({
    arr: [],
    name: "none",
  });

  // DATA FETCHING
  useEffect(() => {
    const first = async () => {
      // 1) Fetch all PRs in time range from solorepo
      const payload = await fetchAllPullRequests(
        dateRange.start,
        dateRange.end
      );

      // 2) Filter for only PRs merged into main and authors who are not bots
      const filtered_payload = payload.filter(
        (el) => el.baseRefName === "main" && !bots.includes(el.author.login)
      );

      // 3) Map over each PR and append their event timeline
      const timelinePromises: any[] = [];
      filtered_payload.forEach((item, ind) => {
        timelinePromises[ind] = fetchPullRequestTimelineItems(item.number).then(
          (timeline) => ({
            ...item,
            timelineItems: timeline,
          })
        );
      });

      const settled = await Promise.allSettled(timelinePromises);

      // set state
      const result = settled.map((el: any) => el.value);
      setData(result);
    };

    if (!data.length) {
      first();
    }
  }, []);

  // Metrics
  const timeToMergeArray = timeToMerge(data);
  const timeToFirstCommentArray = timeToFirstCommentOrApproval(data);
  const timeInApprovedStateArray = timeInApprovedState(data);
  const numberOfCommentsArray = numberOfComments(data);
  const numberOfLinesAddedArray = numberOfLinesAdded(data);
  const numberOfLinesDeletedArray = numberOfLinesDeleted(data);

  // Month at a Glance
  const number_of_prs_merged = `Number of PRs Merged: ${data.length}`;
  const number_of_authors_who_merged = `Number of PR Authors Who Merged: ${monthAtAGlance.countUniqueAuthors(
    data
  )}`;
  const number_of_reviewers = `Number of Reviewers: ${monthAtAGlance.countUniqueReviewers(
    data
  )}`;
  const number_of_comments = `Number of Comments: ${sum(
    numberOfCommentsArray
  )}`;
  const lines_added = `Lines Added: ${sum(numberOfLinesAddedArray)}`;
  const lines_deleted = `Lines Deleted: ${sum(numberOfLinesDeletedArray)}`;

  if (!data.length) {
    return <>Welcome... Please wait... loading data...</>;
  }

  return (
    <div className="App">
      <JSONPretty id="json-pretty" className="rawJson" data={data}></JSONPretty>
      <div className="prettyData">
        <DatePickerForm initialStartDate={dateRange.start} initialEndDate={dateRange.end} />
        <h1>Month At A Glance</h1>
        <div>
          <h2>{number_of_prs_merged}</h2>
        </div>
        <div>
          <h2>{number_of_authors_who_merged}</h2>
        </div>
        <div>
          <h2>{number_of_reviewers}</h2>
        </div>
        <div>
          <h2>{number_of_comments}</h2>
        </div>
        <div>
          <h2>{lines_added}</h2>
        </div>
        <div>
          <h2>{lines_deleted}</h2>
        </div>

        <h1>Metrics</h1>
        <MetricsHeadline
          onClick={setActiveArray}
          arr={timeToMergeArray}
          name={"Time to Merge"}
          isTimeUnit
        />
        <MetricsHeadline
          onClick={setActiveArray}
          arr={timeToFirstCommentArray}
          name={"Time to First Comment or Approval"}
          isTimeUnit
        />
        <MetricsHeadline
          onClick={setActiveArray}
          arr={timeInApprovedStateArray}
          name={"Time in Approved State"}
          isTimeUnit
        />
        <MetricsHeadline
          onClick={setActiveArray}
          arr={numberOfCommentsArray}
          name={"Number of Comments"}
          isTimeUnit={false}
        />
        <MetricsHeadline
          onClick={setActiveArray}
          arr={numberOfLinesAddedArray}
          name={"Number of Lines Added"}
          isTimeUnit={false}
        />
        <MetricsHeadline
          onClick={setActiveArray}
          arr={numberOfLinesDeletedArray}
          name={"Number of Lines Deleted"}
          isTimeUnit={false}
        />

        <h3>{`Now showing: ${activeArray.name}`}</h3>
        <table>
          <tbody>
            <tr>
              <td>
                <RawDataTextArea arr={activeArray.arr} />
              </td>
              <td>
                <GroupIntervalButton arr={activeArray.arr} />{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
