import app from './app';
import * as mongoose from 'mongoose';
import { UsersSchema } from './model/UsersSchema';

mongoose.connect('mongodb://localhost/thegame');
mongoose.set('debug', true);
mongoose.model('Users', UsersSchema);
require('./auth/passport');
import {router} from './routes/users';

app.use('/api', router);

const server = app.listen(app.get('port'), () => {
    console.log(
        'App is running on http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    );
});

export default server;
