import { sleep } from "@helpers/index";
import { environment } from "src/environments/environment";
import { GithubIssue } from "../interfaces";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssueCommentsByNumber = async( issueNumber: string ): Promise<GithubIssue[]> => {

  sleep(1500);

  try {
    const resp = await fetch(
      `${BASE_URL}/issues/${ issueNumber }/comments`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        }
      }
    );
    if( !resp.ok ) throw 'Cant load comment';

    const issues: GithubIssue[] = await resp.json() as GithubIssue[];

    console.log({ issues });

    return issues;
  } catch (error) {
    throw `Cant load comment ${issueNumber}`;
  }
};
