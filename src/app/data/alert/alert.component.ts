import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/service/alerts.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  private subscription: Subscription;
  message: any

  constructor(private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.subscription = this.alertsService.getMessage().subscribe(message => {
      this.message = message;
  })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
