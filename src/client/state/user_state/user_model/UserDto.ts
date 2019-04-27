export interface UserDto {
    id: string;
    email: string;
    authStrategy: 'facebook' | 'local' | 'unauthenticated';
}
