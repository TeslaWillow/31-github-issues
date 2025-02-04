import { Component, inject } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-issue-list-page',
  imports: [ CommonModule ],
  templateUrl: './issue-list-page.component.html',
})
export default class IssueListPageComponent {

  private issuesService = inject(IssuesService);

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }

}
