import * as global from './global';
import * as user from './user';
import * as boat from './boat';
import * as lake from './lake';
import * as booking from './booking';
import * as marina from './marina';

export default {
  ...global,
  ...user,
  ...boat,
  ...lake,
  ...booking,
  ...marina,
};
