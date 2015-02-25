/**
 * angular-sofa-checkbox - v0.1.0 - Wed Feb 25 2015 14:42:50 GMT+0100 (CET)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
angular.module('sofa-checkbox.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('sofa-checkbox.tpl.html',
    '<div class="sofa-checkbox">\n' +
    '    <input type="checkbox" name="{{propertyName}}" ng-model="innerModel" id="sofa-check-box-{{id}}" class="sofa-checkbox__input">\n' +
    '    <label for="sofa-check-box-{{id}}" class="sofa-checkbox__label" ng-bind-html="label"></label>\n' +
    '</div>\n' +
    '');
}]);

angular.module('sofa.checkbox', [
    'sofa-checkbox.tpl.html'
])
    .directive('sofaCheckbox', function () {

        'use strict';

        var instanceCount = 0;

        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=',
                label: '=',
                value: '=',
                isRequired: '=?',
                disabled: '=?',
                propertyName: '@'
            },
            templateUrl: 'sofa-checkbox.tpl.html',
            controller: ["$scope", function ($scope) {
                return {
                    getId: function () {
                        return $scope.id;
                    }
                };
            }],
            link: function (scope) {
                instanceCount++;
                scope.id = instanceCount;

                var isArrayData = angular.isArray(scope.model);

                scope.innerModel = isArrayData ? '' : scope.model;

                // In case label comes in as a number, which doesn't work with the html parser
                scope.label = scope.label + '';

                if (isArrayData) {
                    // Changing the innerModel should change the outer model
                    scope.$watch('innerModel', function (nv, ov) {
                        if (nv !== ov) {
                            var i = scope.model.indexOf(scope.value);

                            if (nv === true && i === -1) {
                                scope.model.push(scope.value);
                            } else if (!nv && i > -1) {
                                scope.model.splice(i, 1);
                            }
                        }
                    });
                    // Changes in the outer model must be reflected in the innerModel
                    scope.$watch('model', function (nv) {
                        var i = nv.indexOf(scope.value);
                        scope.innerModel = i > -1;
                    }, true);
                } else {
                    scope.$watch('innerModel', function (nv) {
                        scope.model = nv;
                    });
                }
            }
        };
    });
}(angular));
