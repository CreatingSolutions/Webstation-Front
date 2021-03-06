import { Component, OnInit } from '@angular/core';
import {
  AlertService,
} from '../../services';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {Observable} from 'rxjs';
import {CartModule, FlatModule} from '../../store/actions';
import LoadInitFlats = FlatModule.LoadInitFlats;
import {selectFlatsData$, selectFlatsLogs$} from '../../store/selectors/flat.selector';
import { MatDialog } from '@angular/material';
import { Flat } from 'src/app/store/models/flat.interface';
import { FlatDetailComponent } from 'src/app/components/flat-detail/flatDetail.component';

@Component({
  selector: 'flats',
  templateUrl: './flats.component.html',
  styleUrls: ['./flats.component.css']
})
export class FlatsComponent implements OnInit {
  public flats$: Observable<Flat[]>;
  public flatsLogs$: Observable<any>;
  public images = [
    'https://picsum.photos/256/256/?image=1029',
    'https://picsum.photos/256/256/?image=650',
    'https://picsum.photos/256/256/?image=1031'
  ];

  constructor(
    private alertService: AlertService,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {
    this.flats$ = store.pipe(select(selectFlatsData$));
    this.flatsLogs$ = this.store.pipe(select(selectFlatsLogs$));
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadInitFlats());

    this.flatsLogs$.subscribe(logs => {
      if (logs) {
        if (logs.type === 'ERROR') {
          this.alertService.error(logs.message);
        } else if (logs.type === 'SUCCESS') {
          this.alertService.success(logs.message);
        }
      }
    });
  }

  public showDetailFlat(flat: Flat) {
    this.dialog.open(FlatDetailComponent, {
        role: 'dialog',
        width: '60%',
        height: '80%',
        data: flat
    });
  }
}
