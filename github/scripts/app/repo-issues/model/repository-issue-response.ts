namespace App.RepoIssues.Model {

    export class RepositoryIssueResponse {
        total_count: number;
        items: Array<Model.RepositoryIssueResponseItem>;
    }
}