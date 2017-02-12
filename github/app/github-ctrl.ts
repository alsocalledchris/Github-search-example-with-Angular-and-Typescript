namespace App.Controllers {

    export class GithubController {

        private stateService: angular.ui.IStateService;
        private spinner: ISpinnerService;

        public query: string;
    
        constructor(stateService: angular.ui.IStateService, spinner: ISpinnerService) {
            let vm: GithubController = this;
            vm.stateService = stateService;
            vm.spinner = spinner;
            let passedInQuery: string = vm.stateService.params["query"];
            if (passedInQuery != null && passedInQuery.length > 0) {
                vm.query = passedInQuery;
           }
        }

        performSearch() {
            let vm: GithubController = this;
            if (vm.query !== undefined && vm.query.length > 0) {
                vm.stateService.go('app.search', { query: vm.query }, { notify: true });
            } else {
                vm.stateService.go('app', { query: "" }, { notify: true });
            }
        }
    }
}