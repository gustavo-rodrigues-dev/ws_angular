'use strict';

/**
 * @ngdoc overview
 * @name chatApp
 * @description
 * # chatApp
 *
 * Main module of the application.
 */
angular
  .module('chatApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  }).factory('socket', function ($rootScope) {
        var wsUri = "ws://localhost:1234";
        var socket = new WebSocket(wsUri);
        return {
            send: function (data, callback) {
                socket.send(JSON.stringify(data));
                var args = arguments;
            },
            message: function(){
                socket.onmessage = function(ev) {
                    var result = JSON.parse(ev.data); //PHP sends Json data
                    var scope = angular.element($("#messages")).scope();
                    scope.$apply(function () {
                        scope.messages.push(
                            {
                                name:result.name,
                                message:result.message
                            }
                        );

                    });

                };
            }
        };
    });
