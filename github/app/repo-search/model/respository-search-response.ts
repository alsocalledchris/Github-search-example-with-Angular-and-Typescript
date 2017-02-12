namespace App.RepoSearch.Model {
    export class RepositorySearchResponse {
        total_counts: number;
        incomplete_results: boolean;
        items: Array<RepositorySearchResponseItem>;
    }
}
