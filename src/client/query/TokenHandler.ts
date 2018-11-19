
export class TokenHandler {
    public saveToken(token: string) {
        localStorage.setItem('jwt', token);
    }

    public loadToken(): string {
        return localStorage.getItem('jwt' );
    }

    public deleteToken() {
        localStorage.removeItem('jwt');
    }
}
