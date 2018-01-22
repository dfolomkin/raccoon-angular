import angular from 'angular';
import HeaderModule from './header/header.module';

const CommonModule = angular
  .module('app.common', [
    HeaderModule
  ])
  .name;

export default CommonModule;
