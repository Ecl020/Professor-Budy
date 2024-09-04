import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private hasProfileSubject = new BehaviorSubject<boolean>(false);

  hasProfile$ = this.hasProfileSubject.asObservable();

  setHasProfile(hasProfile: boolean) {
    this.hasProfileSubject.next(hasProfile);
  }

}
