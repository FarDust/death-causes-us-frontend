import { Observable, BehaviorSubject, from, tap } from 'rxjs';
import { API_URL } from '../constants/environment';
import { CauseOfDeath } from '../models/causeOfDeath';
import { Death } from '../models/death';

export class DeathCauseService extends Observable<Death[]> {

  private _deathData$: BehaviorSubject<Death[]> = new BehaviorSubject<Death[]>([]);
  private _causeOfDeathId$: BehaviorSubject<CauseOfDeath> = new BehaviorSubject<CauseOfDeath>({
    id: '',
    name: '',
  });

  constructor() {
    super(subscriber => this._deathData$.subscribe(subscriber));
    this._causeOfDeathId$.subscribe((causeOfDeath: CauseOfDeath) => {
      console.log(causeOfDeath);
      if (causeOfDeath.id !== '') {
        from(
          fetch(`${API_URL}/diseases/${causeOfDeath.id}/death-causes`).then(response => response.json())
        ).pipe(
          tap((deathData: Death[]) => {
            this._deathData$.next(deathData)
          }),
        ).subscribe();
      } else {
        this._deathData$.next([]);
      }
      });
  }

  public async list(causeId: string) {
    this._causeOfDeathId$.next(
      {
        id: causeId,
        name: '',
      }
    );
  }

}

export const deathsService = new DeathCauseService();