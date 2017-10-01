import * as types from './constants';  
export const setMovieData = (value) => ({
    type: types.SET_MOVIE_DATA,
    value:value
});
export const setWatchedData = (value) => ({
    type: types.SET_WATCHED_DATA,
    value:value,
})

export const removeFromWatchedData = (value) => ({
    type: types.REMOVE_WATCHED_DATA,
    value:value,
})

export const addVoteData = (index,value) => ({
    type: types.ADD_VOTE_DATA,
    index: index,
    value:value,
})
