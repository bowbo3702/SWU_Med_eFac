import { Component } from '@angular/core';

import { MenuPage } from '../menu/menu';
import { AppInfoPage } from '../app-info/app-info';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MenuPage;
  tab2Root = ProfilePage;
  tab3Root = AppInfoPage;

  constructor() {

  }
}
