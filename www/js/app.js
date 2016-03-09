(function(){
var app = angular.module("app", ["onsen"]);
 

 
app.controller('contacts', ['$scope', 'ContactsFactory', function($scope,ContactsFactory)
{
	 $scope.items = {};


    $scope.findContact = function (contactSearch) 
    {
        ContactsFactory.find(contactSearch).then(function(contacts) 
        {
		     
            $arr = [];
            for (var i = 0; i < contacts.length; i++)
            {
                if (contacts[i].displayName !== null)
                { 
                    for (var j = 0; j < contacts[i].displayName.length; j++)
                    {
                       
                        $arr.push({name: contacts[i].displayName})
                    }
                }
            }
            $scope.contacts = $arr;
        });
    };
	 $scope.items =  $scope.contacts;
    $scope.showDetail = function(index) {
	alert(index);
      var selectedItem = $scope.contacts[index];
      $scope.selectedItem = selectedItem;
      $scope.navi.pushPage('detail.html', {title : selectedItem.name});
    };
 
}]);
   app.controller('DetailController', function($scope) {
    $scope.item = $scope.selectedItem;
  });

 

app.factory("ContactsFactory", ['$q', function($q)
{
    return {
        find: function(filter) 
        {
            //promesas
            var deferred = $q.defer();
            //opciones de contactos
            var options = new ContactFindOptions();
            //añadimos los filtros de búsqueda
            options.filter = filter;
            options.multiple = true;
            //campos que queremos obtener
            var fields = ["displayName"];
            //acepta tres parámetros, los campos, la respuesta, el error y las opciones
            navigator.contacts.find(fields, function (contacts) 
            {
                deferred.resolve(contacts);
            }, 
            function(error) 
            {
                deferred.reject(error);
            }, 
            options);
            return deferred.promise;
        }
    };
}]);
})();

