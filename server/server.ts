import app from './app';
import * as mongoose from 'mongoose';
import { UsersSchema } from './model/UserModel';

mongoose.connect('mongodb://localhost/thegame');
mongoose.set('debug', true);
mongoose.model('Users', UsersSchema);

const server = app.listen(app.get('port'), () => {
    console.log(
        'App is running on http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    );
});

export default server;
