/* global moduleComponent */

moduleComponent.component('headerComponent', {
    templateUrl: 'js/app/component/header/header.html',
    bindings: {
        eventlistener: '&'
    },
    controllerAs: 'c',
    controller: js
});

function js(sessionService, $http,toolService,$location) {
//    if (sessionService.getUserName() !== "") {
//        this.userlogeado = sessionService.getUserName();
//        this.logeado = true;
//        this.userlogeadoid = sessionService.getUserId();
//
//    }

    var self = this;

    self.logeado = sessionService.isSessionActive();
    self.userlogeado = sessionService.getUserName();
    self.userlogeadoid = sessionService.getUserId();
    self.isActive = toolService.isActive;
    self.isAdmin = sessionService.isAdmin();
    self.carrito = sessionService.getCountCarrito();

    sessionService.registerObserverCallback(function () {
        self.userlogeadoid = sessionService.getUserId();
    })
    sessionService.registerObserverCallback(function () {
        self.userlogeado = sessionService.getUserName();
    })
    sessionService.registerObserverCallback(function () {
        self.isAdmin = sessionService.isAdmin();
    })
    sessionService.registerObserverCallback(function () {
        self.carrito = sessionService.getCountCarrito();
    })
    sessionService.registerObserverCallback(function () {
        self.logeado = sessionService.isSessionActive();
    })




    self.logout = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
        }).then(function (response) {
            self.logeado = false;
            self.userlogeado = "";
            sessionService.setUser();
            sessionService.logOut();
        });
        $location.url('/home');
        
    };
}