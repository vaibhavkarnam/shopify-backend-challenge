(function () {
    angular
        .module('omdbApp')
        .controller('searchController', searchController);

    function searchController(shopifyService){
        var model = this;

        function init() {
            shopifyService
                .getCustomers()
                .then(renderResult);
        }
        init();

        function renderResult(json) {
            var obj = [];
            var result = {
                invalid_customers : []
            };
            for (var i = 0; i < json.length; i++) {
                obj.push(json[i].customers);
            }

            for (var j = 0; i < obj.length; j++) {
                    result.push(obj[j]);
        }
            var merged = [].concat.apply([], obj);

            for (var k = 0; k < merged.length; k++) {
                 if(merged[k].name === null || merged[k].name === undefined ||
                     typeof merged[k].name !== "string" || merged[k].name.length < 5){
                     var name =  result.invalid_customers.some(function (el) {
                         if (el.id === merged[k].id) {
                             el.invalid_fields.push("name");
                             return el;
                         }
                     });
                     if(!name)
                     {
                         result.invalid_customers.push({ id: merged[k].id, invalid_fields : ["name"] });
                     }

                 }
                if(merged[k].email === null || merged[k].email === undefined){
                       var email =  result.invalid_customers.some(function (el) {
                           if (el.id === merged[k].id) {
                               el.invalid_fields.push("email");
                               return el;
                           }
                       });
                            if(!email)
                            {
                                result.invalid_customers.push({ id: merged[k].id, invalid_fields : ["email"] });
                            }
                }
                if(typeof merged[k].age !== "number"){
                    var age =  result.invalid_customers.some(function (el) {
                        if (el.id === merged[k].id) {
                            el.invalid_fields.push("age");
                            return el;
                        }
                    });
                    if(!age)
                    {
                        result.invalid_customers.push({ id: merged[k].id, invalid_fields : ["age"] });
                    }
                }
                if(merged[k].newsletter === null || typeof merged[k].newsletter !== "boolean"){
                    var newsletter =  result.invalid_customers.some(function (el) {
                        if (el.id === merged[k].id) {
                            el.invalid_fields.push("newsletter");
                            return el;
                        }
                    });
                    if(!newsletter)
                    {
                        result.invalid_customers.push({ id: merged[k].id, invalid_fields : ["newsletter"] });
                    }
                }
            }
            model.movie = result;
            model.data = obj;
        }
    }
})();

