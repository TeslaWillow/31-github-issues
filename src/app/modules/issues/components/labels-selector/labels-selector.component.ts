import { Component, inject, input } from '@angular/core';
import { GithubLabel } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-labels-selector',
  imports: [ CommonModule ],
  templateUrl: './labels-selector.component.html',
})
export class LabelsSelectorComponent {

  public labels = input.required<GithubLabel[]>();
  public issuesService = inject(IssuesService);

  public isSelected( labelName: string ): boolean {
    return this.issuesService.selectedLabels().has(labelName);
  }

  public onToggleLabel( labelName: string ) {
    this.issuesService.toggleLabel(labelName);
  }
}
