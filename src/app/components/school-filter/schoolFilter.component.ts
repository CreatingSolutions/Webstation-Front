import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
    selector: 'webstation-schools-filter',
    templateUrl: './schoolFilter.component.html',
    styleUrls: ['./schoolFilter.component.css']
})
export class SchoolFilterComponent implements OnInit, OnDestroy {
    @Input() public title: string;
    public selectedSDBWC = false;
    public nbpersonsmin = 1;
    public nbpersonsmax = 6;

    constructor(private store: Store<AppState>) {

    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    public setNumberPersons(event) {
        console.log(event);
    }

    public makeFilter() {
        console.log(this.selectedSDBWC);
        console.log(this.nbpersonsmin);
        console.log(this.nbpersonsmax);
        /*this.store.dispatch(new SchoolModule.LoadSchoolsFilter({
            sdbwc,
            nbpersonsmin,
            nbpersonsmax
        }));*/
    }
}
