'use strict'

moduleFactura.controller('facturaNewController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, oSessionService) {
        $scope.obj_usuario = {
            id: $routeParams.id
        }
        $scope.ob = "factura";
        if ($routeParams.id != undefined) {
            $scope.userChooser = false;
        } else {
            $scope.userChooser = true;
        }
        //------------show create-----------
        $scope.creado = false;


        $scope.isActive = toolService.isActive;

        $scope.createForm = function () {


            if ($scope.userForm.$valid) {
                var json = {
                    id: $scope.id,
                    fecha: $scope.myDate,
                    iva: $scope.iva,
                    id_usuario: $scope.obj_usuario.id
                };


                $http({
                    method: 'GET',
                    header: {'Content-Type': 'application/json;charset=utf-8'},
                    url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=create',
                    params: {json: JSON.stringify(json)}
                }).then(function (response) {
                    $scope.status = response.status;
                    $scope.ajaxData = response.data.message;
                    $scope.creado = true;
                    location.url('/factura/new');
                }, function (response) {
                    $scope.ajaxData = response.data.message || 'Request failed';
                    $scope.status = response.status;
                    $scope.creado = false;
                });


            }
        };
        $scope.usuarioRefresh = function (f, consultar) {
            var form = f;
            if (consultar) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=get&id=' + $scope.obj_usuario.id
                }).then(function (response) {
                    $scope.obj_usuario = response.data.message;
                    form.userForm.obj_usuario.$setValidity('valid', true);
                }, function (response) {
                    form.userForm.obj_usuario.$setValidity('valid', false);
                });
            } else {
                form.userForm.obj_usuario.$setValidity('valid', true);
            }
        };

        $scope.isActive = toolService.isActive;

        $scope.resetForm = function () {

            $scope.fecha = "";
            $scope.iva = "";


        };
        $scope.isActive = toolService.isActive;
    }
]);