import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

export class State {
  constructor(public name: string, public population: string, public flag: string) { }
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }
}
