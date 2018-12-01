moduleProducto.controller('productoNewController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService', '$location',
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
            $scope.userlogeadoid = oSessionService.getUserId();
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

        $scope.createForm = function () {


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
                    url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=create',
                    params: {json: JSON.stringify(json)}
                }).then(function (response) {
                    $scope.status = response.status;
                    $scope.ajaxData = response.data.message;
                    $scope.creado = true;
                    location.url('/tipousuario/new');
                }, function (response) {
                    $scope.ajaxData = response.data.message || 'Request failed';
                    $scope.status = response.status;
                    $scope.creado = false;
                });


            }
        };
        $scope.isActive = toolService.isActive;

        $scope.resetForm = function () {


            $scope.dni = "";
            $scope.nombre = "";
            $scope.ape1 = "";
            $scope.ape2 = "";
            $scope.login = "";
            $scope.pass = "";
            $scope.id_tipoUsuario = "";

        };
        $scope.isActive = toolService.isActive;
    }
]);