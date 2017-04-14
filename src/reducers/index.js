/**
 * Created by Administrator on 2017/4/14.
 */

import { combineReducers } from 'redux';
import counter from './count'
import fetchZH from './fetchZH'
export default combineReducers({
    counter,
    fetchZH
});