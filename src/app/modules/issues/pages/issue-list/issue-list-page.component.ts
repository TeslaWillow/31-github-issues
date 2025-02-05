import { Component, inject } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { CommonModule } from '@angular/common';
import { LabelsSelectorComponent } from '../../components/labels-selector/labels-selector.component';
import { IssueItemComponent } from '../../components/issue-item/issue-item.component';
import { State } from '../../interfaces';

@Component({
  selector: 'app-issue-list-page',
  imports: [ CommonModule, LabelsSelectorComponent, IssueItemComponent ],
  templateUrl: './issue-list-page.component.html',
})
export default class IssueListPageComponent {

  public issuesService = inject(IssuesService);

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }

  get issuesQuery() {
    return this.issuesService.issuesQuery;
  }

  public onChangeState(newState: string): void {
    const state = {
      'all': State.All,
      'open': State.Open,
      'closed': State.Close,
    }[newState] ?? State.All;

    this.issuesService.showIssuesByState(state);
  }

}
