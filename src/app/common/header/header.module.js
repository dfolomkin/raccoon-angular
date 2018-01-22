import angular from 'angular';

import HeaderComponent from './header.component';
import './header.less';

const HeaderModule = angular
  .module('header', [])
  .component('header', HeaderComponent)
  .name;

export default HeaderModule;
