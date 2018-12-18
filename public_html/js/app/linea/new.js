'use strict'

moduleLinea.controller('lineaNewController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {

        $scope.ob = "linea";
        $scope.facturaid = $routeParams.id;
        //------------show create-----------
        $scope.creado = false;
        $scope.isActive = toolService.isActive;
        //------------OBJ_FACTURA----------
        $scope.obj_factura = {
            id: $routeParams.id,
            cantidad: null
        }
        $scope.obj_producto = {
            id: null
        }
        //--------------------------------
        $scope.createForm = function () {


            if ($scope.userForm.$valid) {
                var json = {
                    cantidad: $scope.cantidad,
                    id_producto: $scope.obj_producto.id,
                    id_factura: $scope.obj_factura.id
                };
                $http({
                    method: 'GET',
                    header: {'Content-Type': 'application/json;charset=utf-8'},
                    url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=create',
                    params: {json: JSON.stringify(json)}
                }).then(function (response) {
                    $scope.status = response.status;
                    $scope.creado = true;
                    $scope.ajaxData = response.data.message;
                    
                }, function (response) {
                    $scope.ajaxData = response.data.message || 'Request failed';
                    $scope.status = response.status;
                    $scope.creado = false;

                });


            }
        };
        $scope.isActive = toolService.isActive;

        $scope.resetForm = function () {

            $scope.desc = "";

        };
        $scope.productoRefresh = function (f, consultar) {
            var form = f;
            if (consultar) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/trolleyes/json?ob=producto&op=get&id=' + $scope.obj_producto.id
                }).then(function (response) {
                    $scope.obj_producto = response.data.message;
                    form.userForm.obj_producto.$setValidity('valid', true);
                }, function (response) {
                    form.userForm.obj_producto.$setValidity('valid', false);
                });
            } else {
                form.userForm.obj_producto.$setValidity('valid', true);
            }
        }
        $scope.isActive = toolService.isActive;
    }
]);