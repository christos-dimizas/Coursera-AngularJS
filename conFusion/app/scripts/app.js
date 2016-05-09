/**
 * Created by christos on 8/5/2016.
 */
'use strict';

angular.module('confusionApp', [])

    // MANY DISHES CONTROLLER WITH CATEGORY FILTER OPTION (tabs)
    .controller('MenuController', [ '$scope', function($scope) {
        $scope.filtText = '';
        $scope.tab = 1;
        $scope.showDetails = false;
        $scope.dishes=[
            {
                name:'Uthapizza',
                image: 'images/uthapizza.png',
                category: 'mains',
                label:'Hot',
                price:'4.99',
                description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
                comment: ''
            },
            {
                name:'Zucchipakoda',
                image: 'images/zucchipakoda.png',
                category: 'appetizer',
                label:'',
                price:'1.99',
                description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
                comment: ''
            },
            {
                name:'Vadonut',
                image: 'images/vadonut.png',
                category: 'appetizer',
                label:'New',
                price:'1.99',
                description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
                comment: ''
            },
            {
                name:'ElaiCheese Cake',
                image: 'images/elaicheesecake.png',
                category: 'dessert',
                label:'',
                price:'2.99',
                description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
                comment: ''
            }
        ];


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
    .controller('DishDetailController', ['$scope', function($scope) {
        $scope.inputText = "";
        var dish={
            name:'Uthapizza',
            image: 'images/uthapizza.png',
            category: 'mains',
            label:'Hot',
            price:'4.99',
            description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
            comments: [
                {
                    rating:5,
                    comment:"Imagine all the eatables, living in conFusion!",
                    author:"John Lemon",
                    date:"2012-10-16T17:57:28.556094Z"
                },
                {
                    rating:4,
                    comment:"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                    author:"Paul McVites",
                    date:"2014-09-05T17:57:28.556094Z"
                },
                {
                    rating:3,
                    comment:"Eat it, just eat it!",
                    author:"Michael Jaikishan",
                    date:"2015-02-13T17:57:28.556094Z"
                },
                {
                    rating:4,
                    comment:"Ultimate, Reaching for the stars!",
                    author:"Ringo Starry",
                    date:"2013-12-02T17:57:28.556094Z"
                },
                {
                    rating:2,
                    comment:"It's your birthday, we're gonna party!",
                    author:"25 Cent",
                    date:"2011-12-02T17:57:28.556094Z"
                }

            ]
        };

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

    // CONTACT CONTROLLER"
    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {contact:"", firstName:"", lastName:"", agree:false, email:"" };
        var contact_options = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
        $scope.contact_options = contact_options;
        $scope.invalidChannelSelection = false;
    }])

    // VALIDATOR CONTACT CONTROLLER"
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
;