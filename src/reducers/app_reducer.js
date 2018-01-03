import { ADD_NEW_LIST, ADD_NEW_ITEM, EDIT_ITEM, DELETE_ITEM,
         EDIT_LIST, DELETE_LIST, INIT_LISTS } from '../actions/app_action';

const initState = {
  lists: [],
}

const saveLists = (newLists) => {
  localStorage.setItem('lists', JSON.stringify(newLists));
  fetch(`http://www.blastz.cn:5002/savelists`, {
    method: 'POST',
    body: JSON.stringify(newLists),
  }).catch((error) => {
    console.log(error);
  })
}

const appReducer = (state=initState, action) => {
  const { newListName, listName, itemName, itemValue, newItemName, newItemValue, lists } = action;
  switch (action.type) {
    case ADD_NEW_LIST: {
      const newLists = [
        ...state.lists,
        {
          name: newListName,
          content: []
        }
      ]
      saveLists(newLists);
      return ({
        ...state,
        lists: newLists
      })
    }
    case ADD_NEW_ITEM: {
      const newLists = state.lists.reduce((accumulator, currentItem) => {
        if(currentItem.name !== listName) {
          return accumulator.concat([currentItem]);
        } else {
          return [
            ...accumulator,
            {
              name: currentItem.name,
              content: [
                ...currentItem.content,
                {
                  name: itemName,
                  value: itemValue
                }
              ]
            }
          ]
        }
      }, []);
      saveLists(newLists);
      return ({
        ...state,
        lists: newLists
      })
    }
    case EDIT_ITEM: {
      const newLists = state.lists.reduce((accumulator, theList) => {
        if(theList.name !== listName) {
          return accumulator.concat([theList]);
        } else {
          return [
            ...accumulator,
            {
              name: theList.name,
              content: theList.content.reduce((accumulator, theItem) => {
                if(theItem.name !== itemName) {
                  return accumulator.concat([theItem]);
                } else {
                  return [
                    ...accumulator,
                    {
                      name: newItemName,
                      value: newItemValue
                    }
                  ]
                }
              }, [])
            }
          ]
        }
      }, []);
      saveLists(newLists);
      return ({
        ...state,
        lists: newLists
      })
    }
    case DELETE_ITEM: {
      const newLists = state.lists.reduce((accumulator, theList) => {
        if(theList.name !== listName) {
          return accumulator.concat([theList]);
        } else {
          return [
            ...accumulator,
            {
              name: theList.name,
              content: theList.content.reduce((accumulator, theItem) => {
                if(theItem.name !== itemName) {
                  return accumulator.concat([theItem]);
                } else {
                  return accumulator;
                }
              }, [])
            }
          ]
        }
      }, []);
      saveLists(newLists);
      return ({
        ...state,
        lists: newLists
      })
    }
    case EDIT_LIST: {
      const newLists = state.lists.reduce((accumulator, theList) => {
        if(theList.name !== listName) {
          return accumulator.concat([theList]);
        } else {
          return [
            ...accumulator,
            {
              name: newListName,
              content: theList.content
            }
          ]
        }
      }, []);
      saveLists(newLists);
      return ({
        ...state,
        lists: newLists
      })
    }
    case DELETE_LIST: {
      const newLists = state.lists.reduce((accumulator, theList) => {
        if(theList.name !== listName) {
          return accumulator.concat([theList]);
        } else {
          return accumulator;
        }
      }, []);
      saveLists(newLists);
      return ({
        ...state,
        lists: newLists
      })
    }
    case INIT_LISTS: {
      return ({
        ...state,
        lists: lists
      })
    }
    default: return state;
  }
}

export default appReducer;
