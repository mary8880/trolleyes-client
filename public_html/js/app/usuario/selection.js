'use strict'
moduleComponent.component('usuarioSelection', {
    templateUrl: 'js/app/usuario/selection.html',
    controllerAs: 'c',
    controller: cController,
    bindings: {
        obj: '=',
        onUsuarioSet: '&'
    },
});

function cController($http) {
    var self = this;
    self.ob = "usuario";
    self.page = 1;
    self.totalPages = 1;
    self.orderURLServidor = "";
    self.rpp = "10";

    

    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=' + self.ob + '&op=getcount'
    }).then(function (response) {
        self.status = response.status;
        self.ajaxDataUsuariosNumber = response.data.message;
        self.totalPages = Math.ceil(self.ajaxDataUsuariosNumber / self.rpp);
        if (self.page > self.totalPages) {
            self.page = self.totalPages;
        }
    }, function (response) {
        self.ajaxDataUsuariosNumber = response.data.message || 'Request failed';
        self.status = response.status;
    });

    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=' + self.ob + '&op=getpage&rpp=' + self.rpp + '&page=' + self.page + self.orderURLServidor
    }).then(function (response) {
        self.status = response.status;
        self.data = response.data.message;
    }, function (response) {
        self.status = response.status;
        self.data = response.data.message || 'Request failed';
    });
     self.update = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=' + self.ob + '&op=getcount'
        }).then(function (response) {
            self.status = response.status;
            self.ajaxDataUsuariosNumber = response.data.message;
            self.totalPages = Math.ceil(self.ajaxDataUsuariosNumber / self.rpp);
            if (self.page > self.totalPages) {
                self.page = self.totalPages;
            }
            pagination();
        }, function (response) {
            self.ajaxDataUsuariosNumber = response.data.message || 'Request failed';
            self.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=' + self.ob + '&op=getpage&rpp=' + self.rpp + '&page=' + self.page + self.orderURLServidor
        }).then(function (response) {
            self.status = response.status;
            self.data = response.data.message;
        }, function (response) {
            self.status = response.status;
            self.data = response.data.message || 'Request failed';
        });
    };
    self.ordena = function (order, align) {
        if (self.orderURLServidor === "") {
            self.orderURLServidor = "&order=" + order + "," + align;
        } else {
            self.orderURLServidor = self.orderURLServidor + "-" + order + "," + align;
        }
        
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=' + self.ob + '&op=getpage&rpp=' + self.rpp + '&page=' + self.page + self.orderURLServidor
        }).then(function (response) {
            self.status = response.status;
            self.data = response.data.message;
        }, function (response) {
            self.status = response.status;
            self.data = response.data.message || 'Request failed';
        });
    };

    self.save = function (id, nombre) {
        self.obj.id = id;
        self.obj.nombre = nombre;
        self.onUsuarioSet();
    };
    self.pagination2= function() {
        self.list2 = [];
        self.neighborhood = 3;
        for (var i = 1; i <= self.totalPages; i++) {
            if (i === self.page) {
                self.list2.push(i);
            } else if (i <= self.page && i >= (self.page - self.neighborhood)) {
                self.list2.push(i);
            } else if (i >= self.page && i <= (self.page - -self.neighborhood)) {
                self.list2.push(i);
            } else if (i === (self.page - self.neighborhood) - 1) {
                self.list2.push("...");
            } else if (i === (self.page - -self.neighborhood) + 1) {
                self.list2.push("...");
            }
        }
    };
    function pagination() {
        self.list = [];
       self.valorNeighbourhood = 1;
        var prev_1 = (self.page - self.valorNeighbourhood);
        var prev_2 = (self.page - self.valorNeighbourhood - 1);
        var post_1 = (self.page - -self.valorNeighbourhood);
        var post_2 = (self.page - -self.valorNeighbourhood + 1);

        for (var i = 2; i <= self.totalPages - 1; i++) {
            if (i >= prev_1 && i <= post_1) {
                self.list.push(i);
            } else if (i === prev_2 || i === post_2) {
                self.list.push("...");
            }
        }
    }

}


