'use strict'

moduleUsuario.controller('usuarioEditController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService', '$location',
    function ($scope, $http, toolService, $routeParams, oSessionService, $location) {
        $scope.id = $routeParams.id;
        $scope.ob = "usuario";

        $scope.obj = null;
        $scope.result = null;
        //------------show edited-----------
        $scope.edited = false;

  
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
            $scope.pass = "*******";

            var id_tipousuario = response.data.message.obj_tipoUsuario.id;
            var desc_tipousuario = response.data.message.obj_tipoUsuario.desc;
            $scope.obj_tipoUsuario = {id: id_tipousuario, desc: desc_tipousuario};
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
                    pass: forge_sha256($scope.pass),
                    id_tipoUsuario: $scope.obj_tipoUsuario.id
                }

                $http({
                    method: 'GET',
                    header: {'Content-Type': 'application/json;charset=utf-8'},
                    url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=update',
                    params: {json: JSON.stringify(json)}
                }).then(function (data, response) {
                    console.log(data, response);
                    $scope.edited = true;
                    location.url('/usuario/edit');
                }, function (response) {
                    console.log(response);
                });

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

                $scope.id_tipoUsuario = response.data.message.obj_tipoUsuario.id;

            }), function (response) {
                console.log(response);

            };

        };
        $scope.isActive = toolService.isActive;



    }
]);