import reducers from '../src/reducers';
import { createStore } from 'redux';

export default function initStore() {
    const store = createStore( 
        reducers,

    );
    return store;
}