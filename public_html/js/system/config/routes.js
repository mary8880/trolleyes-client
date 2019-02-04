var autenticacionAdministrador = function ($q, $location, $http, sessionService) {
    var deferred = $q.defer();

    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
    }).then(function (response) {
        if (response.data.status == 200) {
            if (response.data.message.obj_tipoUsuario.id == 1) { // 1 = ADMINISTRADOR
                sessionService.setSessionActive;
                sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
                sessionService.setUserId(response.data.message.id);
                sessionService.setAdmin();
                deferred.resolve(response.data.message);
                sessionService.setSessionActive(sessionService.getUserName(), sessionService.getUserId());

            } else {
                sessionService.setUser();
                $location.path('/home');
            }
        } else {
            sessionService.setUser();
            $location.path('/home');
        }
    }, function (response) {
        sessionService.setUser();
        $location.path('/home');
    });

    return deferred.promise;
}

var autenticacionUsuario = function ($q, $location, $http, sessionService) {
    var deferred = $q.defer();

    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
    }).then(function (response) {
        if (response.data.status == 200) {

            if (response.data.message.obj_tipoUsuario.id == 2) { // 1 = ADMINISTRADOR
                sessionService.setSessionActive;
                sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
                sessionService.setUserId(response.data.message.id);
                sessionService.setUser();
                deferred.resolve(response.data.message);
                sessionService.setSessionActive(sessionService.getUserName(), sessionService.getUserId());

            } else {
                $location.path('/home');
            }
        } else {
            $location.path('/home');
        }
    }, function (response) {
        $location.path('/home');
    });

    return deferred.promise;
}

var autenticacionCualquiera = function ($q, $location, $http, sessionService) {
    var deferred = $q.defer();

    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
    }).then(function (response) {
        if (response.data.status == 200) {
            if (response.data.message.obj_tipoUsuario.id == 1 || response.data.message.obj_tipoUsuario.id == 2) { // 1 = ADMINISTRADOR
                sessionService.setSessionActive;
                sessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
                sessionService.setUserId(response.data.message.id);
                
                deferred.resolve(response.data.message);
                sessionService.setSessionActive(sessionService.getUserName(), sessionService.getUserId());
                if (response.data.message.obj_tipoUsuario.id == 1 ){
                 sessionService.setAdmin();   
                }else{
                 sessionService.setUser();   
                }
            } else {
                sessionService.setUser();
                $location.path('/home');
            }
        } else {
            sessionService.setUser();
            $location.path('/home');
        }
    }, function (response) {
        sessionService.setUser();
        $location.path('/home');
    });

    return deferred.promise;
}

trolleyes.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/home', {templateUrl: 'js/app/common/home.html', controller: 'homeController'});
        $routeProvider.when('/login', {templateUrl: 'js/app/common/login.html', controller: 'loginController'});
        //-----------------------------usuario--------------------------------------------
        $routeProvider.when('/usuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/view/:id?', {templateUrl: 'js/app/usuario/view.html', controller: 'usuarioViewController', resolve: {auth: autenticacionCualquiera}});
        $routeProvider.when('/usuario/new', {templateUrl: 'js/app/usuario/new.html', controller: 'usuarioNewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/edit/:id?', {templateUrl: 'js/app/usuario/edit.html', controller: 'usuarioEditController', resolve: {auth: autenticacionCualquiera}});
        $routeProvider.when('/usuario/delete/:id?', {templateUrl: 'js/app/usuario/delete.html', controller: 'usuarioDeleteController', resolve: {auth: autenticacionAdministrador}});

        //-----------------------------tipousuario-----------------------------------------
        $routeProvider.when('/tipousuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/view/:id?', {templateUrl: 'js/app/tipousuario/view.html', controller: 'tipousuarioViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/new', {templateUrl: 'js/app/tipousuario/new.html', controller: 'tipousuarioNewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/edit/:id?', {templateUrl: 'js/app/tipousuario/edit.html', controller: 'tipousuarioEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/delete/:id?', {templateUrl: 'js/app/tipousuario/delete.html', controller: 'tipousuarioDeleteController', resolve: {auth: autenticacionAdministrador}});
        //-----------------------------factura----------------------------------------------
        $routeProvider.when('/factura/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plist.html', controller: 'facturaPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/plistXusuario/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plistXusuario.html', controller: 'facturaPlistXusuarioController'});
        $routeProvider.when('/factura/view/:id?', {templateUrl: 'js/app/factura/view.html', controller: 'facturaViewController', resolve: {auth: autenticacionCualquiera}});
        $routeProvider.when('/factura/new/:id?', {templateUrl: 'js/app/factura/new.html', controller: 'facturaNewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/edit/:id?', {templateUrl: 'js/app/factura/edit.html', controller: 'facturaEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/delete/:id?', {templateUrl: 'js/app/factura/delete.html', controller: 'facturaDeleteController', resolve: {auth: autenticacionAdministrador}});
        //-----------------------------tipoproducto-----------------------------------------
        $routeProvider.when('/tipoproducto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/view/:id?', {templateUrl: 'js/app/tipoproducto/view.html', controller: 'tipoproductoViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/new', {templateUrl: 'js/app/tipoproducto/new.html', controller: 'tipoproductoNewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/edit/:id?', {templateUrl: 'js/app/tipoproducto/edit.html', controller: 'tipoproductoEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/delete/:id?', {templateUrl: 'js/app/tipoproducto/delete.html', controller: 'tipoproductoDeleteController', resolve: {auth: autenticacionAdministrador}});
        //-----------------------------producto---------------------------------------------
        $routeProvider.when('/producto/plist/:rpp?/:page?/:order?/', {templateUrl: 'js/app/producto/plist.html', controller: 'productoPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/view/:id?', {templateUrl: 'js/app/producto/view.html', controller: 'productoViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/new/:id?', {templateUrl: 'js/app/producto/new.html', controller: 'productoNewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/edit/:id?', {templateUrl: 'js/app/producto/edit.html', controller: 'productoEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/delete/:id?', {templateUrl: 'js/app/producto/delete.html', controller: 'productoDeleteController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/tienda/:id?', {templateUrl: 'js/app/producto/tienda.html', controller: 'productoTiendaController', resolve: {auth: autenticacionUsuario}});
        //-----------------------------linea---------------------------------------------
        $routeProvider.when('/factura/:id/linea/plist', {templateUrl: 'js/app/linea/plist.html', controller: 'lineaPlistController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/:id/linea/new', {templateUrl: 'js/app/linea/new.html', controller: 'lineaNewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/linea/view/:id', {templateUrl: 'js/app/linea/view.html', controller: 'lineaViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/linea/edit/:id', {templateUrl: 'js/app/linea/edit.html', controller: 'lineaEditController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/linea/delete/:id', {templateUrl: 'js/app/linea/delete.html', controller: 'lineaDeleteController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/factura/:id/linea/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/linea/plist.html', controller: 'lineaPlistController', resolve: {auth: autenticacionAdministrador}});


        $routeProvider.when('/carrito/show', {templateUrl: 'js/app/carrito/show.html', controller: 'productoShowController', resolve: {auth: autenticacionUsuario}});
        $routeProvider.when('/carrito/buy', {templateUrl: 'js/app/carrito/buy.html', controller: 'productoBuyController', resolve: {auth: autenticacionUsuario}});
        //----------------------------------------------------------------------------------
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);
