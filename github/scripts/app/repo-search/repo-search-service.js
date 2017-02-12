var App;
(function (App) {
    var RepoSearch;
    (function (RepoSearch) {
        var Services;
        (function (Services) {
            var RepoSearchService = (function () {
                function RepoSearchService(http, q) {
                    var vm = this;
                    vm.http = http;
                    vm.q = q;
                }
                RepoSearchService.prototype.list = function (query) {
                    var vm = this;
                    var deferred = vm.q.defer();
                    vm.http.get("https://api.github.com/search/repositories?q=" + query)
                        .success(function (data) {
                        var foundRepositories = [];
                        data.items.forEach(function (item) {
                            foundRepositories.push(new RepoSearch.Model.Repository(item.id, item.name, item.full_name, item.html_url, item.url, item.description, item.updated_at, item.stargazers_count, item.watchers_count, item.open_issues_count, item.forks_count, item.owner.avatar_url, item.owner.url, item.owner.login));
                        });
                        // Store the current result so we don't get again if we already have
                        vm.currentQuery = query;
                        vm.currentResults = foundRepositories;
                        deferred.resolve(foundRepositories);
                    })
                        .error(function () {
                        deferred.reject();
                    });
                    return deferred.promise;
                };
                return RepoSearchService;
            }());
            Services.RepoSearchService = RepoSearchService;
        })(Services = RepoSearch.Services || (RepoSearch.Services = {}));
    })(RepoSearch = App.RepoSearch || (App.RepoSearch = {}));
})(App || (App = {}));
