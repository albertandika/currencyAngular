import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-convert',
  templateUrl: './input-convert.component.html',
  styleUrls: ['./input-convert.component.css']
})
export class InputConvertComponent implements OnInit {
  boolDesimal: boolean = false;
  constructor() { }
  @Input() currency:string;
  @Input() disabled: boolean = false;
  @Output() changeCurrency = new EventEmitter<string> ();
  ngOnInit(): void {
  }

  onChangeCurrency(value){
    if(value.indexOf(',') >= 0) {
      const desimalIndex = value.indexOf(',')
      const leftSide = value.substring(0, desimalIndex)
      const right_side = value.substring(desimalIndex)
      const leftValue = this.formatNumber(leftSide)
      this.currency = leftValue  + right_side
      let notCurrency = value.replaceAll('.', '').replace(',', '.')
      this.changeCurrency.emit(notCurrency)
    } else {
      this.boolDesimal = false
      this.currency = this.formatNumber(value)
      const notCurrency = value.replaceAll('.', '')
      this.changeCurrency.emit(notCurrency)
    }
  }

  onlyNumeric(event){
    return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))
  }

  onChangeBoolDesimal(event) {
    if(event) {
      if(this.currency) this.currency += ',00'
      else this.currency = '0,00'
    } else {
      const desimalIndex = this.currency.indexOf(',')
     this.currency =  this.currency.substr(0, desimalIndex)
    }
  }

  onlyPaste(event){
    let pastedText = event.clipboardData.getData('text');
    let text = pastedText.replace(/[^0-9\.]+/g, '');
     this.currency = text
    return  false
  }

   formatNumber(n) {
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
}
