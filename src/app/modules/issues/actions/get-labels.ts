import { sleep } from "@helpers/index";
import { GithubLabel } from "../interfaces/github-label.interface";

export const getLabels = async(): Promise<GithubLabel[]> => {

  sleep(1500);

  try {
    const resp = await fetch('https://api.github.com/repos/angular/angular/labels');
    if( !resp.ok ) throw 'Cant load labels';

    const labels: GithubLabel[] = await resp.json() as GithubLabel[];

    console.log({ labels });

    return labels;
  } catch (error) {
    throw 'Cant load labels';
  }
};
