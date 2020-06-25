(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems',FoundItems);


function FoundItems()
{
  var ddo={
    templateUrl :'foundItem.html',
    scope:{
      found : '<',
      onRemove : '&'
    },
    controller : NarrowItDownController,
    controllerAs : 'narrow',
    bindToController : true
  };

  return ddo;
}
NarrowItDownController.$inject=['MenuSearchService'];
function NarrowItDownController(MenuSearchService)
{
  var narrow = this;
  narrow.name="";
  narrow.message ='';
  narrow.found=[];
  narrow.flag=true;
  /*var promise= MenuSearchService.getMatchedMenuItems(narrow.name);

    promise.then(function(response){
      narrow.found = response;
      console.log(narrow.found);
    })
    .catch(function(response)
    {
      narrow.message=response;
      console.log(narrow.message);
    });*/
  narrow.get=function()
  {
    
    if(narrow.name==="")
    {
      narrow.flag=false;
      return;
    }
    else{
      narrow.flag=true;
    }
    var promise= MenuSearchService.getMatchedMenuItems(narrow.name);

    promise.then(function(response){
      narrow.found = response;
      console.flag=true;
    })
    .catch(function(response)
    {
      console.log(response);

    });
    
  };
  narrow.onRemove = function(index)
  {
    narrow.found.splice(index,1);
  }

}


MenuSearchService.$inject=['$http','ApiBasePath']
function MenuSearchService($http,ApiBasePath)
{
  var service = this;

  service.getMatchedMenuItems= function(arg)
  {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function(response){
        var found =[];
        for(var i =0;i<response.data.menu_items.length;i++)
        {
            //console.log(response.data[i]);
            if(response.data.menu_items[i].description.indexOf(arg)!==-1)
            {
              found.push(response.data.menu_items[i]);
            } 
        }
        //console.log(found);
        return found;
      })
      .catch(function(){
        return "Not found";
      })
  };

  
  

}



})();
