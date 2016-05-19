

/********************************************************************************************************/
/********************************** WEEK 2 **************************************************************/

Form validation 

/********************************** /WEEK 2 ************************************************************/





/*******************************************************************************************************/
/********************************** WEEK 3 *************************************************************/



/******** Angular Factory, Service and Dependency Injection

Continue further code refactoring by separating the controllers & services in new files,
injecting the services to the controllers and then implement the controllers to the app.js file.



/******** Angular Templates

- Directives (ng-model, ng-show, etc.)
- Markups: {{ expression }}
- Filters ()
- Form controls ()

EVERYTHING TAKES PLACE IN THE index.html file.



/******** Angular ngRoute and Single Page Applications: Objectives and Outcomes

Creates configurations which, according to the selected link/url specify which template and controller to use.

What we had to do:

1) app.js         : Add the required ngRoute configuration for all appropriate links.
2) services.js    : Add _id:[number] to every dish in order to know which one it is (should come from the server with an id number)
3) menu.html      : Add the appropriate #/menu/{{dish._id}} link to the img anchor href.
4) controllers.js : Add $routeParams (as an dependence injection) to the controller responsible for each dish,
                    and specify the $routeParams._id parameter to the dish variable.
                    IMPORTANT: THE ORDER OF THE DEPENDENCIES ADDED TO THE FUNCTION MUST BE THE SAME WITH THOSE OF THE CONTROLLER.



/********* Angular UI-Router and SPA: Objectives and Outcomes

UI-Router module supports:
 a) multiple & nested views in the same time (ng-Route module supports only one).
 b) rendering different parts of the site using the routing.

It uses states to track different views instead of routes.

Setup:

1) change app.js according to ui-router specs.
2) in any controller that requires parameters add $statePares as Dependency Injection (replace with $routeParams).
3) Major refactor of templates (separate as better as possible).

/********************************** /WEEK 3 **********************************************************/





/*****************************************************************************************************/
/********************************** WEEK 4 ***********************************************************/

/* Client-Server Communication and Angular Testing */


/********* Client-Server Communication

1) Install json-server (sudo npm install json-server -g)
2) Everything in conFusion/app moved to public folder in order to be functional with the json-server, including
   the bower_components.
3) Start the server (json-server --watch db.json)


/********* Angular $http Service

1) Open services.js to update it to retrieve data from the server. First add a constant to the Angular module as follows:
   angular.module('confusionApp')
           .constant("baseURL","http://localhost:3000/")

2) Next you will do dependency injection into the menuFactory service of the $http service and baseURL constant as follows:
    .service('menuFactory', ['$http', 'baseURL', function($http,baseURL) {
                . . .
            }])

    Make sure to put the closing ] at the end of the service function, to close the dependency array.

3) Then, you will go into the menuFactory service and delete the dishes object from there.
    You will download the dishes information from the server.
4) Next, update the two method in the menuFactory service to use the $http service as follows:
    this.getDishes = function(){
                    return $http.get(baseURL+"dishes");
                    };
    this.getDish = function (index) {
                    return $http.get(baseURL+"dishes/"+index);

                    };
5) Updating the Controllers

    I) Update the code in the MenuController to retrieve the data from the service as follows:
        $scope.dishes= [];
        menuFactory.getDishes()
        .then(
            function(response) {
                $scope.dishes = response.data;
            }
        );

    II) Similarly update the DishDetailController as follows:
        $scope.dish = {};
                    menuFactory.getDish(parseInt($stateParams.id,10))
        .then(
            function(response){
                $scope.dish = response.data;
                $scope.showDish=true;
            }
        );

    III) Also update the IndexController to retrieve the data for the dish from the server as follows:
            $scope.dish = {};
            menuFactory.getDish(0)
            .then(
                function(response){
                    $scope.dish = response.data;
                    $scope.showDish = true;
                }
            );

6) Save controllers.js and then open menu.html

7) Update the following code in menu.html as shown below to remove the _ from the id:
    <a ui-sref="app.dishdetails({id: dish.id})">

8) Save the changes in menu.html and then view the web page in the browser.


/********* Handling Errors in Client-Server Communication using $http

1) Open controllers.js to update the code to handle errors. Update the code in the MenuController as follows:

    $scope.showMenu = false;
    $scope.message = "Loading ...";
                $scope.dishes= {};
                menuFactory.getDishes()
    .then(
        function(response) {
            $scope.dishes = response.data;
            $scope.showMenu = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );

2) Now, open menu.html and update the code as follows:

    <div class="row row-content" ng-controller="MenuController">
        <div class="col-xs-12" ng-if="!showMenu">
            <h3>{{message}}</h3>
        </div>
        <div class="col-xs-12" ng-if="showMenu">

    Note the use of the ngIf directive in order to add/delete the div from the DOM.

3) Next, update DishDetailController in controllers.js as follows:

    $scope.dish = {};
    $scope.showDish = false;
    $scope.message="Loading ...";
                menuFactory.getDish(parseInt($stateParams.id,10))
    .then(
        function(response){
            $scope.dish = response.data;
            $scope.showDish=true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );

4) Also, update IndexController as follows:

    $scope.dish = {};
    $scope.showDish = false;
    $scope.message="Loading ...";

    menuFactory.getDish(0)
    .then(
        function(response){
            $scope.dish = response.data;
            $scope.showDish = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );

5) Then, update the dishdetail.html as follows:

    <div class="row row-content" ng-controller="DishDetailController">
        <div class="col-xs-12" ng-if="!showDish">
            <h3>{{message}}</h3>
        </div>
        <div class="col-xs-12" ng-if="showDish">

6) Also update home.html as follows:

    <div class="col-xs-12 col-sm-9 col-sm-pull-3">
        <div ng-if="!showDish">
            <h3>{{message}}</h3>
        </div>
        <div class="media" ng-if="showDish">

    Save all the changes and then have a look at the web page.


/********* RESTful Services and Angular $resource

1) First, you will install the Angular ngResource module in your conFusion project by typing the following
    at the command prompt when you are in the conFusion folder:

    bower install angular-resource -S

2) Remember to add angular-resource.min.js to the index.html file by including the following in the scripts
    section of the page, right after including angular-ui-router:

    <script src="../bower_components/angular-resource/angular-resource.min.js"></script>

3) Inject the ngResource module into the Angular module by updating the angular.module() in app.js as follows:

    angular.module('confusionApp', ['ui.router','ngResource'])

4) Next, open services.js and update the code in menuFactory as follows to use Angular $resource:

    .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {

5) Then update the getDishes() function as follows:
    this.getDishes = function(){
        return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
    };

6) Delete the getDish(index) function as we no longer need it. Save services.js.

7) Open controllers.js and update the code in MenuController as follows:
       $scope.showMenu = true;
       $scope.message = "Loading ...";
                   $scope.dishes = menuFactory.getDishes().query();

8) Similarly update the DishDetailController as follows:
       $scope.showDish = true;
       $scope.message="Loading ...";
                   $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)});

9) Finally, update the code in IndexController as follows:
       $scope.showDish = true;
       $scope.message="Loading ...";
       $scope.dish = menuFactory.getDishes().get({id:0});
10) Save the changes and have a look at the web application in the browser.

/******* Handling Errors

1) Open controllers.js and update the MenuController as follows:

    $scope.showMenu = false;
    $scope.message = "Loading ...";
                menuFactory.getDishes().query(
        function(response) {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        });
2) Similarly update the DishDetailController as follows:

    $scope.showDish = false;
    $scope.message="Loading ...";
                $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
    .$promise.then(
                    function(response){
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
    );

3) Finally update the IndexController as follows:

   $scope.showDish = false;
   $scope.message="Loading ...";
   $scope.dish = menuFactory.getDishes().get({id:0})
   .$promise.then(
       function(response){
           $scope.dish = response;
           $scope.showDish = true;
       },
       function(response) {
           $scope.message = "Error: "+response.status + " " + response.statusText;
       }
   );

4) Now you will update the DishCommentController as follows in order to submit the user's comments
    about a dish to the server. Inject the menuFactory to the DishCommentController:

   .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {

5) Also, update the submitComment() function as follows:

   $scope.submitComment = function () {
                       $scope.mycomment.date = new Date().toISOString();
       console.log($scope.mycomment);
                       $scope.dish.comments.push($scope.mycomment);

       menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                       $scope.commentForm.$setPristine();
                       $scope.mycomment = {rating:5, comment:"", author:"", date:""};
   }

6) Save the changes and see the updated web application.


/********************************** /WEEK 4 *********************************************************/
