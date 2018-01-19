import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppConstant} from '../app.constant';
import { CommonService } from '../common/common.service';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
@Component({
    selector:'flight-view',
    templateUrl:'./flight-view.component.html',
    styleUrls:['./flight-view.component.css']
})

export class FlightComponent implements OnInit, OnDestroy {
    public filteredList: Array<Object> = new Array<Object>();
    private subscription: Subscription;
    constructor( private commonService: CommonService ){}
    ngOnInit() {
        this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
            if (res.hasOwnProperty('option') && res.option === 'call_child') {
               var serachParam = res.value;
               if (serachParam == false || serachParam == true) {
                    return;
               }
               var data = AppConstant.flightData;
                if (!serachParam.fromCity) {
                    alert('Origin cannot be blank.');
                    return;
                } else if (!serachParam.destCity) {
                    alert('Destination cannot be blank.');
                    return;
                } else if (serachParam.fromCity === serachParam.destCity) {
                    alert('Origin and Destination city cannot be same.');
                    return;
                }
               //Time selection is not available in this date picker, so this validation is on this bases of date.
               if (serachParam.departureDate && serachParam.returnDate) {
                    if (this.validateDepartureBeforeReturn(serachParam.departureDate, serachParam.returnDate)) {
                        alert('You cannot return before Departure Date, Time selection support is not available in this date picker so return date always be greater than departure date');
                    }
               }
               var filteredData =  data.filter(function (val) {
                    var dueDate = moment(val.dueDate).format("YYYY-MM-DD")
                    var selectedDepartureDate = moment(serachParam.departureDate).format("YYYY-MM-DD");
                    var selectedReturnDate = moment(serachParam.returnDate).format("YYYY-MM-DD");
                    if (val.origin === serachParam.fromCity &&  
                        val.destination === serachParam.destCity &&
                        (dueDate === selectedDepartureDate || dueDate === selectedReturnDate) &&
                        (serachParam.sliderVal && val.fare > serachParam.sliderVal)) {
                        return res;
                    }
               })
               if (filteredData) {
                    this.filteredList= filteredData;
               } else {
                    this.filteredList= [];
               }  
            }
        });
        this.filteredList = [];
        this.fetchFlightDetails();
    }

    fetchFlightDetails() {
        this.filteredList = AppConstant.flightData;
    }

    validateDepartureBeforeReturn(departureDate: string, returnDate: string) {
        const formatdate = departureDate.split('T')[0];
        const formatdateList = formatdate.split('-');
        const finalDate = formatdateList[0] + '-' + formatdateList[1] + '-' + (parseInt(formatdateList[2], 10) + 1);
        const dateType = new Date(finalDate);
        const departureTime = dateType.getTime();
        const rformatdate = returnDate.split('T')[0];
        const rformatdateList = rformatdate.split('-');
        const rfinalDate = rformatdateList[0] + '-' + rformatdateList[1] + '-' + (parseInt(rformatdateList[2], 10) + 1);
        const rdateType = new Date(rfinalDate);
        const returnTime = rdateType.getTime();
        if (returnTime <= departureTime) {
          return true;
        } else {
          return false;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}