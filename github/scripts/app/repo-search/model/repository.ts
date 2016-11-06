namespace App.RepoSearch.Model {

    export class Repository {
        id: number;
        name: string;
        fullName: string;
        htmlUrl: string;
        url: string;
        description: string;
        updated: Date;
        stargazerCount: number;
        watchersCount: number;
        openIssuesCount: number;
        ownerAvatarUrl: string;
        ownerUrl: string;
        ownerLogin: string;
        forksCount: number;
        
        constructor(id: number,
            name: string,
            fullName: string,
            htmlUrl: string,
            url: string,
            description: string,
            updated: Date,
            stargazerCount: number,
            watchersCount: number,
            openIssuesCount: number,
            forksCount: number,
            ownerAvatarUrl: string,
            ownerUrl: string,
            ownerLogin: string) {

            this.fullName = fullName;
            this.name = name;
            this.id = id;
            this.htmlUrl = htmlUrl;
            this.url = url;
            this.description = description;
            this.updated = updated;
            this.stargazerCount = stargazerCount;
            this.watchersCount = watchersCount;
            this.openIssuesCount = openIssuesCount;
            this.forksCount = forksCount;
            this.ownerAvatarUrl = ownerAvatarUrl;
            this.ownerUrl = ownerUrl;
            this.ownerLogin = ownerLogin;
        }
    }
}