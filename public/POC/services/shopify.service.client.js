(function () {
    angular
        .module('omdbApp')
        .factory('shopifyService', shopifyService);

    function shopifyService($http) {
        var api ={
            getCustomers : getCustomers
        };

        return api;

        function getCustomers() {
            var url = "/api/shopify/id";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();

