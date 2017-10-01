import {Map,fromJS} from 'immutable';
export function setMovieData(state=Map(),value)
{   let movieData={};
if(!value.Title){
movieData.error="Data Not Found";
return state.set("MovieData",fromJS(movieData))
}
else {
	return state.set("MovieData",fromJS(value))
}
	
}
