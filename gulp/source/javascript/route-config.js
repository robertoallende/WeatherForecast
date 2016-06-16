// ROUTES
weatherApp.config(function ($routeProvider,  $locationProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'home.html',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'forecast.html',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'forecast.html',
        controller: 'forecastController'
    })
    
    .otherwise({
        redirectTo: '/'
    });

    // use the HTML5 History API
    // Following: https://scotch.io/tutorials/pretty-urls-in-angularjs-removing-the-hashtag
    $locationProvider.html5Mode(true);

});