import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { AnnoncesService } from 'src/app/shared/services/annonces.service';
import { ConnectedUserService } from 'src/app/shared/services/connectedUser.service';
import { StatsService } from 'src/app/shared/services/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private annonceService: AnnoncesService, private connectedUserService: ConnectedUserService, private router: Router, private statsService: StatsService) { }

  ngOnInit(): void {
    this.getStats();
    this.greeting = this.getGreeting();
    this.annonceService.getAllAnnonces().subscribe((annonces: any) => {
      this.annoncesList = annonces;
    });
    this
    this.connectedUserService.getMyProfile().subscribe((user) => {
      this.user = user;
    });
  }
  user: any;
  greeting = 'Bonjour';
  annoncesList: any[] = [];

  // say "Bonjour" or "Bonsoir" depending on the time of the day
  getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Bonjour';
    } else if (currentHour < 18) {
      return 'Bon après-midi';
    } else {
      return 'Bonsoir';
    }
  }


  // generate a random color for the user avatar background based on the first letter of his first name
  // use tailwindcss background color classes
  generateRandomColor(name: string) {
    let firstLetter = name
    let colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];
    let index = firstLetter.charCodeAt(0) % colors.length;
    return colors[index];
  }

  openRoute(route: string) {
    this.router.navigate([route]);
  }

  stats: any;
  getStats() {
    this.statsService.getAllStats().subscribe((stats: any) => {
      this.stats = stats;
      this.renderCharts();
    });
  }

  missionChartOption!: EChartsOption;
  leavesChartOption!: EChartsOption;
  teamsChartOption!: EChartsOption;

  renderCharts() {
    // missions chart
    this.missionChartOption = {
      title: {
        text: 'Missions',
        subtext: 'Missions par statut',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '15%',
        left: 'left'
      },
      series: [
        {
          top: '20%',
          name: 'Statut',
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.stats.missions.planned, name: 'Planifiée' },
            { value: this.stats.missions.in_progress, name: 'En cours' },
            { value: this.stats.missions.completed, name: 'Terminée' },
            { value: this.stats.missions.cancelled, name: 'Annulée' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    console.log(Object.keys(this.stats.teams))

    // teams chart
    this.teamsChartOption = {

      title: {
        text: 'Équipes',
        subtext: 'Équipes par nombre de membres',
        left: 'left'
      },
      dataset: [
        {
          dimensions: ['name', 'value'],
          source: Object.keys(this.stats.teams).map((key) => {
            return {
              name: key,
              value: this.stats.teams[key]
            }
          })
        },
        {
          transform: {
            type: 'sort',
            config: { dimension: 'value', order: 'desc' }
          }
        }
      ],
      xAxis: {
        type: 'category',
        axisLabel: { interval: 0, rotate: 45 }
      },
      yAxis: {},
      series: {
        type: 'bar',
        encode: { x: 'name', y: 'value' },
        datasetIndex: 1
      }
    }


    // leaves chart
    this.leavesChartOption = {
      title: {
        text: 'Demandes de congés',
        subtext: 'Demandes de congés par type',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '15%',
        left: 'left'
      },
      series: [
        {
          top: '20%',
          name: 'Statut',
          type: 'pie',
          radius: '50%',
          data: [
            /**
             * "annual_leave" : 10,
        "maternity_leave" : 7,
        "sick_leave" : 3,
             */
            { value: this.stats.leaves.annual_leave, name: 'Congé annuel' },
            { value: this.stats.leaves.maternity_leave, name: 'Congé maternité' },
            { value: this.stats.leaves.sick_leave, name: 'Congé maladie' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }


    // end 
  }



}
