
namespace App {

    export class Routes { 

        public configue($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
            $stateProvider.state("app", {
                url: "/",
                controller: "GithubController",
                controllerAs: "g",
                templateUrl: "scripts/app/github-tpl.html"
            });
            $stateProvider.state("app.search", {
                url: "search/:query",
                controller: "RepoSearchController",
                controllerAs: "s",
                templateUrl: "scripts/app/repo-search/repo-search-tpl.html"
            });
            $stateProvider.state("app.issues", {
                url: "search/:query/issues/:fullName",
                controller: "RepoIssuesController",
                controllerAs: "i",
                templateUrl: "scripts/app/repo-issues/repo-issues-tpl.html"
            });
            
            $urlRouterProvider.otherwise("/");
        }
    }
}