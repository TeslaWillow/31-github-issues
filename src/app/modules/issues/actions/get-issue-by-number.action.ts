import { sleep } from "@helpers/index";
import { environment } from "src/environments/environment";
import { GithubIssue } from "../interfaces";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssueByNumber = async( issueNumber: string ): Promise<GithubIssue> => {

  // sleep(1500);

  try {
    const resp = await fetch(
      `${BASE_URL}/issues/${ issueNumber }`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        }
      }
    );
    if( !resp.ok ) throw 'Cant load issue';

    const issue: GithubIssue = await resp.json() as GithubIssue;

    console.log({ issue });

    return issue;
  } catch (error) {
    throw `Cant load issue ${issueNumber}`;
  }
};
