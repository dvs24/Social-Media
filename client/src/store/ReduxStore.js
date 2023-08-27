import{
    legacy_createStore as createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk'
import { reducers } from '../reducers';

const saveToLocalStorage = (store)=>{
    try {
        const seriallizedStore = JSON.stringify(store);
        window.localStorage.setItem('store',seriallizedStore )
    } catch (error) {
        console.log(error)
    }
}

const loadFormLocalStorage =()=>{
    try {
        const seriallizedStore = window.localStorage.getItem('store')
        if(seriallizedStore === null) return undefined;
        return JSON.parse(seriallizedStore)
    } catch (error) {
        console.log(error)
        return undefined       
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedeStorage = loadFormLocalStorage();

const store = createStore(reducers, persistedeStorage, composeEnhancers(applyMiddleware(thunk)))

store.subscribe(()=> saveToLocalStorage(store.getState()));


export default store;