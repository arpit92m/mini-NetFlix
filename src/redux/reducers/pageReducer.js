import {Map,fromJS} from 'immutable';
import {setMovieData} from '../../core/setMovieData'
import {setWatchedData} from '../../core/setWatchedData'
import {removeWatchedData} from '../../core/removeWatchedData'
import {addVoteData} from '../../core/addVoteData'
export default function pageReducer(state = new Map() , action) { 
  switch(action.type) {
  	case 'SET_MOVIE_DATA':
        return setMovieData(state,action.value);
    case 'SET_WATCHED_DATA':
        return setWatchedData(state,action.value);
    case 'REMOVE_WATCHED_DATA':
        return removeWatchedData(state,action.value);
    case 'ADD_VOTE_DATA':
        return addVoteData(state,action.index,action.value);
    default: 
      return state;
  }
}