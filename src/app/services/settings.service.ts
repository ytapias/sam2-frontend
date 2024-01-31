import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme=document.querySelector('#theme');

  constructor() { 
    console.log('Settings Service init');

    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href',url);


  }

  changeTheme (theme: string){
    //console.log (theme);

   // console.log (this.linkTheme);
    const url =`./assets/css/colors/${theme}.css`;

    //utilizando vanilla javascript
    this.linkTheme?.setAttribute('href',url);

    //quedar persistente en el local storage, ojo esta informacion no puede ser sensible porque el local storage
    //puede verlo algun usuario medio avanzado
    localStorage.setItem('theme',url);
    
    this.checkCurrentTheme();
   // console.log (theme);
  }

  
  checkCurrentTheme()
  {
    const links =  document.querySelectorAll('.selector');

    links.forEach(elem=>{
      elem.classList.remove('working');
      const btnTheme =elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      //localStorage.setItem('theme2',btnTheme);
      //localStorage.setItem('theme3',btnThemeUrl);
   
      if(btnThemeUrl===currentTheme){
        elem.classList.add('working'); 
      }

    })

  }

}


