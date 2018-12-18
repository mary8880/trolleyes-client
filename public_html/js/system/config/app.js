'use strict'

var trolleyes = angular.module('MyApp', [
    'ngRoute',
    'services',
    'components',
    'commonControllers',
    'tipousuarioControllers',
    'usuarioControllers',
    'tipoproductoControllers',
    'facturaControllers',
    'lineaControllers',
    'productoControllers'
]);


var moduleCommon = angular.module ('commonControllers',[]);
var moduleService = angular.module ('services',[]);
var moduleComponent = angular.module ('components',[]);
var moduleTipousuario = angular.module ('tipousuarioControllers',[]);
var moduleUsuario = angular.module ('usuarioControllers',[]);
var moduleProducto = angular.module ('productoControllers',[]);
var moduleFactura = angular.module ('facturaControllers',[]);
var moduleLinea = angular.module ('lineaControllers',[]);
var moduleTipoproducto = angular.module('tipoproductoControllers',[]);
