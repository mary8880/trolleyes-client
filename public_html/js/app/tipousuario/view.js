'use strict'

moduleUsuario.controller('tipousuarioViewController', ['$scope', '$http', 'toolService', '$routeParams',
    function ($scope, $http, toolService, $routeParams) {
        $scope.id = $routeParams.id;
        $scope.ob="tipousuario";
        $scope.mostrar = false;
        $scope.activar = true;
        $scope.toggle = function () {
            $scope.mostrar = !$scope.mostrar;
        };
        $scope.enable = function () {
            $scope.activar = !$scope.activar;
        };
        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob='+$scope.ob+'&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
        }, function (response) {
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
        $scope.isActive = toolService.isActive;

    }
]);