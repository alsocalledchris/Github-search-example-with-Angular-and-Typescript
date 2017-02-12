var App;
(function (App) {
    var RepoSearch;
    (function (RepoSearch) {
        var Model;
        (function (Model) {
            var Repository = (function () {
                function Repository(id, name, fullName, htmlUrl, url, description, updated, stargazerCount, watchersCount, openIssuesCount, forksCount, ownerAvatarUrl, ownerUrl, ownerLogin) {
                    this.fullName = fullName;
                    this.name = name;
                    this.id = id;
                    this.htmlUrl = htmlUrl;
                    this.url = url;
                    this.description = description;
                    this.updated = updated;
                    this.stargazerCount = stargazerCount;
                    this.watchersCount = watchersCount;
                    this.openIssuesCount = openIssuesCount;
                    this.forksCount = forksCount;
                    this.ownerAvatarUrl = ownerAvatarUrl;
                    this.ownerUrl = ownerUrl;
                    this.ownerLogin = ownerLogin;
                }
                return Repository;
            }());
            Model.Repository = Repository;
        })(Model = RepoSearch.Model || (RepoSearch.Model = {}));
    })(RepoSearch = App.RepoSearch || (App.RepoSearch = {}));
})(App || (App = {}));
