﻿var repoSearchMopdule: ng.IModule = angular.module("Github", ["ui.router", "angularSpinner"])
    .config(["$stateProvider", "$urlRouterProvider", 
        ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => 
            new App.Routes().configue($stateProvider, $urlRouterProvider)])
    .service("RepoSearchService", ["$http", "$q", 
        ($http: ng.IHttpService, $q: ng.IQService) => 
            new App.RepoSearch.Services.RepoSearchService($http, $q)])
    .service("RepoIssuesService", ["$http", "$q", ($http: ng.IHttpService, $q: ng.IQService) => 
        new App.RepoIssues.Services.RepoIssuesService($http, $q)])
    .controller("GithubController", ["$state", "usSpinnerService", 
        ($state: angular.ui.IStateService, spinner: ISpinnerService) => 
            new App.Controllers.GithubController($state, spinner)])
    .controller("RepoSearchController", ["RepoSearchService", "$state", "usSpinnerService", 
        (repoSearchService: App.RepoSearch.Services.IRepoSearchService, $state: angular.ui.IStateService, spinner: ISpinnerService) => 
            new App.RepoSearch.Controllers.RepoSearchController(repoSearchService, $state, spinner)])
    .controller("RepoIssuesController", ["RepoIssuesService", "$state", "usSpinnerService", 
        (repoIssuesService: App.RepoIssues.Services.IRepoIssuesService, $state: angular.ui.IStateService, spinner: ISpinnerService) => 
            new App.RepoIssues.Controllers.RepoIssuesController(repoIssuesService, $state, spinner)])
    .directive("tooltipHoverDirective", ["$timeout", 
        ($timeout) => 
            App.RepoSearch.Directives.ToolTipHover.factory($timeout)]);  