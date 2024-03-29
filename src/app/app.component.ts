import { Component, ViewChild } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InputConvert';
  public currency : string = '';
  public dollar: string;
  public idr: string;
  
  addItem(newItem: string) {
    this.currency = newItem
  }

  changeToDollar(value) {
    const idr = 14000 * value
    const strIDR = idr.toString()
    if(strIDR.indexOf('.') > 0) {
      const lenIndex = strIDR.indexOf('.')
      const leftSide = strIDR.substring(0, lenIndex)
      const rightSide = strIDR.substring(lenIndex).replace('.', ',')
      const leftValue = this.formatNumber(leftSide)
      this.idr = leftValue + rightSide
    } else {
      this.idr = this.formatNumber(idr.toString())
    }
  }

  formatNumber(n) {
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
 
}
