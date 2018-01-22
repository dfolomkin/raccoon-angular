const AppComponent = {
  template: `
    <header class="header js-header"></header>
    <main ng-view></main>
  `,
  controller: /* @ngInject */ class AppComponent {
    constructor($scope, HeaderService, DropdownsService) {
      this.$scope = $scope;
      this.HeaderService = HeaderService;
      this.DropdownsService = DropdownsService;
    }

    $onInit() {
      this.$scope.$on('filterChangedUp', (event, data) => {
        this.$scope.$broadcast('filterChangedDown', data);
      });

      this.$scope.$on('tagClickedUp', (event, data) => {
        this.$scope.$broadcast('tagClickedDown', data);
      });

      this.$scope.$on('asideLinked', () => {
        this.HeaderService.activate();
        this.DropdownsService.activate();
      });
    }
  }
};

export default AppComponent;
