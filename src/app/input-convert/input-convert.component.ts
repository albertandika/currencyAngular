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
  
  
  // formatCurrency(input, blur) {
  //   if (input === "") { return; }
    
  //   // original length
  //   var original_len = input.length;
  
  //   // initial caret position 
  //   var caret_pos = input.prop("selectionStart");
      
  //   // check for decimal
  //   if (input.indexOf(",") >= 0) {
  
  //     // get position of first decimal
  //     // this prevents multiple decimals from
  //     // being entered
  //     var decimal_pos = input_val.indexOf(".");
  
  //     // split number by decimal point
  //     var left_side = input_val.substring(0, decimal_pos);
  //     var right_side = input_val.substring(decimal_pos);
  
  //     // add commas to left side of number
  //     left_side = formatNumber(left_side);
  
  //     // validate right side
  //     right_side = formatNumber(right_side);
      
  //     // On blur make sure 2 numbers after decimal
  //     if (blur === "blur") {
  //       right_side += "00";
  //     }
      
  //     // Limit decimal to only 2 digits
  //     right_side = right_side.substring(0, 2);
  
  //     // join number by .
  //     input_val = "$" + left_side + "." + right_side;
  
  //   } else {
      
  //     input = this.formatNumber(input);
      
  //     if (blur === "blur") {
  //       input += ".00";
  //     }
  //   }
    
     
  //   // put caret back in the right position
  //   var updated_len = input.length;
  //   caret_pos = updated_len - original_len + caret_pos;
  //   input[0].setSelectionRange(caret_pos, caret_pos);
  // }

}
