angular.module("app", ['ngRoute'])

.controller('mainController', function($rootScope){

	var vm = this;

	vm.isViewLoading = false;
	$rootScope.$on('$routeChangeStart', function() {
		vm.isViewLoading = true;
	});
	$rootScope.$on('$routeChangeSuccess', function() {
		vm.isViewLoading = false;
	});
	$rootScope.$on('$routeChangeError', function() {
		vm.isViewLoading = false;
	});
})

.controller("enigmateController", function($scope, Enigma) {

	var vm = this;

	vm.outMessage;

	vm.encrypt = function(){
		Enigma.setRotors($scope.key);
		vm.outMessage = Enigma.encrypt($scope.message);
	};

	vm.decrypt = function(){
		Enigma.setRotors($scope.key);
		vm.outMessage = Enigma.decrypt($scope.message);
	};

})

.factory("Enigma", function(){
	return {
		atRotor: 0,
		setRotors: function(s){
			this.rotorSettings = s;
		},
		encrypt: function(s){
			var message = "";
			var saveSettings = this.rotorSettings;

			for(var i = 0; i < s.length; i++){
				this.step();

				var addChar = s[i];

				for(var j = 0; j < this.rotorSettings.length; j++){
					addChar = this.rotorize(addChar);
				}

				this.atRotor = 0;

				message = message + addChar;
			}

			this.rotorSettings = saveSettings;

			return message;
		},
		rotorize: function(c){
			var givenCharCode = c.charCodeAt(0) - 32;
			var rotorCharCode = this.rotorSettings.charCodeAt(this.atRotor) - 32;

			if(givenCharCode == -20)
				return 'LF';
			this.atRotor++;

			var num = (givenCharCode + rotorCharCode + (93 * this.rotorSettings.length)) % 93 + 32;

			return String.fromCharCode(num);
		},
		step: function(){
			var newSettings = "";
			for(var i = 0; i < this.rotorSettings.length; i++){
				newSettings = newSettings + String.fromCharCode(this.rotorSettings.charCodeAt(i) + 1);
			}

			this.rotorSettings = newSettings;
		},
		decrypt: function(s){
			var message = "";
			var saveSettings = this.rotorSettings;
			this.atRotor = this.rotorSettings.length - 1;

				//get to point that rotor settings should be
				for(var i = 0; i < s.length; i++){
					this.step();
				}

				for(var i = s.length - 1; i >= 0; i--){
					var addChar = s[i];

					for(var j = this.rotorSettings.length - 1; j >= 0; j--){
						addChar = this.deRotorize(addChar);
					}
					this.atRotor = this.rotorSettings.length - 1;
					this.deStep();

					message = addChar + message;
				}

				this.rotorSettings = saveSettings;

				this.atRotor = 0;

				return message;
			},
			deRotorize: function(c){
				var givenCharCode = c.charCodeAt(0) - 32;
				var rotorCharCode = this.rotorSettings.charCodeAt(this.atRotor) - 32;

				this.atRotor--;

				var num = (givenCharCode - rotorCharCode + (93 * this.rotorSettings.length)) % 93 + 32;

				return String.fromCharCode(num);
			},
			deStep: function(){
				var newSettings = "";
				for(var i = 0; i < this.rotorSettings.length; i++){
					newSettings = newSettings + String.fromCharCode(this.rotorSettings.charCodeAt(i) - 1);
				}

				this.rotorSettings = newSettings;
			}
		}
	})

.config(function($routeProvider, $locationProvider){
	
	$routeProvider.when('/', {
		templateUrl: 'app/views/home.html',
		controller: 'enigmateController',
		controllerAs: 'enigmate'
	})

	.when('/about', {
		templateUrl: 'app/views/about.html'
	})

	.when('/how-to', {
		templateUrl: 'app/views/how-to.html'
	});


	$locationProvider.html5Mode(true);
});	