import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSliderChange, MatCheckboxChange } from '@angular/material';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import {CartModule} from '../../store/actions';

@Component({
    selector: 'webstation-lift-detail',
    templateUrl: './liftDetail.component.html',
    styleUrls: ['./liftDetail.component.css']
})
export class LiftDetailComponent {
    public prices: number;
    public insurance = false;
    public taked = 1;

    constructor(
        public dialogRef: MatDialogRef<LiftDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private store: Store<AppState>
    ) {
        this.prices = data.prices;
    }

    public close() {
        this.dialogRef.close();
    }

    public slide(type: string, event: MatSliderChange) {
      this.taked = event.value;
      this.prices = this.data.prices * this.taked;
    }

    public checkInsurance(event: MatCheckboxChange) {
        this.insurance = event.checked;
    }

    public cart() {
        this.store.dispatch(new CartModule.LoadAddLiftCart({
          liftId: this.data.id,
          taked: this.taked,
          insurance: this.insurance
        }));
        this.close();
    }
}
