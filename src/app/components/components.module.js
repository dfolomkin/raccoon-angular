import angular from 'angular';

import ArticlesListModule from './articles-list/articles-list.module';
import ArticlesFilterBarModule from './articles-filter-bar/articles-filter-bar.module';
import SocialsListModule from './socials-list/socials-list.module';
import ArticleFormModule from './article-form/article-form.module';
import AsideModule from './aside/aside.module';
import TagsListModule from './tags-list/tags-list.module';
import LoaderModule from './loader/loader.module';

const ComponentsModule = angular
  .module('app.components', [
    ArticlesListModule,
    ArticlesFilterBarModule,
    SocialsListModule,
    ArticleFormModule,
    AsideModule,
    TagsListModule,
    LoaderModule
  ])
  .name;

export default ComponentsModule;
