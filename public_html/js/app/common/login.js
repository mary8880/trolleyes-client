'use strict'

moduleCommon.controller('loginController', ['$scope', '$http', 'toolService', '$routeParams', '$location', 'sessionService',
    function ($scope, $http, toolService, $routeParams, $location, oSessionService, ) {

        $scope.ob = "usuario";

        $scope.loginForm = function () {
        var  pass =forge_sha256($scope.pass)


            $http({
                method: 'GET',
                // header: {'Content-Type': 'application/json;charset=utf-8'},
                url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=login&user=' + $scope.login + '&pass=' +pass
                        //  params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.logueado = true;


            }, function (response) {
                $scope.nologueado = true;

            });
            $location.url('/');

        };
        $scope.isActive = toolService.isActive;


    }
]);
