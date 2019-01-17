'use strict'
moduleTipoproducto.controller('tipoproductoDeleteController', ['$scope', '$http','$location', 'toolService', '$routeParams','sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService ) {

        $scope.id = $routeParams.id;
        //------------show delete-----------
        if ($scope.id){
            $scope.borrado=false;  
        }
        //-----------------------------
        $scope.ob="tipoproducto";
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
            $scope.borrado=true;

        }, function (response) {
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.status = response.status;
            $scope.borrado=false;

        }); 
          $scope.isActive = toolService.isActive;  
          
        };
        

    }
]);