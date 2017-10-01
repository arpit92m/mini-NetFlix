import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/reducers'; 
import thunk from 'redux-thunk';

export default function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
        store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}