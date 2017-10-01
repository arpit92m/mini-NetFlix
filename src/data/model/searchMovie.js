import searchedMovieMapper from '../mappers/searchMovie'

export default function searchedMovie(data){
let newData = new searchedMovieMapper();
        newData.Title =data.Title ,
        newData.Plot=data.Plot,
        newData.Ratings=data.Ratings,
        newData.Released=data.Released,
        newData.Poster=data.Poster

   return newData;
}


