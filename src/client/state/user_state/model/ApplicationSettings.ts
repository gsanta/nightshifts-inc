import { User } from '../user_model/User';

export interface ApplicationSettings {
    user: User;
    language: 'hu' | 'en';
}
