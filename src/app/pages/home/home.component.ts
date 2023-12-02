import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public readonly X_VALUES = [-3, -2, -1, 0, 1, 2, 3, 4, 5];

  public readonly R_VALUES = [-3, -2, -1, 0, 1, 2, 3, 4, 5];

}
