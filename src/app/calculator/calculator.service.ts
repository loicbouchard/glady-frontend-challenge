import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap, Observable, BehaviorSubject } from 'rxjs';
import { Combination } from './combination';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private _savedCombination!: Combination;
  private _isPrevActionAllowed: BehaviorSubject<boolean>;
  private _isNextActionAllowed: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this._isPrevActionAllowed = new BehaviorSubject(false);
    this._isNextActionAllowed = new BehaviorSubject(false);
  }

  get isPrevActionAllowed(): Observable<boolean> {
    return this._isPrevActionAllowed.asObservable();
  }

  get isNextActionAllowed(): Observable<boolean> {
    return this._isNextActionAllowed.asObservable();
  }

  getCombination(shopId: number, amount: number): Observable<Combination> {
    return this.http
      .get<Combination>(`shop/${shopId}/search-combination`, {
        params: { amount },
      })
      .pipe(tap(this.saveCombination));
  }

  getPrevCombination(shopId: number): Observable<Combination> {
    if (this._savedCombination?.floor) {
      return this.getCombination(shopId, this._savedCombination.floor.value);
    }
    return of(this._savedCombination);
  }

  getNextCombination(shopId: number): Observable<Combination> {
    if (this._savedCombination?.ceil) {
      return this.getCombination(shopId, this._savedCombination.ceil.value);
    }
    return of(this._savedCombination);
  }

  disablePrevAndNextAction(): void {
    this._isPrevActionAllowed.next(false);
    this._isNextActionAllowed.next(false);
  }

  private saveCombination = (combination: Combination): void => {
    this._savedCombination = combination;
    this._isPrevActionAllowed.next(!!combination?.floor);
    this._isNextActionAllowed.next(!!combination?.ceil);
  };
}
