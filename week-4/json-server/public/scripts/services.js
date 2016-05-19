/**
 * Created by christos on 9/5/2016.
 */

'use strict';

angular.module('confusionApp')

    .constant("baseURL","http://localhost:3000/")

    .service('menuFactory',['$resource', 'baseURL', function($resource, baseURL) {

        var promotions = [
            {
                _id:0,
                name:'Weekend Grand Buffet',
                image: 'images/buffet.png',
                label:'New',
                price:'19.99',
                description:'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person '
            }

        ];

        this.getDishes = function(){
            return $resource(baseURL+"dishes/:id", null, {'update':{method:'PUT'}});
        };

        // ASSIGNMENT 4 -  TASK 1 ------------------------------------//
        this.getPromotion = function () {
            return $resource(baseURL+"promotions/:id");
        };


    }])

    .factory('corporateFactory',['$resource', 'baseURL', function($resource, baseURL) {

        var corpfac = {};

        // ASSIGNMENT 4 -  TASK 2 ------------------------------------//
        corpfac.getLeader = function(){
            return $resource(baseURL+"leadership/:id");
        };

        corpfac.getLeaders = function(){
            return $resource(baseURL+"leadership/");
        };

        return corpfac;

    }])

    // ASSIGNMENT 4 -  TASK 3 ------------------------------------//
    .factory('feedbackFactory',['$resource', 'baseURL', function($resource, baseURL) {

        var feedback = {};

        feedback.getFeedback = function(){
            return $resource(baseURL+"feedback/:id", null, {'save':{method:'POST'}});
        };

        return feedback;

    }])

;