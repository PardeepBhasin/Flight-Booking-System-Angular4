import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'flight-datepicker',
  templateUrl: 'flight-datepicker.component.html',
  styleUrls: ['flight-datepicker.component.css'],
})
export class FlightDatepicker implements OnInit{
    private subscription: Subscription;
    @Input()
    placeholder : String;
    today: string = moment().toISOString();
    @Input()
    required : String;
    @Input()
    isDisabled:boolean;
    @Output() changeDate: EventEmitter<any> = new EventEmitter<any>();

    constructor( private commonService: CommonService ){}

    ngOnInit() {
      this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
         if (res && res.value) {
            this.isDisabled = res.value;
         }
      });
    }

    onDateChange(event, type){
      this.changeDate.emit({event, type}); 
    }
}