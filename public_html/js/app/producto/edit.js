'use strict'

moduleProducto.controller('productoEditController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService', '$location',
    function ($scope, $http, toolService, $routeParams, oSessionService, $location) {
        $scope.id = $routeParams.id;
        $scope.ob = "producto";
        $scope.logeado = false;
        //------------show edited-----------
        $scope.edited = false;

        //----------------logueado---------------------
        if (oSessionService.getUserName() !== "") {
            $scope.userlogeado = oSessionService.getUserName();
            $scope.logeado = true;
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
        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            console.log(response);
            $scope.id = response.data.message.id;
            $scope.codigo = response.data.message.codigo;
            $scope.desc = response.data.message.desc;
            $scope.existencias = response.data.message.existencias;
            $scope.precio = response.data.message.precio;
            $scope.foto = response.data.message.foto;
            $scope.id_tipoProducto = response.data.message.id_tipoProducto;
        }), function (response) {
            console.log(response);
        };
        $scope.isActive = toolService.isActive;

        $scope.updateForm = function () {
//            if ($scope.pass!==""){
//                
//                
//            }

            if ($scope.userForm.$valid) {

                var json = {
                    id: $scope.id,
                    codigo: $scope.codigo,
                    desc: $scope.desc,
                    existencias: $scope.existencias,
                    precio: $scope.precio,
                    foto: $scope.foto,
                    id_tipoProducto: $scope.id_tipoProducto
                }

                $http({
                    method: 'GET',
                    header: {'Content-Type': 'application/json;charset=utf-8'},
                    url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=update',
                    params: {json: JSON.stringify(json)}
                }).then(function (data, response) {
                    console.log(data, response);
                    $scope.edited = true;
                    location.url('/producto/edit');
                }, function (response) {
                    console.log(response);
                    $scope.edited = false;
                });

            }
        };
        $scope.isActive = toolService.isActive;

        $scope.resetForm = function () {
            $http({
                method: 'GET',
                //withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
            }).then(function (response) {
                console.log(response);
                $scope.id = response.data.message.id;
                $scope.codigo = response.data.message.codigo;
                $scope.desc = response.data.message.desc;
                $scope.existencias = response.data.message.existencias;
                $scope.precio = response.data.message.precio;
                $scope.foto = response.data.message.foto;
                $scope.id_tipoProducto = response.data.message.id_tipoProducto;

            }), function (response) {
                console.log(response);

            };

        };
        $scope.isActive = toolService.isActive;



    }
]);