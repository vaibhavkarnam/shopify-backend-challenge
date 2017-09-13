/**
 * Created by vaibhav on 02-08-2017.
 */
(function () {

    angular
        .module("omdbApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl : 'views/details.html',
                controller  : 'searchController',
                controllerAs: 'model'
            })
    }
})();