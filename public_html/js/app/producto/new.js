moduleProducto.controller('productoNewController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService', '$location',
    function ($scope, $http, toolService, $routeParams, oSessionService, $location) {
        $scope.id = $routeParams.id;
        $scope.ob = "producto";

        //------------show edited-----------
        $scope.edited = false;
        $scope.obj_tipoProducto = {
            id: null,
            desc: null
        }
        $scope.createForm = function () {
           
                if ($scope.myFile == undefined) {
                    $scope.foto ="Foto.jpg";
                } else {
                    $scope.foto = guid() + $scope.myFile.name; 
                    $scope.fileNameChanged();
                } 
               
            
                var json = {
                    id: $scope.id,
                    codigo: $scope.codigo,
                    desc: $scope.desc,
                    existencias: $scope.existencias,
                    precio: $scope.precio,
                    foto: $scope.foto,
                    id_tipoProducto: $scope.obj_tipoProducto.id
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
                }, function (response) {
                    $scope.ajaxData = response.data.message || 'Request failed';
                    $scope.status = response.status;
                    $scope.creado = false;
                });


            
        };
        $scope.tipoProductoRefresh = function (f, consultar) {
            var form = f;
            if (consultar) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=get&id=' + $scope.obj_tipoProducto.id
                }).then(function (response) {
                    $scope.obj_tipoProducto = response.data.message;
                    form.userForm.obj_tipoProducto.$setValidity('valid', true);
                }, function (response) {
                    form.userForm.obj_tipoProducto.$setValidity('valid', false);
                });
            } else {
                form.userForm.obj_tipoProducto.$setValidity('valid', true);
            }
        }

        $scope.fileNameChanged = function () {
            //Solucion mas cercana
            //https://stackoverflow.com/questions/37039852/send-formdata-with-other-field-in-angular
            var file = $scope.myFile;
            file = new File([file], $scope.foto, {type: file.type});
            //Api FormData 
            //https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/FormData
            var oFormData = new FormData();
            oFormData.append('file', file);
            $http({
                headers: {'Content-Type': undefined},
                method: 'POST',
                data: oFormData,
                url: `http://localhost:8081/trolleyes/json?ob=producto&op=addimage`
            }).then(function (response) {
                console.log(response);
            }, function (response) {
                console.log(response)
            });
        }
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
   //Random generator

        function guid() {
            return "ss-s-s-s-sss".replace(/s/g, s4);
        }

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
        }



        $scope.isActive = toolService.isActive;
    }
]).directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        }
}]);