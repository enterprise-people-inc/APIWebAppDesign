'use strict';

/**
 * @ngdoc overview
 * @name searchPrototypeApp
 * @description
 * # searchPrototypeApp
 *
 * Main module of the application.
 */
angular
  .module('searchPrototypeApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'angular-spinkit'
  ])
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'AboutCtrl',
         title: 'Enterprise People GSA Prototype'
      })
      .when('', {
              templateUrl: 'views/about.html',
              controller: 'AboutCtrl',
              title: 'Enterprise People GSA Prototype'
            })
      .when('/main/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        title: 'Enterprise People GSA Prototype Search'
      })
      .when('/faq', {
                    templateUrl: 'views/faq.html',
                    controller: 'FaqCtrl',
                    title: 'FAQ'
                  })
      .when('/contact', {
              templateUrl: 'views/contact.html',
              controller: 'ContactCtrl',
              title: 'Enterprise People GSA Prototype Contact Information'
            })
      .when('/results/', {
              templateUrl: 'views/results.html',
              controller: 'ResultsCtrl',
              title: 'Enterprise People GSA Prototype Search Results'
            })
        .when('/404/', {
                      templateUrl: 'views/404.html',
                      title: 'No Results'
                    })
      .otherwise({
         templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                title: 'Enterprise People GSA Prototype'
      });
  });