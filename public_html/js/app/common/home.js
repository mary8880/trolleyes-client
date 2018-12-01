
'use strict'

moduleCommon.controller('homeController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.logeado = false;
        $scope.ruta = $location.path();
        $scope.isActive = toolService.isActive;
        //----------------logueado---------------------
        if (oSessionService.getUserName() !== "") {
            $scope.userlogeado = oSessionService.getUserName();
            $scope.logeado = true;
            $scope.userlogeadoid=oSessionService.getUserId();
        } else {
            $scope.userlogeado = "";
        }

        $scope.logout = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
            }).then(function () {
                $scope.logeado = false;
                $scope.userlogeado = "";


            });
            $location.url('/');
//            $scope.ruta.reload();
//            $location.reload();
        };
     //-------------------------------------------
    }]);