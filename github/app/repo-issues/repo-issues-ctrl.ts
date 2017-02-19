namespace App.RepoIssues.Controllers {

    export class RepoIssuesController {

        private repoIssueService: App.RepoIssues.Services.IRepoIssuesService;
        private stateService: angular.ui.IStateService;
        private spinner: ISpinnerService;
        private query: string;

        public repoIssues: Array<App.RepoIssues.Model.RepositoryIssue>;
        public selectedRepoFullName: string;
        public errorMessage: string;

        constructor(repoIssueService: App.RepoIssues.Services.IRepoIssuesService, stateService: angular.ui.IStateService,
            spinner: ISpinnerService) {
            let vm: RepoIssuesController = this;
            vm.repoIssueService = repoIssueService;
            vm.stateService = stateService;
            vm.spinner = spinner;
            vm.errorMessage = "";

            vm.query = vm.stateService.params["query"];
            let passedInFullName: string = vm.stateService.params["fullName"];
            vm.selectedRepoFullName = passedInFullName;
            if (passedInFullName != null && passedInFullName.length > 0) {
                vm.list(passedInFullName);
            } else {
                vm.repoIssues = [];
            }
        }

        private list(repoFullName: string) {
            let vm: RepoIssuesController = this;
            if (repoFullName !== undefined && repoFullName.length > 0) {
                vm.repoIssues = [];
                vm.spinner.spin("spinner-search");
                vm.repoIssueService.list(repoFullName).then((data: Array<Model.RepositoryIssue>) => {
                    vm.spinner.stop("spinner-search");
                    vm.repoIssues = data;
                }).catch(() => {
                    vm.errorMessage = "Sorry something went wrong..."
                });
            } else {
                vm.repoIssues = [];
            }
        }

        public goBack() : void {
            let vm: RepoIssuesController = this;
            vm.stateService.go("app.search", { query: vm.query }, { notify: true });
        }
    }
}