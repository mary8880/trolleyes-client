'use strict'

moduleUsuario.controller('tipousuarioNewController', ['$scope', '$http', 'toolService', '$routeParams',
    function ($scope, $http, toolService, $routeParams) {

        $scope.ob = "tipousuario";

        $scope.isActive = toolService.isActive;

        $scope.createForm = function () {


            if ($scope.userForm.$valid) {
                var json = {
                    id: $scope.id,
                    desc: $scope.desc
                };
                $http({
                    method: 'GET',
                    header: {'Content-Type': 'application/json;charset=utf-8'},
                    url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=create',
                    params: {json: JSON.stringify(json)}
                }).then(function (response) {
                    $scope.status = response.status;
                    $scope.ajaxData = response.data.message;
                }, function (response) {
                    $scope.ajaxData = response.data.message || 'Request failed';
                    $scope.status = response.status;
                });

                alert('Has realizado con exito un nuevo  tipo de usuario');
            }
        };
        $scope.isActive = toolService.isActive;

        $scope.resetForm = function () {

            $scope.desc= "";

        };
        $scope.isActive = toolService.isActive;
    }
]);