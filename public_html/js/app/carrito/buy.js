'use strict'

moduleProducto.controller('productoBuyController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.ruta = $location.path();


            $scope.buy= function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=buy'
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message;
//                countCarritoService.updateCarrito();
            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message || 'Request failed';
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

        $scope.isActive = toolService.isActive;

    }
]);