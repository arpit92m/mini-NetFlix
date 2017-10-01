import watchedMovieMapper from '../mappers/watchedMovie'

export default function watchedMovie(data){
let newData = new watchedMovieMapper();
        newData.Title =data.Title ,
        newData.Poster=data.Poster,
        newData.Vote=null

   return newData;
}


