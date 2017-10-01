import {Map,List,fromJS} from 'immutable';
export function removeWatchedData(state,value)
{
	return state.set('watchedMovies', state.get('watchedMovies').filter(o =>  o.Title !== value.Title));
}

