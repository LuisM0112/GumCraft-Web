import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  @Output() filterTextEvent = new EventEmitter();
  @Output() filterAZEvent = new EventEmitter();
  @Output() filterPriceEvent = new EventEmitter();

  inputText = "";

  azFilterStatus: boolean = false;
  priceFilterStatus: boolean = false;

  sendInputText() {
    const searchText = this.inputText.toLowerCase();
  
    this.filterTextEvent.emit({ filter: searchText });
  }

  sendAZFilter() {
    this.filterAZEvent.emit({ filter: this.azFilterStatus });
  }
  sendPriceFilter() {
    this.filterPriceEvent.emit({ filter: this.priceFilterStatus });
  }

  changeFilterAZStatus(): void {
    this.azFilterStatus = !this.azFilterStatus;
  }
  changeFilterPriceStatus(): void {
    this.priceFilterStatus = !this.priceFilterStatus;
  }
}
