import { Component, input } from '@angular/core';
import { GithubIssue, State } from '../../interfaces';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'issue-item',
  imports: [ CommonModule, RouterLink ],
  templateUrl: './issue-item.component.html',
})
export class IssueItemComponent {
  issue = input.required<GithubIssue>();

  get since() {
    return new Date();
  }

  get isOpen(): boolean {
    return this.issue().state === State.Open;
  }

}
