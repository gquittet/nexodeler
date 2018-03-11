import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-settings-robot',
  templateUrl: 'settings-robot.html',
})
export class SettingsRobotPage {

  // private batteryChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // ionViewDidEnter() {
  //   this.batteryChart = new Chart('batteryChart', {
  //     type: 'doughnut',
  //     data: {
  //       datasets: [{
  //         label: '# of Votes',
  //         data: [75, 25],
  //         backgroundColor: [
  //           '#05c46b',
  //           '#d2dae2'
  //         ],
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       elements: {
  //         center: {
  //           text: '75%',
  //           color: '#05c46b', // Default is #000000
  //           fontStyle: 'Arial', // Default is Arial
  //           sidePadding: 20 // Defualt is 20 (as a percentage)
  //         }
  //       },
  //       tooltips: {
  //         enabled: false
  //       }
  //     }
  //   });

  //   // Source : http://jsfiddle.net/nkzyx50o/
  //   Chart.pluginService.register({
  //     beforeDraw: function (chart) {
  //       if (chart.config.options.elements.center) {
  //         //Get ctx from string
  //         const ctx = chart.chart.ctx;
          
  //         //Get options from the center object in options
  //         const centerConfig = chart.config.options.elements.center;
  //         const fontStyle = centerConfig.fontStyle || 'Arial';
  //         const txt = centerConfig.text;
  //         const color = centerConfig.color || '#000';
  //         const sidePadding = centerConfig.sidePadding || 20;
  //         const sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
  //         //Start with a base font of 30px
  //         ctx.font = "30px " + fontStyle;
          
  //         //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
  //         const stringWidth = ctx.measureText(txt).width;
  //         const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
  
  //         // Find out how much the font can grow in width.
  //         const widthRatio = elementWidth / stringWidth;
  //         const newFontSize = Math.floor(25 * widthRatio);
  //         const elementHeight = (chart.innerRadius * 2);
  
  //         // Pick a new font size so it will not be larger than the height of label.
  //         const fontSizeToUse = Math.min(newFontSize, elementHeight);
  
  //         //Set font settings to draw it correctly.
  //         ctx.textAlign = 'center';
  //         ctx.textBaseline = 'middle';
  //         const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
  //         const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
  //         ctx.font = fontSizeToUse+"px " + fontStyle;
  //         ctx.fillStyle = color;
          
  //         //Draw text in center
  //         ctx.fillText(txt, centerX, centerY);
  //       }
  //     }
  //   });
  // }

}
