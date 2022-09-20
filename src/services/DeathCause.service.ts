import { Observable, BehaviorSubject, from, map, tap } from 'rxjs';
import { API_URL } from '../constants/environment';
import { CauseOfDeath } from '../models/causeOfDeath';

export class DeathCauseService extends Observable<CauseOfDeath[]> {

  private _causesOfDeath$: BehaviorSubject<CauseOfDeath[]> = new BehaviorSubject<CauseOfDeath[]>([]);

  constructor() {
    super(subscriber => this._causesOfDeath$.subscribe(subscriber));
  }

  public async list() {
    from(fetch(`${API_URL}/diseases`).then(response => response.json()))
      .pipe(
        tap((causesOfDeath: CauseOfDeath[]) => {
          console.log(causesOfDeath);
          this._causesOfDeath$.next(causesOfDeath)
        })
      ).subscribe();
  }

}

export const deathCauseService = new DeathCauseService();