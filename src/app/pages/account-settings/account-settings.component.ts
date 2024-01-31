import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
})
export class AccountSettingsComponent  implements OnInit{
    
  constructor(private settingService:SettingsService){
  //  console.log (this.links);

  }

  ngOnInit(): void {
    this.settingService.checkCurrentTheme();
  }

 
  changeTheme (theme: string){
    this.settingService.changeTheme(theme);
  }

}
