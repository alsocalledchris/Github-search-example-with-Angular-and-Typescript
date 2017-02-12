var App;
(function (App) {
    var Routes = (function () {
        function Routes() {
        }
        Routes.prototype.configue = function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state("app", {
                url: "/",
                controller: "GithubController",
                controllerAs: "g",
                templateUrl: "app/github-tpl.html"
            });
            $stateProvider.state("app.search", {
                url: "search/:query",
                controller: "RepoSearchController",
                controllerAs: "s",
                templateUrl: "app/repo-search/repo-search-tpl.html"
            });
            $stateProvider.state("app.issues", {
                url: "search/:query/issues/:fullName",
                controller: "RepoIssuesController",
                controllerAs: "i",
                templateUrl: "app/repo-issues/repo-issues-tpl.html"
            });
            $urlRouterProvider.otherwise("/");
        };
        return Routes;
    }());
    App.Routes = Routes;
})(App || (App = {}));
