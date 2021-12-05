import { combineReducers} from 'redux';
import uuid from 'uuid';

const rootReducer = combineReducers({
  authors: authorsReducer,
  books: booksReducer
})

export default rootReducer

function booksReducer(state = [], action) {
  let idx;
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.book];
 
    case "REMOVE_BOOK":
      idx = state.books.findIndex(book => book.id === action.id);
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
 
    default:
      return state;
  }
}

function authorsReducer(state = [], action) {
  let idx;
  switch(action.type){
    case "ADD_AUTHOR":
      return [...state, action.author];

    case "REMOVE_AUTHOR":
      idx = state.findIndex(author => author.id === action.id)
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    
    // In this case, we're checking to see if any of the authorNames currently stored in state 
    // match the name dispatched from the BookInput component.  
    case "ADD_BOOK":
      let existAuthor = state.filter(
        author => author.authorName === action.book.authorName
      );
      // If the name already exists, state is returned unchanged. 
      if(existAuthor.length > 0){
        return state;
      // If the name is not present, it is added to the authors array.  
      } else {
        return [...state, {authorName: action.book.authorName, id: uuid() }]
      } 
    default:
      return state;    
  }
}