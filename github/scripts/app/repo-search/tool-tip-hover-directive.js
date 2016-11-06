var App;
(function (App) {
    var RepoSearch;
    (function (RepoSearch) {
        var Directives;
        (function (Directives) {
            var ToolTipHover = (function () {
                function ToolTipHover(timeout) {
                    var _this = this;
                    this.link = function (scope, element, attrs) {
                        var self = _this;
                        self.timeout(function () {
                            $(element).tooltip();
                        });
                    };
                    this.timeout = timeout;
                }
                ToolTipHover.factory = function (timeout) {
                    return new ToolTipHover(timeout);
                };
                return ToolTipHover;
            }());
            Directives.ToolTipHover = ToolTipHover;
        })(Directives = RepoSearch.Directives || (RepoSearch.Directives = {}));
    })(RepoSearch = App.RepoSearch || (App.RepoSearch = {}));
})(App || (App = {}));
//# sourceMappingURL=tool-tip-hover-directive.js.map