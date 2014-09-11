'use strict';

/**
 * @ngdoc function
 * @name chatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatApp
 */
angular.module('chatApp')
    .controller('ChatCtrl', function ($scope, socket) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        var wsUri = "ws://localhost:1234";

        $scope.messages = [];
        $scope.addMessage = function() {
            socket.send(
                {
                    name:$scope.name,
                    message:$scope.message
                }
            );
            $scope.message = '';
        }

        socket.message($scope);




    });
/**
 * Created by gustavo on 8/11/14.
 */
