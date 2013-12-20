describe('todoCtrl', function () {
    var simpleCtrl,
        todoCtrl,
        $rootScope,
        $scope,
        mockSecurity,
        $httpBackend,
        mockTodolist;

    beforeEach(module('myApp'));
    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        simpleCtrl = $injector.get('$controller')('simpleCtrl', {$scope: $scope});
        todoCtrl = $injector.get('$controller')('todoCtrl', {$scope: $scope});
        mockSecurity = $injector.get('Security');
        mockTodolist = $injector.get('TodoList');
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', '/api/v1/todolist').respond({content: 'todo item'});
    }));

    describe('Action handlers', function () {

        describe('Initialisation', function () {

            it('should evaluate mockSecurity.currentUser.username and email to falsy', function () {
                expect(mockSecurity.currentUser.username).toBeFalsy();
                expect(mockSecurity.currentUser.email).toBeFalsy();
            });

        });

        describe('Login', function () {

            it('Should return an user', function () {
                $httpBackend.expectPOST('/api/v1/login').respond(200, {user: {username: 'martijn', email: 'martijn@mail.com'}});
                var result = mockSecurity.login();
                $httpBackend.flush();
                expect(mockSecurity.currentUser.username).toBe('martijn');
                expect(mockSecurity.currentUser.email).toBe('martijn@mail.com');
            });

        });

        describe('Todolist services', function () {

            it('should return a todolist item', function () {
                var result = mockTodolist.get();
                $httpBackend.flush();
                expect(result.content).toBe('todo item');
            });

            it('should create a new todo', function () {

            });

        });

    });
});
