import React, {Component} from 'react';

export default class Container extends Component {
    constructor(props) {
        super(props);
    }

   
  	render() {
		return (
		      <div id='app-container' className='container'>
                {/* Header content , common for entire application */}
                <div className='jumbotron'>
                   <h1>Mini netFlix</h1>
                </div>
                {this.props.children}
          </div>
		);
	}
}  