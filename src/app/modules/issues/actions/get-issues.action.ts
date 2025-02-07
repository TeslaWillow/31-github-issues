import { sleep } from "@helpers/index";
import { environment } from "src/environments/environment";
import { GithubIssue, State } from "../interfaces";


const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssues = async(
  state: State = State.All,
  selectedLabels: string[]
): Promise<GithubIssue[]> => {

  sleep(1500);

  const params = new URLSearchParams();
  params.append('state', state);

  if( selectedLabels.length > 0 ) {
    params.append('labels', selectedLabels.join(','));
  }

  try {
    const resp = await fetch(
      `${BASE_URL}/issues?${params}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        }
      }
    );
    if( !resp.ok ) throw 'Cant load issues';

    const labels: GithubIssue[] = await resp.json() as GithubIssue[];

    return labels;
  } catch (error) {
    throw 'Cant load issues';
  }
};
