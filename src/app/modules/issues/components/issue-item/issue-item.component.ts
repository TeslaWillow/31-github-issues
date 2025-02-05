import { Component, inject, input } from '@angular/core';
import { GithubIssue, State } from '../../interfaces';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  imports: [ CommonModule, RouterLink ],
  templateUrl: './issue-item.component.html',
})
export class IssueItemComponent {
  issue = input.required<GithubIssue>();
  issueService = inject(IssueService);

  get since() {
    return new Date();
  }

  get isOpen(): boolean {
    return this.issue().state === State.Open;
  }

  prefetchData(): void {
    // this.issueService.prefetchIssue(this.issue().number.toString());
    this.issueService.setIssueData(this.issue());
  }

}
