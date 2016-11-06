namespace App.RepoIssues.Model {

    export class RepositoryIssue {
        number: number;
        htmlUrl: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        state: string;
        body: string;

        constructor(number: number,
            htmlUrl: string,
            title: string,
            createdAt: Date,
            updatedAt: Date,
            state: string,
            body: string) {
            this.number = number;
            this.htmlUrl = htmlUrl;
            this.title = title;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.state = state;
            this.body = body;
        }
    }
}