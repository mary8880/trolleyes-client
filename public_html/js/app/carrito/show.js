'use strict'

moduleProducto.controller('productoShowController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.ruta = $location.path();
        $scope.ob = "producto";

        //-------------------------------------------
        $scope.mostrar = false;
        $scope.activar = true;
        $scope.ajaxData = "";
        $scope.toggle = function () {
            $scope.mostrar = !$scope.mostrar;
        }
        $scope.enable = function () {
            $scope.activar = !$scope.activar;
        }

        $scope.total = 0;
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=show'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataProductos = response.data.message
            var data = $scope.ajaxDataProductos;
            var sumaprod = 0;
            var sumat = 0;
            if (data === null) {
                $scope.carritoVacio = true;
            } else {
                for (var i = 0; i < response.data.message.length; i++) {
                    sumaprod = response.data.message[i].obj_producto.precio * response.data.message[i].cantidad;
                    sumat += sumaprod;
                }
                $scope.total = sumat;

            }
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
                $scope.ajaxDataProductos = response.data.message;
                var data = $scope.ajaxDataProductos;
                var sumaprod = 0;
                var sumat = 0;
                if (data === null) {
                    $scope.carritoVacio = true;
                } else {
                    for (var i = 0; i < response.data.message.length; i++) {
                        sumaprod = response.data.message[i].obj_producto.precio * response.data.message[i].cantidad;
                        sumat += sumaprod;
                    }
                    $scope.total = sumat;

                }

            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataProductos = response.data.message || 'Request failed';
            });

        }
        $scope.reduce = function (id_producto) {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=reduce&id=' + id_producto + '&cant=' + 1
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataProductos = response.data.message;
//                countCarritoService.updateCarrito();
                var data = $scope.ajaxDataProductos;
                var sumaprod = 0;
                var sumat = 0;
                if (data === null) {
                    $scope.carritoVacio = true;
                } else {
                    for (var i = 0; i < response.data.message.length; i++) {
                        sumaprod = response.data.message[i].obj_producto.precio * response.data.message[i].cantidad;
                        sumat += sumaprod;
                    }
                    $scope.total = sumat;

                }

            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataProductos = response.data.message || 'Request failed';
            });

        }
        $scope.empty = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=empty'
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataProductos = response.data.message;
                $scope.carritoVacio = true;
//                countCarritoService.updateCarrito();
                $scope.total = 0;
            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataProductos = response.data.message || 'Request failed';
                $scope.carritoVacio = false;
            });

        }

        $scope.remove = function (id_producto) {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=remove&id=' + id_producto
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataProductos = response.data.message;
//                countCarritoService.updateCarrito();
                var data = $scope.ajaxDataProductos;
                var sumaprod = 0;
                var sumat = 0;
                if (data === null) {
                    $scope.carritoVacio = true;
                } else {
                    for (var i = 0; i < response.data.message.length; i++) {
                        sumaprod = response.data.message[i].obj_producto.precio * response.data.message[i].cantidad;
                        sumat += sumaprod;
                    }
                    $scope.total = sumat;

                }

            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataProductos = response.data.message || 'Request failed';
            });

        }

        $scope.isActive = toolService.isActive;


    }
]);