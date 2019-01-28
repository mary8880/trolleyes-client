'use strict';



moduleService.service('sessionService', ['$location', function ($location) {
        var isSessionActive = false;
        var userName = "";
        var userId;
        var admin;
        var productosCarrito = 0;
        var observerCallbacks = [];
        return {
            getUserName: function () {
                return userName;
            },
            setUserName: function (name) {
                userName = name;
                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });

            },
            getUserId: function () {
                return userId;
            },
            setUserId: function (id) {

                userId = id;
                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });

            },
            isSessionActive: function () {
                return isSessionActive;
            },
            setSessionActive: function (name, id) {
                isSessionActive = true;
                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });
            },
            setSessionInactive: function (name, id) {
                isSessionActive = false;
                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });
            },
            logOut: function () {
                isSessionActive = false;
                userName = "";
                userId = "";
                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });
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
            },

            isAdmin: function () {
                return admin;
            },
            setAdmin: function () {
                admin = true;
                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });
            },
            setUser: function () {
                admin = false;
                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });
            }


        }

    }]);