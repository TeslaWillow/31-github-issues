import { sleep } from "@helpers/index";
import { environment } from "src/environments/environment";
import { GithubIssue } from "../interfaces";


const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssues = async(): Promise<GithubIssue[]> => {

  sleep(1500);

  try {
    const resp = await fetch(
      `${BASE_URL}/issues`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        }
      }
    );
    if( !resp.ok ) throw 'Cant load issues';

    const labels: GithubIssue[] = await resp.json() as GithubIssue[];

    console.log({ labels });

    return labels;
  } catch (error) {
    throw 'Cant load issues';
  }
};
