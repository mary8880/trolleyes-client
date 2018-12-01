'use strict';



moduleService.service('sessionService', ['$location', function ($location) {
        var isSessionActive = false;
        var userName = "";
        var userId;
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
             
                userId =id;
            },
            isSessionActive: function () {
                return isSessionActive;
            },
            setSessionActive: function (name,id) {
                isSessionActive = true;
            },
            setSessionInactive: function (name,id) {
                isSessionActive = false;
            }
        }

    }]);