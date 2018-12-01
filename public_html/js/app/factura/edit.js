'use strict'

moduleFactura.controller('facturaEditController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService', '$location',
    function ($scope, $http, toolService, $routeParams, oSessionService, $location) {
        $scope.id = $routeParams.id;
        $scope.ob = "factura";
        $scope.logeado = false;
        //------------show edited-----------
        $scope.edited = false;

        //----------------logueado---------------------
        if (oSessionService.getUserName() !== "") {
            $scope.userlogeado = oSessionService.getUserName();
            $scope.logeado = true;
            $scope.userlogeadoid=oSessionService.getUserId();
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
                $scope.fecha = response.data.message.fecha;
                $scope.iva = response.data.message.iva;
                $scope.id_usuario = response.data.message.id_usuario;
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
                    fecha: $scope.fecha,
                    iva: $scope.iva,
                    id_usuario: $scope.id_usuario
                }

                $http({
                    method: 'GET',
                    header: {'Content-Type': 'application/json;charset=utf-8'},
                    url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=update',
                    params: {json: JSON.stringify(json)}
                }).then(function (data, response) {
                    console.log(data, response);
                    $scope.edited = true;
                    location.url('/factura/edit');
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
                $scope.fecha = response.data.message.fecha;
                $scope.iva = response.data.message.iva;
                $scope.id_usuario = response.data.message.id_usuario;

            }), function (response) {
                console.log(response);
                
            };

        };
        $scope.isActive = toolService.isActive;



    }
]);