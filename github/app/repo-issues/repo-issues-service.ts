namespace App.RepoIssues.Services {

    export interface IRepoIssuesService {
        list(query: string): ng.IPromise<Array<Model.RepositoryIssue>>;
    }
     
    export class RepoIssuesService implements IRepoIssuesService {  

        private http: ng.IHttpService;
        private q: ng.IQService; 

        constructor(http: ng.IHttpService, q: ng.IQService) {
            let vm: RepoIssuesService = this;
            vm.http = http;
            vm.q = q; 
        }

        public list(fullName: string): ng.IPromise<Array<Model.RepositoryIssue>> {
            let vm: RepoIssuesService = this;
            let deferred = vm.q.defer();
            vm.http.get("https://api.github.com/search/issues?q=repo:" + fullName)
                .success((data: Model.RepositoryIssueResponse ) => {
                    let foundIssues: Array<Model.RepositoryIssue> = [];
                    data.items.forEach((item: Model.RepositoryIssueResponseItem) => {
                        foundIssues.push(new Model.RepositoryIssue(item.number, item.html_url, item.title,
                            item.created_at, item.updated_at, item.state, item.body));
                    });
                    deferred.resolve(foundIssues);
                })
                .error(() => {
                    deferred.reject();
                });
            return deferred.promise;
        }
    }
}