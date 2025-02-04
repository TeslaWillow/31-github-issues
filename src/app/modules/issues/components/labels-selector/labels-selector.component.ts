import { Component, input } from '@angular/core';
import { GithubLabel } from '../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'issues-labels-selector',
  imports: [ CommonModule ],
  templateUrl: './labels-selector.component.html',
})
export class LabelsSelectorComponent {

  labels = input.required<GithubLabel[]>();

}
