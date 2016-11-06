namespace App.RepoSearch.Directives {

    export class ToolTipHover implements ng.IDirective { 

        private timeout: ng.ITimeoutService;

        constructor(timeout: ng.ITimeoutService) {
            this.timeout = timeout;
        }

        link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            let self: ToolTipHover = this;
            self.timeout(function () {
                $(element).tooltip()
            });
        }

        static factory(timeout: ng.ITimeoutService): ng.IDirective {
            return new ToolTipHover(timeout);
        }
    }
}