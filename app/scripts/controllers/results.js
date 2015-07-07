'use strict';

/**
 * @ngdoc function
 * @name searchPrototypeApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the searchPrototypeApp
 */

var results = [];
angular.module('searchPrototypeApp')
    .controller('ResultsCtrl', function($scope, $rootScope, $location, $timeout, searchService, advancedSearchService, $interval, $http) {
        $scope.results = [];
        $scope.limit = 25;
        $scope.skip = 0;
        $scope.metaresults = null;
        $scope.page = 0;
        $scope.maxPage = 0;
        $scope.maxSize = 10;
        $scope.renderResults = false;

        $scope.resultArray = [];

        function buildQuery($scope) {
            var str = "";
            if ($scope.searchParam) {
                str += "(" + $scope.searchParam + ")";
            }
            return str;
        }

        $scope.submit = function(generalSearch) {
            $scope.renderResults = true;
            $rootScope.searchParam = generalSearch;
            executeSearch(buildQuery($scope));
        };

        function executeSearch(str) {
            $scope.renderResults = true;
            advancedSearchService.getAdvancedSearchResults(str).then(function(response) {
                updateResults(response);
            });
        }



        $scope.$on('$routeChangeSuccess', function(event, data) {
            $rootScope.pageTitle = data.title;
        });


        function updateResults(response) {
            if (null != response) {
                $scope.arrayObjects = response.data.results;
                var arrayObject = response.data.meta.results;
                for (var prop in arrayObject) {
                    $scope.total = arrayObject['total'];
                };
                $scope.results = response.data.results;
                $scope.limit = response.data.meta.results.limit;
                $scope.skip = response.data.meta.results.skip;
                $scope.metaresults = response.data.meta.results;
                $scope.page = (response.data.meta.results.skip / response.data.meta.results.limit) + 1;
                $scope.maxPage = Math.ceil(response.data.meta.results.total / response.data.meta.results.limit);
                $scope.results = response.data.results;
            }
        }

        $scope.get_generic_name = function(resultObject) {
                    $scope.generic_name = [];
                    angular.forEach(resultObject.patient.drug, function(value, key) {
                        angular.forEach(value.openfda, function(value1, key1) {
                            if (key1 == "generic_name") {
                                angular.forEach(value1, function(value2, key2) {
                                    if (!$scope.containsObject(value2, $scope.generic_name)) {
                                        $scope.generic_name.push(value2);
                                    }
                                });
                            }
                        });
                    });
                    return $scope.generic_name;
                }

                $scope.containsObject = function(obj, list) {
                            var i;
                            for (i = 0; i < list.length; i++) {
                                if (angular.equals(list[i], obj)) {
                                    return true;
                                }
                            }

                            return false;
                        };


        $scope.pageChanged = function(page) {
          $scope.page = page;
          $scope.nextPage = $scope.page - 1;
          $scope.skip = $scope.limit * $scope.nextPage;
          console.log($scope.skip);

            executeSearch(buildQuery($scope));
        }



     $scope.get_pharm_class_epc = function(resultObject) {
                $scope.get_pharm = [];
                angular.forEach(resultObject.patient.drug, function(value, key) {
                    angular.forEach(value.openfda, function(value1, key1) {
                        if (key1 == "pharm_class_epc") {
                            angular.forEach(value1, function(value2, key2) {
                                if (!$scope.containsObject(value2, $scope.get_pharm)) {
                                    $scope.get_pharm.push(value2);
                                }
                            });
                        }

                    });
                });
                return $scope.get_pharm;
            }


});
angular.module('searchPrototypeApp')
    .directive('onFinishRender', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    scope.$evalAsync(attr.onFinishRender);
                }
            }
        }
    });

