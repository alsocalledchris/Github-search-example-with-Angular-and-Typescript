var App;
(function (App) {
    var RepoIssues;
    (function (RepoIssues) {
        var Services;
        (function (Services) {
            var RepoIssuesService = (function () {
                function RepoIssuesService(http, q) {
                    var vm = this;
                    vm.http = http;
                    vm.q = q;
                }
                RepoIssuesService.prototype.list = function (fullName) {
                    var vm = this;
                    var deferred = vm.q.defer();
                    vm.http.get("https://api.github.com/search/issues?q=repo:" + fullName)
                        .success(function (data) {
                        var foundIssues = [];
                        data.items.forEach(function (item) {
                            foundIssues.push(new RepoIssues.Model.RepositoryIssue(item.number, item.html_url, item.title, item.created_at, item.updated_at, item.state, item.body));
                        });
                        deferred.resolve(foundIssues);
                    })
                        .error(function () {
                        deferred.reject();
                    });
                    return deferred.promise;
                };
                return RepoIssuesService;
            }());
            Services.RepoIssuesService = RepoIssuesService;
        })(Services = RepoIssues.Services || (RepoIssues.Services = {}));
    })(RepoIssues = App.RepoIssues || (App.RepoIssues = {}));
})(App || (App = {}));
//# sourceMappingURL=repo-issues-service.js.map