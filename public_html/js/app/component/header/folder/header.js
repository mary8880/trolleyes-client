/* global moduleComponent */

'use strict';

moduleComponent.component('headerModal', {
    templateUrl: 'js/app/component/header/header.html',
    bindings: {
        eventlistener: '&'
    },
    controllerAs: 'h',
    controller: hController
});
function hController(toolService, oSessionService, $scope, $http, $location) {
    var self = this;

   self.logeado = false;
        //----------------logueado---------------------
        if (oSessionService.getUserName() !== "") {
            self.userlogeado = oSessionService.getUserName();
            self.logeado = true;
           self.userlogeadoid=oSessionService.getUserId();
        }

        $scope.logout = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
            }).then(function (response) {
                self.logeado = false;
                self.userlogeado = "";
                location.url('/');
                console.log(response);
            });

        };
}
