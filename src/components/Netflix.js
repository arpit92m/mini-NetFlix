import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import {setMovieData,setWatchedData,removeFromWatchedData,addVoteData} from '../redux/reducers/actions';
import searchedMovie from '../data/model/searchMovie'
import watchedMovie from '../data/model/watchedMovie'

 class Netflix extends Component {
    constructor(props) {
        super(props);
        this.state={
          searchString:'',
          checkIfAlreadyPresent:false,
          isFetching:false

        }
        this.handleChange = this.handleChange.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.addToWatchedMovies = this.addToWatchedMovies.bind(this)
        this.removeFromWatchedData = this.removeFromWatchedData.bind(this)
        this.checkInAllWatchdMovies = this.checkInWatchedMovies.bind(this)
        this.addVoteDataToMovies = this.addVoteDataToMovies.bind(this)

    }
    

   addToWatchedMovies(e) {
    const {movieData,watchedMovies}=this.props;
    let flag=false;
    if(watchedMovies){
      for(var i=0;i<watchedMovies.size;i++) {
        if(watchedMovies.toJS()[i].Title.toLowerCase()===e.target.alt.toLowerCase()) {
        flag=true;
       break;
      }
    }
  }
     {!flag && this.props.setWatchedData(watchedMovie(movieData))}
   }

   removeFromWatchedData(title) {
    this.props.removeFromWatchedData(title)
   }

   addVoteDataToMovies(index,value){
     this.props.addVoteData(index,value)
   }

   checkInWatchedMovies(Poster){
    const {watchedMovies} = this.props;
    for(var i=0;i<watchedMovies.size;i++) {
      if(watchedMovies.toJS()[i].Poster===Poster) {
       return true;
      
      }
    }
     return false;
   }



   handleChange(e){

       
    this.setState({searchString:e.target.value});
       
    }

    fetchData(e){

     if (e.key === 'Enter') {
      this.setState({isFetching:true})
axios.get(`http://www.omdbapi.com/?t=${this.state.searchString}&apikey=aabca0d`)
  .then( (response)=> {
    this.setState({isFetching:false})
    if(response.data.Error){
      alert('Movie not found');
    }
    else{
   this.props.setMovieData(searchedMovie(response.data))
 }
  })
  .catch(function (error) {
    console.log(error);
  });
}
}

  	render() {
      const {movieData,watchedMovies} = this.props;
		return (
		      <div id='app-container' className='container'>
                {/* Header content , common for entire application */}   
                <div className="searchBox">
                <input type="text" value={this.state.searchString} className="inputSearch" onKeyPress={this.fetchData} onChange={this.handleChange} placeholder="Search Your Movie" />
                    </div>
                  {movieData && movieData.Title && <div className="movieDescription">
                    <img src={movieData.Poster} alt={movieData.Title} className="img-width" onClick={this.addToWatchedMovies}/>
                    <div className="contentDescription">
                   <p className="big-font">{movieData.Title} </p>
                   <p>{movieData.Released} </p>
                   <p>{movieData.Plot}</p>
                   {movieData.Ratings.map((rating,index)=>{
                    return (
                    <div >
                    {(rating[Object.keys(rating)[0]] === "Internet Movie Database" || rating[Object.keys(rating)[0]] === "Rotten Tomatoes") &&
                    <div className="rating">
                    <div>{rating[Object.keys(rating)[0]]}</div>
                     <div>{rating[Object.keys(rating)[1]]}</div>
                     </div>
                   }
                     </div>
                    )
                   })

                   }<div>
                    {
                    watchedMovies && this.checkInWatchedMovies(movieData.Poster) &&
                    <p className="already-watched">already watched</p>
                  }
                  
                  </div>
                  </div>
                   </div>
                   
                  }
                 
                  {this.props.watchedMovies &&
                  <WatchedMovies movies={this.props.watchedMovies.toJS()} addVoteData = {this.addVoteDataToMovies} removeWatchedDataFromStore={this.removeFromWatchedData} />
                }
                {
    this.state.isFetching && 
    <div className="loader-wrapper"><div className="loader"></div></div>
   }
          </div>
		);
	}
}  

function mapStateToProps(state, ownProps) {  
  return {movieData:state.pageReducer.get("MovieData"),
watchedMovies:state.pageReducer.get("watchedMovies")}
}

function mapDispatchToProps(dispatch) {
  return {
    setMovieData: (movieData) => {
      dispatch(
        setMovieData(movieData)
      )
    },
    setWatchedData: (movieData) => {
      dispatch(
        setWatchedData(movieData)
      )
    },
    removeFromWatchedData: (index) => {
      dispatch(
        removeFromWatchedData(index)
      )
    },
     addVoteData: (index,value) => {
      dispatch(
        addVoteData(index,value)
      )
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Netflix);

export class WatchedMovies extends Component{
  constructor(props) {
        super(props);

        this.state ={
          seeMore:false, addClass:''
        }

        this.removeFromData = this.removeFromData.bind(this)
        this.addClickClass = this.addClickClass.bind(this)
        this.checkToSeeMore = this.checkToSeeMore.bind(this)
        this.showAllMovies= this.showAllMovies.bind(this)
       
    }

    removeFromData(e) {
     this.props.movies.map((value,index)=>{
      if(value.Title.toLowerCase()===e.target.alt.toLowerCase()) {
        this.props.removeWatchedDataFromStore(value)
      }
     })
    }

    showAllMovies(index) {
      if(this.state.seeMore){
        return true;
      }
      else if(!this.state.seeMore && index<4){
        return true;
      }
      return false;
    }

    addClickClass(e){
      if(e.target.className.search("up")>-1){
        this.props.addVoteData(e.target.getAttribute('data-id'),"up")
      }
      else{
        this.props.addVoteData(e.target.getAttribute('data-id'),"down")

      }
      
    }

    checkToSeeMore(){
      this.setState({seeMore:!this.state.seeMore},()=>{
        if(this.state.seeMore){
          this.setState({addClass:'animation-show'})
        }
        else {
          this.setState({addClass:''})
        }
      })
    }

    render() {
      const {seeMore} = this.state;
      const {movies} = this.props;
      let seeContent,classNameUp,classNameDown;
      seeMore?seeContent="see less":seeContent="see more"
      return (
      <div className="watched-movies" >
     {movies.length>0 && <h1>Already Watched Movies</h1>}
      {this.props.movies &&
        this.props.movies.map((value,index)=>{
          classNameUp="fa fa-thumbs-up fa-2x",classNameDown="fa fa-thumbs-down fa-2x";
        if(value.Vote==="up"){
          classNameUp = classNameUp+" addColor"
        }
        else if(value.Vote==="down"){
          classNameDown = classNameDown+" addColor"
        }
        
         return (
         this.showAllMovies(index) && 
         <div key={index} className="movie">
         <img src={value.Poster} alt={value.Title} className="img-width" onClick={this.removeFromData}/>
          <div className="like-unlike">
          <i className={classNameUp} onClick = {this.addClickClass} data-id={index} aria-hidden="true" ></i>
           <i className={classNameDown} onClick = {this.addClickClass} data-id={index} aria-hidden="true" ></i>
           </div>
           </div>
         
         )
       
        })
      }
      {movies.length>4 && 
      <p onClick={this.checkToSeeMore} className="see-more">{seeContent}</p>
    }
      </div>
      )
      
    }

}



