import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    selector: 'flight-autocomplete',
    templateUrl:'./flight-autocomplete.component.html',
    styleUrls:['./flight-autocomplete.component.css']
})

export class FlightAutocompleteComponent {
    formCtrl: FormControl;
    filteredStates: Observable<any[]>;
    @Input()
    placeholder: String;
    @Input()
    states: any[];
    today: number = Date.now();
    @Output() changeCity: EventEmitter<any> = new EventEmitter<any>();
  
    constructor() {
      this.formCtrl = new FormControl();
      this.filteredStates = this.formCtrl.valueChanges
          .startWith(null)
          .map(state => state ? this.filterStates(state) : this.states.slice());
    }
  
    filterStates(name: string) {
      return this.states.filter(state =>
        state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    onCityChange($event, type) {
        this.changeCity.emit({$event, type});  
    };
  
}