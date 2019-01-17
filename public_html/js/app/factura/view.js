'use strict'

moduleFactura.controller('facturaViewController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.id = $routeParams.id;
        $scope.ob = "factura";
        $scope.mostrarlinea = false;
        $scope.mostrar = false;
        $scope.activar = true;
        $scope.toggle = function () {
            $scope.mostrar = !$scope.mostrar;
        }
        $scope.enable = function () {
            $scope.activar = !$scope.activar;
        }
        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob='+$scope.ob+'&op=get&id=' + $scope.id
        }).then(function (response) {
            console.log(response);
            $scope.id = response.data.message.id;
            $scope.myDate = new Date(response.data.message.fecha);
            $scope.iva = response.data.message.iva;
            $scope.obj_usuario = {
                id: response.data.message.obj_usuario.id,
                nombre: response.data.message.obj_usuario.nombre,
                nombrecompleto: response.data.message.obj_usuario.nombre + " " + response.data.message.obj_usuario.ape1
            }
        }, function (response) {
            console.log(response);
        });
        $scope.isActive = toolService.isActive;
        
      $scope.mostrarlineas = function () {
        //getpagespecific
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=linea&op=getpagespecific&rpp=5000&page=1&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message;
            $scope.mostrarlinea =true;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            $scope.mostrarlinea = false;
    });  
      }  
      $scope.ocultarlineas = function () {
          $scope.mostrarlinea = false;
      }
    }
]);