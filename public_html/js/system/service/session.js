'use strict';



moduleService.service('sessionService', ['$location', function ($location) {
        var isSessionActive = false;
        var userName = "";
        var userId;
        var productosCarrito = 0;
        var observerCallbacks = [];
        return {
            getUserName: function () {
                return userName;
            },
            setUserName: function (name) {
                userName = name;

            },
            getUserId: function () {
                return userId;
            },
            setUserId: function (id) {

                userId = id;

            },
            isSessionActive: function () {
                return isSessionActive;
            },
            setSessionActive: function (name, id) {
                isSessionActive = true;
            },
            setSessionInactive: function (name, id) {
                isSessionActive = false;
            },
            logOut: function () {
                isSessionActive = false;
                userName = "";
                userId = "";
            },
            getCountCarrito: function () {
                return productosCarrito;
            },
            setCountCarrito: function (numeroProductos) {
                productosCarrito = numeroProductos;

                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });
            },
            registerObserverCallback: function (callback) {
                observerCallbacks.push(callback);
            },
            setSesion: function (data) {
                sesion = data;
            },
            getSesion: function () {
                return sesion;
            }
        };

    }]);