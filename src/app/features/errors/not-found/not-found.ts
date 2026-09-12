import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-not-found',
  imports: [Button],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  private readonly location=inject(Location)


  backward(){
    this.location.back()
  }
}
