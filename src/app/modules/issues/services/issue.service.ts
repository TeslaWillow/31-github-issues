import { inject, Injectable, signal } from '@angular/core';
import { injectQuery, injectQueryClient, QueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions';
import { getIssueCommentsByNumber } from '../actions/get-issue-comments-by-number.action';
import { GithubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issueNumber = signal<string | null>(null);
  private queryClient = inject(QueryClient);

  public issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null, // Dont be trigger until we have number
  }));

  public commentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null, // Dont be trigger until we have number
  }));

  public setIssueNumber( issueId: string ): void {
    this.issueNumber.set(issueId);
  }

  prefetchIssue( issueUd: string ): void {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueUd], // strict
      queryFn: () => getIssueByNumber(issueUd),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  }

  setIssueData( issue: GithubIssue ): void {
    this.queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() + 1000 * 60, // 1min.
    });
  }

}
