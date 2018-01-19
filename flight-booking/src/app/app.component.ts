import { Component, Input , OnInit} from '@angular/core';
import * as moment from 'moment';
import { CommonService } from './common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  fromCity:String;
  destCity:String;
  departureDate:any;
  returnDate:any;
  sliderValue:String;
  isDisabled:boolean;
  oneWayStatus:String;
  returnStatus:String;
  states : any[] = [
      {
          name: 'Delhi',
          code: 'DEL'
      },
      {
          name: 'Amritsar',
          code: 'AMR'
      },
      {
          name: 'Pune',
          code: 'PNQ'
      }
  ];

  ngOnInit() {
      this.isDisabled = true;
      this.oneWayStatus = "warn";
  }

  constructor( private commonService: CommonService ){}
  
  onCityChange(event: any) {
    if (event.type == "Enter Origin City") {
        this.fromCity = event.$event;
    } else {
        this.destCity = event.$event;
    }
  }

  onDateChange(date: any) {
    if (date.type == "Departure date") {
        this.departureDate = date.event.toISOString();
    } else {
        this.returnDate = date.event.toISOString();
    }
  }

  changeSliderVal (val) {
    this.sliderValue = val;
  }

  fetchFlightDetails() {
    var payload = {
        fromCity : this.fromCity,
        destCity: this.destCity,
        departureDate: this.departureDate,
        returnDate: this.returnDate,
        sliderVal: this.sliderValue
    }

    // Notify child component with selected filters after clicking on search button
    this.commonService.notifyOther({option: 'call_child', value: payload});
  }

    disableReturnPicker() {
        if (this.isDisabled) {
            this.oneWayStatus=""
            this.returnStatus="warn"
            this.isDisabled =  false;
            this.commonService.notifyOther({option: 'call_child', value: this.isDisabled});
        } else {
            this.isDisabled =  true;
            this.oneWayStatus="warn"
            this.returnStatus=""
        }
    }
}
