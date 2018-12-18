'use strict'

moduleLinea.controller('lineaEditController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {

        $scope.ob = "linea";
        $scope.id = $routeParams.id;
        //------------show create-----------
        $scope.edited = true;
        $scope.isActive = toolService.isActive;
        
         $http({
            method: "GET",
            url: `http://localhost:8081/trolleyes/json?ob=linea&op=get&id=`+$scope.id 
        }).then(function (response) {
            $scope.ajaxData = response.data.message;
            $scope.id = response.data.message.id;
            $scope.cantidad = response.data.message.cantidad;
            $scope.obj_factura = {
                id: response.data.message.obj_factura.id
            };
            $scope.obj_producto = {
                id: response.data.message.obj_producto.id,
                desc: response.data.message.obj_producto.desc
            };
});
        $scope.isActive = toolService.isActive;

        $scope.resetForm = function () {

            $scope.desc = "";

        };
             $scope.updateForm = function () {
            var json = {
                id: $scope.id,
                cantidad: $scope.cantidad,
                id_factura: $scope.obj_factura.id,
                id_producto: $scope.obj_producto.id
            }
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=linea&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function () {
                $scope.edited = false;
            })
        }

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