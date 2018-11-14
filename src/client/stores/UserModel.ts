
export class UserModel {
    private email: string;

    public static NULL_USER_MODEL = new UserModel();

    public setEmail(email: string) {
        this.email = email;
    }

    public getEmail() {
        return this.email;
    }

    clone(): UserModel {
        const clone = new UserModel();
        clone.email = this.email;
        return clone;
    }
}
