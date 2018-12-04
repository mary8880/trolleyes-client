'use strict'

moduleFactura.controller('facturaPlistXusuarioController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {

        $scope.ob = "factura";
        $scope.id_usuario= $routeParams.id;
        $scope.totalPages = 1;
        $scope.logeado = false;
        //----------------logueado---------------------
        if (oSessionService.getUserName() !== "") {
            $scope.userlogeado = oSessionService.getUserName();
            $scope.logeado = true;
            $scope.userlogeadoid=oSessionService.getUserId();
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

        if (!$routeParams.order) {
            $scope.orderURLServidor = "";
            $scope.orderURLCliente = "";
        } else {
            $scope.orderURLServidor = "&order=" + $routeParams.order;
            $scope.orderURLCliente = $routeParams.order;
        }

        if (!$routeParams.rpp) {
            $scope.rpp = 10;
        } else {
            $scope.rpp = $routeParams.rpp;
        }

        if (!$routeParams.page) {
            $scope.page = 1;
        } else {
            if ($routeParams.page >= 1) {
                $scope.page = $routeParams.page;
            } else {
                $scope.page = 1;
            }
        }


        $scope.resetOrder = function () {
            $location.url($scope.ob +`/plistXusuario/` +$scope.id_usuario+ `/`+ $scope.rpp + `/` + $scope.page);
        }


        $scope.ordena = function (order, align) {
            if ($scope.orderURLServidor == "") {
                $scope.orderURLServidor = "&order=" + order + "," + align;
                $scope.orderURLCliente = order + "," + align;
            } else {
                $scope.orderURLServidor = $scope.orderURLServidor + "-" + order + "," + align;
                $scope.orderURLCliente = $scope.orderURLCliente + "-" + order + "," + align;
            }
            $location.url($scope.ob +`/plistXusuario/` +$scope.id_usuario+ `/`+ $scope.rpp + `/` + $scope.page + `/` + $scope.orderURLCliente);
        }
//        //---------------------get normal--------------
//        $http({
//            method: 'GET',
//            url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=getXusu&id='+$scope.id_usuario
//        }).then(function (response) {
//            $scope.status = response.status;
//            $scope.ajaxDataUsuarios= response.data.message;
//        
//           // pagination2();
//        }, function (response) {
//            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
//            $scope.status = response.status;
//        });
        //getcount
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=getcountXusu&id_usuario='+$scope.id_usuario
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataFactXusuNumber = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataFactXusuNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.update();
            }
            pagination2();
        }, function (response) {
            $scope.ajaxDataFactXusuNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob +'&op=getpageXusu&id_usuario='+$scope.id_usuario+  '&rpp=' + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataFactXusu = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataFactXusu = response.data.message || 'Request failed';
        });



        $scope.update = function () {
            $location.url($scope.ob +`/plistXusuario/` +$scope.id_usuario+ `/` +$scope.rpp + `/` + $scope.page + '/' + $scope.orderURLCliente);
        }




//        //paginacion neighbourhood
        function pagination2() {
            $scope.list2 = [];
            $scope.neighborhood = 3;
            for (var i = 1; i <= $scope.totalPages; i++) {
                if (i === $scope.page) {
                    $scope.list2.push(i);
                } else if (i <= $scope.page && i >= ($scope.page - $scope.neighborhood)) {
                    $scope.list2.push(i);
                } else if (i >= $scope.page && i <= ($scope.page - -$scope.neighborhood)) {
                    $scope.list2.push(i);
                } else if (i === ($scope.page - $scope.neighborhood) - 1) {
                    $scope.list2.push("...");
                } else if (i === ($scope.page - -$scope.neighborhood) + 1) {
                    $scope.list2.push("...");
                }
            }
        }




        $scope.isActive = toolService.isActive;



    }



]);
