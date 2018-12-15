'use strict'

moduleFactura.controller('facturaNewController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, oSessionService) {
        $scope.id_usuario = $routeParams.id;
        $scope.ob = "factura";
        //------------show create-----------
        $scope.creado=false;  
     

        $scope.isActive = toolService.isActive;
       
        $scope.createForm = function () {
          

            if ($scope.userForm.$valid) {
                var json = {
                    id_usuario: $scope.id_usuario
                };


                $http({
                    method: 'GET',
                    header: {'Content-Type': 'application/json;charset=utf-8'},
                    url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=create',
                    params: {json: JSON.stringify(json)}
                }).then(function (response) {
                    $scope.status = response.status;
                    $scope.ajaxData = response.data.message;
                    $scope.creado=true;
                    location.url('/factura/new');
                }, function (response) {
                    $scope.ajaxData = response.data.message || 'Request failed';
                    $scope.status = response.status;
                    $scope.creado=false;
                });

                
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