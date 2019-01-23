'use strict'

moduleProducto.controller('productoBuyController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.ruta = $location.path();
        $scope.comprado = false;

        $scope.buy = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=buy'
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message;
                $scope.comprado = true;

//                countCarritoService.updateCarrito();
            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message || 'Request failed';
                $scope.comprado = false;
            });

        }
//            $http({
//                method: 'GET',
//                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=show'
//            }).then(function (response) {
//                $scope.status = response.status;
//                $scope.ajaxDataProductos = response.data.message
//            }, function (response) {
//                $scope.ajaxDataProductos = response.data.message || 'Request failed';
//                $scope.status = response.status;
//            });
//        }
        $scope.empty = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=empty'
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataProductos = response.data.message;
                $scope.carritoVacio = true;
//                countCarritoService.updateCarrito();
            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataProductos = response.data.message || 'Request failed';
                $scope.carritoVacio = false;
            });

        }


        $scope.isActive = toolService.isActive;

    }
]);