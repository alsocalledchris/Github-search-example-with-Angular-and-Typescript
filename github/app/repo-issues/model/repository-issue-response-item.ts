namespace App.RepoIssues.Model {
    
    export class RepositoryIssueResponseItem {
        number: number;
        html_url: string;
        title: string;
        created_at: Date;
        updated_at: Date;
        state: string;
        body: string;
    }

}