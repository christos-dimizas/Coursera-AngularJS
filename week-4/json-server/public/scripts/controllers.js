/**
 * Created by christos on 9/5/2016.
 */
'use strict';

angular.module('confusionApp')

    // MANY DISHES CONTROLLER WITH CATEGORY FILTER OPTION (tabs)
    .controller('MenuController', [ '$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.filtText = '';
        $scope.tab = 1;
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading...";


        // USING RESTFUL
        menuFactory.getDishes().query(
            function(response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            });


        // USING HTTP
        //$scope.dishes = {};
        //menuFactory.getDishes()
        //.then(
        //    function(response){
        //        $scope.dishes = response.data;
        //        $scope.showMenu = true;
        //    },
        //    function(response){
        //       scope.message = "Error: " + response.status + " " + response.statusText;
        //    }
        //);
        // /USING HTTP

        $scope.select = function(setTab){
            $scope.tab = setTab;

            if (setTab === 2)
                $scope.filtText = "appetizer";
            else if (setTab === 3)
                $scope.filtText = "mains";
            else if (setTab === 4)
                $scope.filtText = "dessert";
            else
                $scope.filtText = "";
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            // the below toggles the boolean showDetails variable from one value to another value
            $scope.showDetails = !$scope.showDetails;
        };
    }])

    // ONE DISH WITH 5 COMMENTS CONTROLLER
    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

        $scope.inputText = "";
        $scope.showDish = false;

        $scope.message="Loading ...";

        // USING RESTFUL
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


        // USING HTTP
        //$scope.dish = {};
        //menuFactory.getDish(parseInt($stateParams.id,10))
        //// then method is the asynchronous call back function
        //.then(
        //    function(responce){
        //        $scope.dish = responce.data;
        //        $scope.showDish=true;
        //    },
        //    function(response) {
        //        $scope.message = "Error: "+response.status + " " + response.statusText;
        //    }
        //);
        // /USING HTTP


        // order by indicator
        $scope.orderingText = "";

        // direction of order indicator (asceding by default)
        $scope.inWhichOrder = false;

        // FUNCTION THAT CONTROLS THE ORDERING BY INPUT TEXT
        $scope.textFilter = function() {
            var input = document.getElementById("inputText").value;

            // ORDER BY RATING
            if(input === "rating"){          // ascending
                $scope.orderingText = "rating";
            }else if(input === "-rating"){   // descending
                $scope.orderingText = "rating";
                $scope.inWhichOrder = true;
            }// ORDER BY DATE
            else if(input === "date"){       // ascending
                $scope.orderingText = "date";
            }else if(input === "-date"){     // descending
                $scope.orderingText = "date";
                $scope.inWhichOrder = true;
            }// ORDER BY AUTHOR
            else if(input === "author"){     // ascending
                $scope.orderingText = "author";
            }else if(input === "-author"){   // descending
                $scope.orderingText = "author";
                $scope.inWhichOrder = true;
            }else{                           // no order (display as it is)
                $scope.orderingText = "";
                $scope.inWhichOrder = false;
            }
        };  // end of textFilter function

    }])

    // CONTACT CONTROLLER
    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {contact:"", firstName:"", lastName:"", agree:false, email:"" };
        var contact_options = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
        $scope.contact_options = contact_options;
        $scope.invalidChannelSelection = false;
    }])

    // VALIDATOR CONTACT CONTROLLER
    .controller('FeedbackController', ['$scope', function($scope) {

        $scope.sendFeedback = function() {

            console.log($scope.feedback);

            // ASSIGNMENT 4 -  TASK 3 ------------------------------------//

            // find a way to pass it to the server
            // auto increment the id





            if ($scope.feedback.agree && ($scope.feedback.contact == "")&& !$scope.feedback.contact) { // the rule after && might not needed
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {contact:"", firstName:"", lastName:"", agree:false, email:"" };
                $scope.feedback.contact="";

                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])


    /*
     *
     * ASSIGNMENT 2 - CONTROLLERS
     *
     * */
    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        //Step 1: Create a JavaScript object to hold the comment from the form
        $scope.newComment = {author:"", rating:"5", comment:"", date:"" };

        $scope.submitComment = function () {
            $scope.newComment.date = new Date().toISOString();
            console.log($scope.newComment);
            $scope.dish.comments.push($scope.newComment);

            menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
            $scope.commentForm.$setPristine();
            $scope.mycomment = { author:"", rating:"5", comment:"", date:""};
        };
    }])

    /*
    *  ASSIGNMENT 3
    *
    * */

    // TASK 2 ------------------------------------//
     .controller('IndexController', ['$scope', '$stateParams',
        'menuFactory', 'corporateFactory',
            function($scope, $stateParams, menuFactory, corporateFactory) {

                //$scope.featuredDish = {}; // use with http
                $scope.showDish = false;
                $scope.message="Loading ...";

                // USING RESTFUL
                $scope.featuredDish = menuFactory.getDishes().get({id:0})
                    .$promise.then(
                    function(response){
                        $scope.featuredDish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );

                // USING HTTP
                //menuFactory.getDish(0)
                //.then(
                //    function(responce){
                //        $scope.featuredDish = responce.data;
                //        $scope.showDish = true;
                //    },
                //    function(response) {
                //        $scope.message = "Error: "+response.status + " " + response.statusText;
                //    }
                //);
                // /USING HTTP



                // ASSIGNMENT 4 -  TASK 1 ------------------------------------//
                $scope.showPromotion = false;
                $scope.promotion = menuFactory.getPromotion().get({id:0})
                    .$promise.then(
                    function(response){
                        $scope.promotion = response;
                        $scope.showPromotion = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );

                // ASSIGNMENT 4 -  TASK 2 ------------------------------------//
                $scope.showChef = false;
                $scope.chef =  corporateFactory.getLeader().get({id:0})
                    .$promise.then(
                    function(response){
                        $scope.chef = response;
                        $scope.showChef = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );


    }])
    // TASK 2 ------------------------------------//
    .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function($scope, $stateParams, corporateFactory) {

        // ASSIGNMENT 4 -  TASK 2 ------------------------------------//
        $scope.showLeadership = false;

        corporateFactory.getLeaders().query(
            function(response) {
                $scope.leaders = response;
                $scope.showLeadership = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
        });
    }])

;