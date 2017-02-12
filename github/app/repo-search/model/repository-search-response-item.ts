namespace App.RepoSearch.Model {

    export class RepositorySearchResponseItem {
        id: number;
        name: string;
        full_name: string;
        html_url: string;
        url: string;
        description: string;
        updated_at: Date;
        stargazers_count: number;
        watchers_count: number;
        open_issues_count: number;
        forks_count: number;
        owner: RepositorySearchResponseItemOwner;
    }
}