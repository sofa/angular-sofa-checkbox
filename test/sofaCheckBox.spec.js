'use strict';

describe('sofa.checkbox', function () {

    var element, $compile, $rootScope;

    beforeEach(module('sofa.checkbox', function($sceProvider) {
        $sceProvider.enabled(false);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should render correctly', function () {
        $rootScope.label = 'test';
        element = $compile('<sofa-checkbox label="label"></sofa-checkbox>')($rootScope);
        $rootScope.$digest();
        expect(element.find('label').text().trim()).toEqual('test');
    });
    
    it('should flip a boolean model when clicked', function() {
        $rootScope.label = 'test';
        $rootScope.model = false;
        element = $compile('<sofa-checkbox model="model" label="label"></sofa-checkbox>')($rootScope);
        $rootScope.$digest();
        element.find('input')[0].checked = true;
        element.find('input').triggerHandler('click');
        expect($rootScope.model).toEqual(true);
    });

    it('should push into the model, when the model is an array', function() {
        $rootScope.label = 'test';
        $rootScope.model = [];
        $rootScope.value = 't';
        element = $compile('<sofa-checkbox model="model" label="label" value="value"></sofa-checkbox>')($rootScope);
        $rootScope.$digest();
        element.find('input')[0].checked = true;
        element.find('input').triggerHandler('click');
        expect($rootScope.model).toEqual(['t']);
    });
});
