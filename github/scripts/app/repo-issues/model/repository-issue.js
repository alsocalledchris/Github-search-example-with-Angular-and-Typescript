var App;
(function (App) {
    var RepoIssues;
    (function (RepoIssues) {
        var Model;
        (function (Model) {
            var RepositoryIssue = (function () {
                function RepositoryIssue(number, htmlUrl, title, createdAt, updatedAt, state, body) {
                    this.number = number;
                    this.htmlUrl = htmlUrl;
                    this.title = title;
                    this.createdAt = createdAt;
                    this.updatedAt = updatedAt;
                    this.state = state;
                    this.body = body;
                }
                return RepositoryIssue;
            }());
            Model.RepositoryIssue = RepositoryIssue;
        })(Model = RepoIssues.Model || (RepoIssues.Model = {}));
    })(RepoIssues = App.RepoIssues || (App.RepoIssues = {}));
})(App || (App = {}));
//# sourceMappingURL=repository-issue.js.map