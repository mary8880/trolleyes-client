'use strict'

moduleCommon.controller('loginController', ['$scope', '$http', 'toolService', '$routeParams',
    function ($scope, $http, toolService, $routeParams) {

        $scope.ob = "usuario";
        $scope.isActive = toolService.isActive;
        $scope.logueado = false;
        $scope.nologueado=false;
        $scope.loginForm = function (){
           

                $http({
                    method: 'GET',
                   // header: {'Content-Type': 'application/json;charset=utf-8'},
                    url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=login&user=' + $scope.login +'&pass='+ $scope.pass
                  //  params: {json: JSON.stringify(json)}
                }).then(function (response) {
                    $scope.logueado = true;
                   
                    
                }, function (response) {
                    $scope.nologueado = true;
                    
                });

                alert('Te has logueado');
                $location.url('/home');
           
        };
        $scope.isActive = toolService.isActive;

        $scope.isActive = toolService.isActive;
    }
]);