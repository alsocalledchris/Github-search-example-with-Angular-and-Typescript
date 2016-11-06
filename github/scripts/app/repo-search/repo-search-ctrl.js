var App;
(function (App) {
    var RepoSearch;
    (function (RepoSearch) {
        var Controllers;
        (function (Controllers) {
            var RepoSearchController = (function () {
                function RepoSearchController(searchService, stateService, spinner) {
                    var vm = this;
                    vm.searchService = searchService;
                    vm.stateService = stateService;
                    vm.spinner = spinner;
                    vm.errorMessage = "";
                    var passedInQuery = vm.stateService.params["query"];
                    if (passedInQuery != null && passedInQuery.length > 0) {
                        vm.query = passedInQuery;
                        vm.search();
                    }
                    else {
                        vm.searchResult = [];
                    }
                }
                RepoSearchController.prototype.search = function () {
                    var vm = this;
                    if (vm.searchService.currentQuery !== vm.query) {
                        if (vm.query !== undefined && vm.query.length > 0) {
                            vm.searchResult = [];
                            vm.spinner.spin("spinner-search");
                            vm.searchService.list(vm.query).then(function (data) {
                                vm.spinner.stop("spinner-search");
                                vm.searchResult = data;
                            }).catch(function () {
                                vm.errorMessage = "Sorry something went wrong...";
                            });
                        }
                        else {
                            vm.searchResult = [];
                        }
                    }
                    else {
                        vm.searchResult = vm.searchService.currentResults;
                    }
                };
                RepoSearchController.prototype.viewIssues = function (fullName) {
                    var vm = this;
                    vm.stateService.go('app.issues', { fullName: fullName, query: vm.query }, { notify: true });
                };
                return RepoSearchController;
            }());
            Controllers.RepoSearchController = RepoSearchController;
        })(Controllers = RepoSearch.Controllers || (RepoSearch.Controllers = {}));
    })(RepoSearch = App.RepoSearch || (App.RepoSearch = {}));
})(App || (App = {}));
//# sourceMappingURL=repo-search-ctrl.js.map