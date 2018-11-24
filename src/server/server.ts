import app from './app';
import * as mongoose from 'mongoose';
import { UsersSchema } from './model/UsersSchema';
import { MongooseUserModel } from './model/UserDao';

mongoose.connect('mongodb://localhost/thegame');
mongoose.set('debug', true);
mongoose.model<MongooseUserModel>('Users', UsersSchema);

import {router} from './routes/users';
require('./auth/passport');

app.use('/api', router);

const server = app.listen(app.get('port'), () => {
    console.log(
        'App is running on http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    );
});

export default server;
