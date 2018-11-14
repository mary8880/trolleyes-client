
'use strict'

moduleCommon.controller('homeController', ['$scope', '$location', 'toolService', 'sessionService',
    function ($scope, $location, toolService, oSessionService) {
        $scope.logeado = false;
        $scope.ruta = $location.path();
        $scope.isActive = toolService.isActive;

        if (oSessionService.getUserName() !== "") {
            $scope.userlogeado = oSessionService.getUserName();
            $scope.logeado = true;
        }

        $scope.logout = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
            }).then(function () {
               $scope.logeado=false; 
            });
            
        };
}]);