import { Component, Input } from '@angular/core';
import { Point } from '@core/models/point.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-points-table',
  templateUrl: './points-table.component.html',
  styleUrls: ['./points-table.component.scss']
})
export class PointsTableComponent {

  @Input() points: Point[] = [];

}
