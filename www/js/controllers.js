angular.module('app.controllers', ['ngCordova'])

.controller('loginCtrl', function ($scope, $state, $rootScope, $http) {
  $rootScope.url = 'http://localhost:8080/api/';
  $scope.signIn = function (email) {
    $http({
    	method: 'POST',
    	url: $rootScope.url + 'parents/login/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: { email: email }
    }).then (function successCallback (response) {
        if (!response.data.message) {
          $rootScope.parent = response.data;
          $state.go('listkid');
        }
        else {
          alert (response.data.message);
        }
    }), function errorCallback (response) {
        alert("Error");
    };
  }

  $scope.signUp = function () {
    $state.go('signup');
  }

})

.controller('signupCtrl', function ($scope, $state, $ionicHistory) {
  $scope.goBack = function () {
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    $state.go('login');
  }

  $scope.signUp = function (email, name) {
  alert(email, name);
  $http({
	method: 'GET',
	url: 'http://localhost:4000/api/parents/login/' + email
    })
    .then (function successCallback (response) {

    }).then (function errorCallback (response){

    });
  }

})

.controller('listKidCtrl', function ($scope, $state, $ionicHistory, $rootScope, $http) {
  $scope.addKid = function () {
    $state.go('addkid');
  }
  $scope.listKidByParent = function () {
    $http({
      method: 'GET',
      url: $rootScope.url + 'parents/kids/' + $rootScope.parent._id
    }).then (function successCallback (response) {
      $scope.kids = response.data;
    }), function errorCallback (response) {
      alert("Error");
    };
  }
  $scope.listKidByParent();
  $scope.showKid = function (kidId) {
    $rootScope.kid = kidId;
    $state.go('home');
  }
})

.controller('addKidCtrl', function ($scope, $state, $ionicHistory) {
  $scope.goBack = function () {
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    $state.go('listkid');
  }
})

.controller('homeCtrl', function ($scope, $state, $ionicHistory, $rootScope, $http) {
  $scope.goBack = function () {
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    $state.go('listkid');
  }
  $scope.addTask = function (task) {
    $http({
        method: 'POST',
        url: $rootScope.url + 'parents/tasks/' + $rootScope.parent._id + '/' + $rootScope.kid,
        headers: {
          'Content-Type': 'application/json'
        },
        data: { 
          description: task.desc,
          time: task.time
        }
    }).then (function successCallback (response) {
      alert("Created")
    }), function errorCallback (response) {
        alert("Error");
    };
  }
})

.controller('taskCtrl', function ($scope, $state, $ionicHistory, $rootScope, $http) {
  $scope.goBack = function () {
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    $state.go('listkid');
  }
  $scope.listAllTaskByKid = function () {
    $http({
      method: 'GET',
      url: $rootScope.url + 'parents/tasks/' + $rootScope.parent._id + '/' + $rootScope.kid
    }).then (function successCallback (response) {
      $scope.tasks = response.data;
    }), function errorCallback (response) {
      alert("Error");
    };
  }
  $scope.listAllTaskByKid();})

.controller('registeredCtrl', function ($scope, $state, $ionicHistory, $rootScope, $http) {
  $scope.goBack = function () {
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    $state.go('listkid');
  }
  $scope.listRegisteredTaskByKid = function () {
    $http({
      method: 'GET',
      url: $rootScope.url + 'kids/tasks/registed/' + $rootScope.kid
    }).then (function successCallback (response) {
      $scope.registeredTasks = response.data;
    }), function errorCallback (response) {
      alert("Error");
    };
  }
  $scope.listRegisteredTaskByKid();
})

.controller('profileCtrl', function ($scope, $state, $ionicHistory, $rootScope, $http) {
  $scope.goBack = function () {
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    $state.go('listkid');
  }
  $scope.getKidProfile = function () {
    $http({
      method: 'GET',
      url: $rootScope.url + 'parents/kids/' + $rootScope.parent._id + '/' + $rootScope.kid
    }).then (function successCallback (response) {
      $scope.kid = response.data;
    }), function errorCallback (response) {
      alert("Error");
    };
  }
  $scope.getKidProfile();
  $scope.deleteKid = function () {
    $http({
      method: 'DELETE',
      url: $rootScope.url + 'parents/kids/' + $rootScope.parent._id + '/' + $rootScope.kid
    }).then (function successCallback (response) {
      alert("Delete successfully");
      $state.go("listkid");
    }), function errorCallback (response) {
      alert("Error");
    };

  }
})
