'use strict'

moduleTipoproducto.controller('tipoproductoNewController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {

        $scope.ob = "tipoproducto";
        //------------show create-----------
        $scope.creado=false;  
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
                    $scope.creado=true;
                    location.url('/new');
                }, function (response) {
                    $scope.ajaxData = response.data.message || 'Request failed';
                    $scope.status = response.status;
                    $scope.creado=false;
                });

                
            }
        };
        $scope.isActive = toolService.isActive;

        $scope.resetForm = function () {

            $scope.desc= "";

        };
        $scope.isActive = toolService.isActive;
    }
]);