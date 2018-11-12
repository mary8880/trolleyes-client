'use strict'

moduleUsuario.controller('usuarioNewController', ['$scope', '$http', 'toolService', '$routeParams',
    function ($scope, $http, toolService, $routeParams) {
       
        $scope.ob = "usuario";
        
        $scope.isActive = toolService.isActive;

        $scope.createForm = function () {
            var json = {
           
                dni: $scope.dni,
                nombre: $scope.nombre,
                ape1: $scope.ape1,
                ape2: $scope.ape2,
                login: $scope.login,
                pass: $scope.pass,
                id_tipoUsuario: $scope.id_tipoUsuario
            };



            if ($scope.userForm.$valid) {
                $http({
                    method: 'GET',
                    header: {'Content-Type': 'application/json;charset=utf-8'},
                    url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=create',
                    params: {json: JSON.stringify(json)}
                }).then(function (response) {
                    $scope.status = response.status;
                    $scope.ajaxData = response.data.message;
                }, function (response) {
                    $scope.ajaxData = response.data.message || 'Request failed';
                    $scope.status = response.status;
                });

                alert('our form is amazing');
            }
        };
        $scope.isActive = toolService.isActive;

        $scope.resetForm = function () {
       
                $scope.id = " ";
                $scope.dni =" ";
                $scope.nombre =" ";
                $scope.ape1 = " ";
                $scope.ape2 = " ";
                $scope.login = " ";
                $scope.pass =" ";
                $scope.id_tipoUsuario=" ";
           
        };
        $scope.isActive = toolService.isActive;
            }
]);