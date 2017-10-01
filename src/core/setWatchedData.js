import {Map,List,fromJS} from 'immutable';
export function setWatchedData(state,value)
{   if(!state.get("watchedMovies")){
	return state.set("watchedMovies",List().unshift(value));
}
   return state.set("watchedMovies", state.get("watchedMovies").unshift(value));
	
}
