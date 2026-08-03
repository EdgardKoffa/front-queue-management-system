import { Component, input } from '@angular/core';
import { Activity } from '../../models/activities';

@Component({
  selector: 'app-recent-activities',
  imports: [],
  templateUrl: './recent-activities.html',
  styleUrl: './recent-activities.css',
})
export class RecentActivities {
  activities=input<Activity[]>([])

}
