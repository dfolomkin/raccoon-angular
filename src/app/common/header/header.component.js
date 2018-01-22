import template from './header.html';

const HeaderComponent = {
  template,
  controller: /* @ngInject */ class HeaderComponent {
    constructor($scope) {
      this.$scope = $scope;
    }

    $postLink() {
      this.$scope.$emit('headerLinked');
    }
  }
};

export default HeaderComponent;
