'use strict'

moduleCommon.controller('loginController', ['$scope', '$http', 'toolService', '$routeParams', '$location', 'sessionService',
    function ($scope, $http, toolService, $routeParams, $location, oSessionService, ) {

        $scope.ob = "usuario";

        $scope.loginForm = function () {
            var pass = forge_sha256($scope.pass)


            $http({
                method: 'GET',
                // header: {'Content-Type': 'application/json;charset=utf-8'},
                url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=login&user=' + $scope.login + '&pass=' + pass
                        //  params: {json: JSON.stringify(json)}
            }).then(function (response, data) {
                if (response.data.status == 401) {
                    $scope.errorlogin = true;
                    $scope.logeado = false;
                } else {
                    $scope.logeado = true;
                    $scope.errorlogin = false;
                    oSessionService.setSessionActive();
                    oSessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
                    $scope.userlogeado = oSessionService.getUserName();

                    if (response.data.message.obj_tipoUsuario.id == 1) { //ADMIN
                        oSessionService.setAdmin();
                    } else {
                        oSessionService.setUser();
                    }

                }
            }, function (response) {


            });
//            $location.url('/');

        };
        $scope.isActive = toolService.isActive;


    }
]);
