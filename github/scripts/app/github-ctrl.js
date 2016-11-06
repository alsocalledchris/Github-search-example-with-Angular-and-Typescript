var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var GithubController = (function () {
            function GithubController(stateService, spinner) {
                var vm = this;
                vm.stateService = stateService;
                vm.spinner = spinner;
                var passedInQuery = vm.stateService.params["query"];
                if (passedInQuery != null && passedInQuery.length > 0) {
                    vm.query = passedInQuery;
                }
            }
            GithubController.prototype.performSearch = function () {
                var vm = this;
                if (vm.query !== undefined && vm.query.length > 0) {
                    vm.stateService.go('app.search', { query: vm.query }, { notify: true });
                }
                else {
                    vm.stateService.go('app', { query: "" }, { notify: true });
                }
            };
            return GithubController;
        }());
        Controllers.GithubController = GithubController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=github-ctrl.js.map