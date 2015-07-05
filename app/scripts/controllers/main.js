'use strict';
/**
 * @ngdoc function
 * @name searchPrototypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the searchPrototypeApp
 */
 var results;
  angular.module('searchPrototypeApp')
    .controller('MainCtrl', function ($scope,$rootScope,$location,$http,searchService) {
      $scope.$on('$routeChangeSuccess', function (event, data) {
              $rootScope.pageTitle = data.title;

          });


    });
