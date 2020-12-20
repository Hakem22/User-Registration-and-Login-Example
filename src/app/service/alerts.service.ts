import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private subject = new Subject<any>();

  // keeps the alert even after changing page.
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alerts from the subject on changing the route
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
      }
      }
    })
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    //broadcats to every one
    this.subject.next({ type: 'success', text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
}
}
