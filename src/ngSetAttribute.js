(function () {
	var module;
	try {
		module = angular.module("heminei.lib.directives");
	} catch (e) {
		module = angular.module("heminei.lib.directives", []);
	}

	var directiveName = 'ngSetAttribute';
	module.directive(directiveName, function () {
		return {
			restrict: 'A',
			controller: [
				"$scope",
				"$element",
				"$attrs",
				function ($scope, $element, $attrs) {
					var updateAttrs = function (json) {
						for (var key in json) {
							var expression = true;
							var value;
							if (angular.isArray(json[key])) {
								value = json[key][0];
								if (angular.isDefined(json[key][1])) {
									expression = json[key][1];
								}
							} else {
								value = json[key];
							}
							if (expression) {
								$element.attr(key, value);
							} else {
								$element.removeAttr(key);
							}
						}
					};

					updateAttrs($scope.$eval($attrs[directiveName]));

					$scope.$watch($attrs[directiveName], function (newVal, oldVal) {
						updateAttrs(newVal);
					}, true);
				}
			]
		};
	});
})();