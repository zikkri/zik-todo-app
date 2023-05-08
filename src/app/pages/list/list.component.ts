import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  public username: string = 'Zack';

  public testing: string[] = ['zzzz', 'ssss', 'rrrrr', 'ttttt'];
}
