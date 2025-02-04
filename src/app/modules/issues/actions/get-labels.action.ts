import { sleep } from "@helpers/index";
import { environment } from "src/environments/environment";
import { GithubLabel } from "../interfaces";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getLabels = async(): Promise<GithubLabel[]> => {

  sleep(1500);

  try {
    const resp = await fetch(
      `${BASE_URL}/labels`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        }
      }
    );
    if( !resp.ok ) throw 'Cant load labels';

    const labels: GithubLabel[] = await resp.json() as GithubLabel[];

    console.log({ labels });

    return labels;
  } catch (error) {
    throw 'Cant load labels';
  }
};
