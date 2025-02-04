
import {  Component, input } from '@angular/core';
import { GithubIssue } from '../../interfaces';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'issue-comment',
  imports: [ CommonModule, MarkdownModule ],
  templateUrl: './issue-comment.component.html',
})
export class IssueCommentComponent {
  public issue = input.required<GithubIssue>();
}
