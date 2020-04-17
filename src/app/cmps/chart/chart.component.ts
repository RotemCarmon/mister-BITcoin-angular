import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() user: User
  chartData: any = { 

  }

  constructor(
    private datePipe: DatePipe
  ) { }
  ngOnInit(): void {
    this.setChartData();
  }

  setChartData(): void {
     
    const chart = {
      type: 'LineChart',
      data:(this.user.moves.length) ? this.user.moves.map<Array<any>>((move) => {
        var at = this.datePipe.transform(move.at , 'MMM d, y')
        return [at, move.amount]
      }) : [[Date.now(),0]],
      title: 'Moves history',
      options: {
        legend: { position: 'none' },
        backgroundColor: {
          fill: 'rgb(41, 41, 66)',
        },
        colors: ['#E88C30'],
        titleTextStyle: { color: '#FFF', fontSize: 14 },
        vAxis: {
          textStyle: { color: '#8089A4' },
        },
        hAxis: {
          format: 'short',
          textStyle: { color: '#8089A4' },
        },
        chartArea:{ width:'84%', height:'65%'},
        curveType:'function'
      }, 
    };
    this.chartData = chart;
    
  }

}
