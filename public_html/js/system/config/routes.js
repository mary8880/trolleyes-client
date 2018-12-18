trolleyes.config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider.when('/', {templateUrl: 'js/app/common/home.html', controller: 'homeController'});
        $routeProvider.when('/login', {templateUrl: 'js/app/common/login.html', controller: 'loginController'});
        //-----------------------------usuario--------------------------------------------
        $routeProvider.when('/usuario/plist/:rpp?/:page?/:order?', {templateUrl:'js/app/usuario/plist.html', controller: 'usuarioPlistController'});
        $routeProvider.when('/usuario/view/:id?', {templateUrl: 'js/app/usuario/view.html', controller: 'usuarioViewController'});
        $routeProvider.when('/usuario/new', {templateUrl: 'js/app/usuario/new.html', controller: 'usuarioNewController'});
        $routeProvider.when('/usuario/edit/:id?', {templateUrl: 'js/app/usuario/edit.html', controller: 'usuarioEditController'});
        $routeProvider.when('/usuario/delete/:id?', {templateUrl: 'js/app/usuario/delete.html', controller: 'usuarioDeleteController'});
       
        //-----------------------------tipousuario-----------------------------------------
        $routeProvider.when('/tipousuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController'});
        $routeProvider.when('/tipousuario/view/:id?', {templateUrl: 'js/app/tipousuario/view.html', controller: 'tipousuarioViewController'});
        $routeProvider.when('/tipousuario/new', {templateUrl: 'js/app/tipousuario/new.html', controller: 'tipousuarioNewController'});
        $routeProvider.when('/tipousuario/edit/:id?', {templateUrl: 'js/app/tipousuario/edit.html', controller: 'tipousuarioEditController'});
        $routeProvider.when('/tipousuario/delete/:id?', {templateUrl: 'js/app/tipousuario/delete.html', controller: 'tipousuarioDeleteController'});
        //-----------------------------factura----------------------------------------------
        $routeProvider.when('/factura/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plist.html', controller: 'facturaPlistController'});
        $routeProvider.when('/factura/plistXusuario/:id?/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plistXusuario.html', controller: 'facturaPlistXusuarioController'});
        $routeProvider.when('/factura/view/:id?', {templateUrl: 'js/app/factura/view.html', controller: 'facturaViewController'});
        $routeProvider.when('/factura/new/:id?', {templateUrl: 'js/app/factura/new.html', controller: 'facturaNewController'});
        $routeProvider.when('/factura/edit/:id?', {templateUrl: 'js/app/factura/edit.html', controller: 'facturaEditController'});
        $routeProvider.when('/factura/delete/:id?', {templateUrl: 'js/app/factura/delete.html', controller: 'facturaDeleteController'});
        //-----------------------------tipoproducto-----------------------------------------
        $routeProvider.when('/tipoproducto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController'});
        $routeProvider.when('/tipoproducto/view/:id?', {templateUrl: 'js/app/tipoproducto/view.html', controller: 'tipoproductoViewController'});
        $routeProvider.when('/tipoproducto/new', {templateUrl: 'js/app/tipoproducto/new.html', controller: 'tipoproductoNewController'});
        $routeProvider.when('/tipoproducto/edit/:id?', {templateUrl: 'js/app/tipoproducto/edit.html', controller: 'tipoproductoEditController'});
        $routeProvider.when('/tipoproducto/delete/:id?', {templateUrl: 'js/app/tipoproducto/delete.html', controller: 'tipoproductoDeleteController'});
        //-----------------------------producto---------------------------------------------
        $routeProvider.when('/producto/plist/:rpp?/:page?/:order?/', {templateUrl: 'js/app/producto/plist.html', controller: 'productoPlistController'});
        $routeProvider.when('/producto/view/:id?', {templateUrl: 'js/app/producto/view.html', controller: 'productoViewController'});
        $routeProvider.when('/producto/new/:id?', {templateUrl: 'js/app/producto/new.html', controller: 'productoNewController'});
        $routeProvider.when('/producto/edit/:id?', {templateUrl: 'js/app/producto/edit.html', controller: 'productoEditController'});
        $routeProvider.when('/producto/delete/:id?', {templateUrl: 'js/app/producto/delete.html', controller: 'productoDeleteController'});
        $routeProvider.when('/producto/tienda/:id?', {templateUrl: 'js/app/producto/tienda.html', controller: 'productoTiendaController'});
        //-----------------------------linea---------------------------------------------
        $routeProvider.when('/factura/:id/linea/plist', {templateUrl: 'js/app/linea/plist.html', controller: 'lineaPlistController'});
        $routeProvider.when('/factura/:id/linea/new', {templateUrl: 'js/app/linea/new.html', controller: 'lineaNewController'});
        $routeProvider.when('/linea/view/:id', {templateUrl: 'js/app/linea/view.html', controller: 'lineaViewController'});
        $routeProvider.when('/linea/edit/:id', {templateUrl: 'js/app/linea/edit.html', controller: 'lineaEditController'});
        $routeProvider.when('/linea/delete/:id', {templateUrl: 'js/app/linea/delete.html', controller: 'lineaDeleteController'});
        $routeProvider.when('/factura/:id/linea/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/linea/plist.html', controller: 'lineaPlistController'});

        
       $routeProvider.when('/carrito/show', {templateUrl: 'js/app/carrito/show.html', controller: 'productoShowController'}); 
        
        //----------------------------------------------------------------------------------
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
