'use strict'

moduleUsuario.controller('usuarioDeleteController', ['$scope', '$http', 'toolService', '$routeParams',
    function ($scope, $http, toolService, $routeParams) {
        $scope.id = $routeParams.id;
        $scope.ob="usuario";
        $scope.mostrar = false;
        $scope.activar = true;
        $scope.ajaxData = "";
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
        
        
        $scope.delete=function (){
            
           $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob='+$scope.ob+'&op=remove&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
        }, function (response) {
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.status = response.status;
        }); 
          $scope.isActive = toolService.isActive;  
          alert('Has borrado con exito este usuario');
        };
        

    }
]);