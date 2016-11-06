var App;
(function (App) {
    var RepoIssues;
    (function (RepoIssues) {
        var Controllers;
        (function (Controllers) {
            var RepoIssuesController = (function () {
                function RepoIssuesController(repoIssueService, stateService, spinner) {
                    var vm = this;
                    vm.repoIssueService = repoIssueService;
                    vm.stateService = stateService;
                    vm.spinner = spinner;
                    vm.errorMessage = "";
                    vm.query = vm.stateService.params["query"];
                    var passedInFullName = vm.stateService.params["fullName"];
                    vm.selectedRepoFullName = passedInFullName;
                    if (passedInFullName != null && passedInFullName.length > 0) {
                        vm.list(passedInFullName);
                    }
                    else {
                        vm.repoIssues = [];
                    }
                }
                RepoIssuesController.prototype.list = function (repoFullName) {
                    var vm = this;
                    if (repoFullName !== undefined && repoFullName.length > 0) {
                        vm.repoIssues = [];
                        vm.spinner.spin("spinner-search");
                        vm.repoIssueService.list(repoFullName).then(function (data) {
                            vm.spinner.stop("spinner-search");
                            vm.repoIssues = data;
                        }).catch(function () {
                            vm.errorMessage = "Sorry something went wrong...";
                        });
                    }
                    else {
                        vm.repoIssues = [];
                    }
                };
                RepoIssuesController.prototype.goBack = function () {
                    var vm = this;
                    vm.stateService.go('app.search', { query: vm.query }, { notify: true });
                };
                return RepoIssuesController;
            }());
            Controllers.RepoIssuesController = RepoIssuesController;
        })(Controllers = RepoIssues.Controllers || (RepoIssues.Controllers = {}));
    })(RepoIssues = App.RepoIssues || (App.RepoIssues = {}));
})(App || (App = {}));
//# sourceMappingURL=repo-issues-ctrl.js.map