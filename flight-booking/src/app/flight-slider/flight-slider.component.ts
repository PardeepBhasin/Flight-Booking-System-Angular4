import {Component, ViewEncapsulation, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'flight-slider',
  templateUrl: 'flight-slider.component.html',
  styleUrls: ['flight-slider.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class FlightSlider {
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 20000;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  @Output()  changeSliderVal: EventEmitter<any> = new EventEmitter<any>();

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
  private _tickInterval = 1;

  onInputChange(newVal) {
    this.changeSliderVal.emit(newVal);
  }
}