import { Component, inject } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { CommonModule } from '@angular/common';
import { LabelsSelectorComponent } from '../../components/labels-selector/labels-selector.component';
import { IssueItemComponent } from '../../components/issue-item/issue-item.component';

@Component({
  selector: 'app-issue-list-page',
  imports: [ CommonModule, LabelsSelectorComponent, IssueItemComponent ],
  templateUrl: './issue-list-page.component.html',
})
export default class IssueListPageComponent {

  private issuesService = inject(IssuesService);

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }

  get issuesQuery() {
    return this.issuesService.issuesQuery;
  }

}
