namespace App.RepoSearch.Services {

    export interface IRepoSearchService {
        list(query: string): ng.IPromise<Array<Model.Repository>>;
        currentQuery: string;
        currentResults: Array<Model.Repository>
    }
     
    export class RepoSearchService implements IRepoSearchService {  

        private http: ng.IHttpService;
        private q: ng.IQService; 

        public currentQuery: string;
        public currentResults: Array<Model.Repository>;

        constructor(http: ng.IHttpService, q: ng.IQService) {
            let vm: RepoSearchService = this;
            vm.http = http;
            vm.q = q; 
        }

        public list(query: string): ng.IPromise<Array<Model.Repository>> {
            let vm: RepoSearchService = this;
            let deferred = vm.q.defer();
            vm.http.get("https://api.github.com/search/repositories?q=" + query)
                .success((data: Model.RepositorySearchResponse) => {
                    let foundRepositories: Array<Model.Repository> = [];
                    data.items.forEach((item) => {
                        foundRepositories.push(new Model.Repository(item.id, item.name, item.full_name,
                            item.html_url, item.url, item.description, item.updated_at, item.stargazers_count,
                            item.watchers_count, item.open_issues_count, item.forks_count, item.owner.avatar_url, item.owner.url,
                            item.owner.login));
                    });
                    // Store the current result so we don't get again if we already have
                    vm.currentQuery = query;
                    vm.currentResults = foundRepositories;
                    deferred.resolve(foundRepositories);
                })
                .error(() => {
                    deferred.reject();
                });
            return deferred.promise;
        }
    }
}