var repoSearchMopdule = angular.module("Github", ["ui.router", "angularSpinner"])
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) { return new App.Routes().configue($stateProvider, $urlRouterProvider); }])
    .service("RepoSearchService", ["$http", "$q", function ($http, $q) { return new App.RepoSearch.Services.RepoSearchService($http, $q); }])
    .service("RepoIssuesService", ["$http", "$q", function ($http, $q) { return new App.RepoIssues.Services.RepoIssuesService($http, $q); }])
    .controller("GithubController", ["$state", "usSpinnerService", function ($state, spinner) { return new App.Controllers.GithubController($state, spinner); }])
    .controller("RepoSearchController", ["RepoSearchService", "$state", "usSpinnerService", function (repoSearchService, $state, spinner) { return new App.RepoSearch.Controllers.RepoSearchController(repoSearchService, $state, spinner); }])
    .controller("RepoIssuesController", ["RepoIssuesService", "$state", "usSpinnerService", function (repoIssuesService, $state, spinner) { return new App.RepoIssues.Controllers.RepoIssuesController(repoIssuesService, $state, spinner); }])
    .directive("tooltipHoverDirective", ["$timeout", function ($timeout) { return App.RepoSearch.Directives.ToolTipHover.factory($timeout); }]);
//# sourceMappingURL=github-app.js.map