import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import { CommonModule } from '@angular/common';
import { IssueCommentComponent } from '../../components/issue-comment/issue-comment.component';

@Component({
  selector: 'app-issue-page',
  imports: [ CommonModule, RouterLink, IssueCommentComponent ],
  templateUrl: './issue-page.component.html',
})
export default class IssuePageComponent {

  private _route = inject(ActivatedRoute);
  private _issueService = inject(IssueService);

  public issueNumber = toSignal<string>(
    this._route.paramMap.pipe(
      map( (params) => params.get('number') ?? '' ),
      tap( (number) => this._issueService.setIssueNumber(number) ),
    ),
  );

  public issueQuery = this._issueService.issueQuery;

}
