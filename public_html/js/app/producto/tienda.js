'use strict'

moduleProducto.controller('productoTiendaController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.ruta = $location.path();
        $scope.ob = "producto";
     
        $scope.mostrar = false;
        $scope.activar = true;
        $scope.ajaxData = "";
        $scope.toggle = function () {
            $scope.mostrar = !$scope.mostrar;
        }
        $scope.enable = function () {
            $scope.activar = !$scope.activar;
        }

        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp=5000&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataProductos = response.data.message;
        }, function (response) {
            $scope.ajaxDataProductos = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $scope.add = function (id_producto) {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=add&id=' + id_producto + '&cant=' + 1
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message;
//                countCarritoService.updateCarrito();
            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        }
        $scope.isActive = toolService.isActive;

    }

]);