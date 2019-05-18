import { ActionType } from '../../ActionType';
import { User } from '../user_model/User';
import { WatchableAction } from '../../ActionType';
import UserSelections from '../UserSelections';
import { takeEvery, select, call, put } from 'redux-saga/effects';
import { ApplicationSettings } from '../model/ApplicationSettings';

class UpdateSettingsActions implements WatchableAction<ApplicationSettings> {
    public request(settings: ApplicationSettings) {
        return {
            type: ActionType.UPDATE_SETTINGS_REQUEST,
            settings
        };
    }

    public *watch() {
        yield takeEvery<any>(ActionType.UPDATE_SETTINGS_REQUEST, this.fetch);
    }

    private *fetch(action: {user: User}) {
        try {
            const userQuery = yield select(UserSelections.getUserQuery);

            const updatedUser = yield call([userQuery, userQuery.updateUser], action.user);
            yield put({type: ActionType.UPDATE_SETTINGS_SUCCESS, user: updatedUser});
        } catch (error) {
            yield put({type: ActionType.UPDATE_SETTINGS_FAILURE});
        }
    }
}

export default new UpdateSettingsActions();
