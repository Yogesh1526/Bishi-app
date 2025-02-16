import { Component } from '@angular/core';

@Component({
  selector: 'app-all-winners',
  templateUrl: './all-winners.component.html',
  styleUrls: ['./all-winners.component.css']
})
export class AllWinnersComponent {

    currentWinner = {
      name: 'John Doe',
      image: 'assets/john-doe.jpg',
      description: 'John has achieved exceptional performance this month, setting new records!'
    };
  
    winners = [
      { name: 'Jane Smith', image: 'assets/jane-smith.jpg', description: 'Consistent top performer!' },
      { name: 'Michael Brown', image: 'assets/michael-brown.jpg', description: 'Achieved great results in the last quarter.' },
      { name: 'Sarah Wilson', image: 'assets/sarah-wilson.jpg', description: 'Innovative and driven, a true leader!' }
    ];
  
  
}
