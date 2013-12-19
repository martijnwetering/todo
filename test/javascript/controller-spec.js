describe('todoCtrl', function () {
    var simpleCtrl,
        todoCtrl,
        $rootScope,
        $scope;

    beforeEach(module('myApp'));
    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        simpleCtrl = $injector.get('$controller')('simpleCtrl', {$scope: $scope});
        todoCtrl = $injector.get('$controller')('todoCtrl', {$scope: $scope});
    }));

    describe('Action handlers', function () {

        describe('Test message', function () {

            it('Should be true', function () {
                expect(true).toBe(true);
            });

            it('should be Hello', function () {
               expect(simpleCtrl.message).toBe('Hello');
            });

            it('should equal to 10', function () {
                expect(todoCtrl.message).toBe(10);
            });

        });
    });
});
