'use strict'

moduleUsuario.controller('usuarioEditController', ['$scope', '$http', 'toolService', '$routeParams','sessionService','$location',
    function ($scope, $http, toolService, $routeParams, oSessionService, $location) {
        $scope.id = $routeParams.id;
        $scope.ob = "usuario";
        $scope.logeado = false;
        //----------------logueado---------------------
        if (oSessionService.getUserName() !== "") {
            $scope.userlogeado = oSessionService.getUserName();
            $scope.logeado = true;
        }

        $scope.logout = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
            }).then(function () {
                $scope.logeado = false;
                $scope.userlogeado = "";
            });
            $location.url('/');
//            $scope.ruta.reload();
//            $location.reload();

        };
        //-------------------------------------------
        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            console.log(response);
            $scope.id = response.data.message.id;
            $scope.dni = response.data.message.dni;
            $scope.nombre = response.data.message.nombre;
            $scope.ape1 = response.data.message.ape1;
            $scope.ape2 = response.data.message.ape2;
            $scope.login = response.data.message.login;
            $scope.pass = "d00000";
            $scope.id_tipoUsuario = response.data.message.obj_tipoUsuario.id;
        }), function (response) {
            console.log(response);
        };
        $scope.isActive = toolService.isActive;

        $scope.updateForm = function () {
//            if ($scope.pass!==""){
//                
//                
//            }

            if ($scope.userForm.$valid) {

                var json = {
                    id: $scope.id,
                    dni: $scope.dni,
                    nombre: $scope.nombre,
                    ape1: $scope.ape1,
                    ape2: $scope.ape2,
                    login: $scope.login,
                    pass: $scope.pass,
                    id_tipoUsuario: $scope.id_tipoUsuario
                }

                $http({
                    method: 'GET',
                    header: {'Content-Type': 'application/json;charset=utf-8'},
                    url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=update',
                    params: {json: JSON.stringify(json)}
                }).then(function (data, response) {
                    console.log(data, response);
                }, function (response) {
                    console.log(response);
                });

                alert('our form is amazing');
            }
        };
        $scope.isActive = toolService.isActive;

        $scope.resetForm = function () {
            $http({
                method: 'GET',
                //withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
            }).then(function (response) {
                console.log(response);
                $scope.id = response.data.message.id;
                $scope.dni = response.data.message.dni;
                $scope.nombre = response.data.message.nombre;
                $scope.ape1 = response.data.message.ape1;
                $scope.ape2 = response.data.message.ape2;
                $scope.login = response.data.message.login;
                $scope.pass = response.data.message.pass;
                $scope.id_tipoUsuario = response.data.message.obj_tipoUsuario.id;
            }), function (response) {
                console.log(response);
            };

        };
        $scope.isActive = toolService.isActive;



    }
]);