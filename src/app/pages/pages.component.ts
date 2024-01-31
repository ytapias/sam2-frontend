import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions(): void;
  

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  //styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  
  
  constructor (private settingsService: SettingsService){

  }

  ngOnInit(): void {
    customInitFunctions();
  }

}
