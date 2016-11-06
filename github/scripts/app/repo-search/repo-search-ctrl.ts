namespace App.RepoSearch.Controllers {

    export class RepoSearchController {

        private searchService: App.RepoSearch.Services.IRepoSearchService;
        private stateService: angular.ui.IStateService;
        private spinner: ISpinnerService;

        public query: string;
        public searchResult: Array<Model.Repository>;
        public errorMessage: string;
          
        constructor(searchService: App.RepoSearch.Services.IRepoSearchService, stateService: angular.ui.IStateService,
            spinner: ISpinnerService) {
            let vm: RepoSearchController = this;
            vm.searchService = searchService;
            vm.stateService = stateService;
            vm.spinner = spinner;
            vm.errorMessage = "";

            let passedInQuery: string = vm.stateService.params["query"];
            if (passedInQuery != null && passedInQuery.length > 0) {
                vm.query = passedInQuery;
                vm.search();
            } else {
                vm.searchResult = [];
            }
        }

        private search() {
            let vm: RepoSearchController = this;
            if (vm.searchService.currentQuery !== vm.query) {
                if (vm.query !== undefined && vm.query.length > 0) {
                    vm.searchResult = [];
                    vm.spinner.spin("spinner-search");
                    vm.searchService.list(vm.query).then((data: Array<Model.Repository>) => {
                        vm.spinner.stop("spinner-search");
                        vm.searchResult = data;
                    }).catch(() => {
                        vm.errorMessage = "Sorry something went wrong..."
                    });
                } else {
                    vm.searchResult = [];
                }
            } else {
                vm.searchResult = vm.searchService.currentResults;
            }
        }

        public viewIssues(fullName: string) {
            let vm: RepoSearchController = this;
            vm.stateService.go('app.issues', { fullName: fullName, query: vm.query }, { notify: true });
        }
    }
}