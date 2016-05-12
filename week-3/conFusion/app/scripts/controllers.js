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

        $scope.dishes = menuFactory.getDishes();

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

        var dish = menuFactory.getDish(parseInt($stateParams.id,10));
        //
        $scope.dish = dish;

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
    .controller('DishCommentController', ['$scope', function($scope) {

        //Step 1: Create a JavaScript object to hold the comment from the form
        $scope.newComment = {name:"", rating:"5", text_comment:"", date:"" };
        var newComment = $scope.newComment;

        $scope.submitComment = function () {

            //Step 2: This is how you record the date
            newComment.date = new Date().toISOString();

            // Step 3: Push your comment into the dish's comment array
            $scope.dish.comments.push(
                {   rating:newComment.rating,
                    comment:newComment.text_comment,
                    author:newComment.name,
                    date:newComment.date
                }
            );

            console.log(newComment);

            //Step 4: reset your form to pristine
            $scope.commentForm.$setPristine();
            //Step 5: reset your JavaScript object that holds your comment
            $scope.newComment = {name:"", rating:"5", text_comment:"", date:"" };

        }
    }])

    /*
    *  ASSIGNMENT 3
    *
    *  TODO: implement the IndexController
    * */

    // TASK 2 ------------------------------------//
     .controller('IndexController', ['$scope', '$stateParams',
        'menuFactory', 'corporateFactory',
            function($scope, $stateParams, menuFactory, corporateFactory) {

                //$scope.featuredDish = menuFactory.getDish(parseInt($stateParams.id,10));
                //$scope.promotion = menuFactory.getPromotion(parseInt($stateParams.id,10));
                //$scope.chef =  corporateFactory.getLeader(parseInt($stateParams.id,10));

                $scope.featuredDish = menuFactory.getDish(0);
                $scope.promotion = menuFactory.getPromotion(0);
                $scope.chef =  corporateFactory.getLeader(0);


    }])
    // TASK 2 ------------------------------------//
    .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function($scope, $stateParams, corporateFactory) {
        $scope.leaders = corporateFactory.getLeaders();

    }])

;