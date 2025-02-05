import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssues, getLabels } from '../actions';
import { State } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  public selectedState  = signal<State>(State.All);
  public selectedLabels = signal(new Set<string>());

  public labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  public issuesQuery = injectQuery(() => ({
    queryKey: ['issues', {
      state: this.selectedState(),
      seletedLabels: [...this.selectedLabels()],
    }],
    queryFn: () => getIssues( this.selectedState(), [...this.selectedLabels()] ),
  }));

  public showIssuesByState( state: State ) {
    this.selectedState.set(state);
  }

  public toggleLabel( label: string ) {
    const labels = this.selectedLabels();

    if (labels.has(label)) {
      labels.delete(label);
    } else {
      labels.add(label);
    }
    this.selectedLabels.set(new Set(labels));
  }

}
