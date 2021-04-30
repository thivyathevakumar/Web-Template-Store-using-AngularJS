angular.module('templateStore.templates',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/templates', {
        templateUrl: 'templates/templates.html',
        controller: 'TemplatesCtrl'
    }).
    when('/templates/:templateId', {
        templateUrl: 'templates/template-details.html',
        controller: 'TemplateDetailsCtrl'
    })
}])

.controller('TemplatesCtrl', ['$scope', '$http', function($scope, $http){
    $http.get('json/templates.json').then(function(response){
        $scope.templates = response.data;
    });
}])

.controller('TemplateDetailsCtrl', ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
    var templateId = $routeParams.templateId;
    $http.get('json/templates.json').then(function(response){
        $scope.template = $filter('filter')(response.data, {id: templateId})[0];
        $scope.mainImage = $scope.template.images[0].name;
    });

    $scope.setImage = function(image){
        $scope.mainImage = image.name;
    }
}]);