import {Map,List,fromJS} from 'immutable';
export function addVoteData(state,index,value)
{
	console.log(index*1);
	const vote = Map(state.getIn(['watchedMovies',index*1]));
	const updatevote=vote.set('Vote',value)
	
	return state.setIn(['watchedMovies',index*1],updatevote.toJS());

	
}

