trolleyes.config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider.when('/', {templateUrl: 'js/app/common/home.html', controller: 'homeController'});
        //-----------------------------usuario--------------------------------------------
        $routeProvider.when('/usuario/plist/:rpp?/:page?/:order?', {templateUrl:'js/app/usuario/plist.html', controller: 'usuarioPlistController'});
        $routeProvider.when('/usuario/view/:id?', {templateUrl: 'js/app/usuario/view.html', controller: 'usuarioViewController'});
        $routeProvider.when('/usuario/new', {templateUrl: 'js/app/usuario/new.html', controller: 'usuarioNewController'});
        $routeProvider.when('/usuario/edit/:id?', {templateUrl: 'js/app/usuario/edit.html', controller: 'usuarioEditController'});
        $routeProvider.when('/usuario/delete/:id?', {templateUrl: 'js/app/usuario/delete.html', controller: 'usuarioDeleteController'});
        //-----------------------------tipousuario-----------------------------------------
        $routeProvider.when('/tipousuario/plist:rpp?/:page?/:order?', {templateUrl: 'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController'});
        $routeProvider.when('/tipousuario/view/:id?', {templateUrl: 'js/app/tipousuario/view.html', controller: 'tipousuarioViewController'});
        $routeProvider.when('/tipousuario/new', {templateUrl: 'js/app/tipousuario/new.html', controller: 'tipousuarioNewController'});
        $routeProvider.when('/tipousuario/edit/:id?', {templateUrl: 'js/app/tipousuario/edit.html', controller: 'tipousuarioEditController'});
        $routeProvider.when('/tipousuario/delete/:id?', {templateUrl: 'js/app/tipousuario/delete.html', controller: 'tipousuarioDeleteController'});
        //-----------------------------factura----------------------------------------------
        $routeProvider.when('/factura/plist', {templateUrl: 'js/app/factura/plist.html', controller: 'facturaPlistController'});
        //-----------------------------tipoproducto-----------------------------------------
        $routeProvider.when('/tipoproducto/plist', {templateUrl: 'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController'});
        //-----------------------------producto---------------------------------------------
        $routeProvider.when('/producto/plist', {templateUrl: 'js/app/producto/plist.html', controller: 'productoPlistController'});
        $routeProvider.when('/producto/view/:id?', {templateUrl: 'js/app/producto/view.html', controller: 'productoViewController'});
        $routeProvider.when('/producto/edit/:id?', {templateUrl: 'js/app/producto/edit.html', controller: 'productoEditController'});
        //----------------------------------------------------------------------------------
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
