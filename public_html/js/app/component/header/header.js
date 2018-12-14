/* global moduleComponent */

moduleComponent.component('headerComponent', {
    templateUrl: 'js/app/component/header/header.html',
    bindings: {
        eventlistener: '&'
    },
    controllerAs: 'c',
    controller: js
});

function js(sessionService,$http){
     if (sessionService.getUserName() !== "") {
            this.userlogeado = sessionService.getUserName();
            this.logeado = true;
            this.userlogeadoid=sessionService.getUserId();
        }

        this.logout = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
            }).then(function (response) {
                this.logeado = false;
                this.userlogeado = "";
                this.url('/');
                this.log(response);
            });

        };
        }