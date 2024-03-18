export class BaseConfig {
    private readonly baseUrl: string;
    private readonly email: string;
    private readonly password: string;

    constructor() {
        this.baseUrl = "https://www.sbzend.ssls.com/";
        this.email = "ssls.automation+666@gmail.com";
        this.password = "123456";
    }

    public getBaseUrl(): string {
        return this.baseUrl;
    }

    public getEmail(): string {
        return this.email
    }

    public getPassword(): string {
        return this.password
    }
}
