export const ADD_NEW_LIST = 'ADD_NEW_LIST';
export const ADD_NEW_ITEM = 'ADD_NEW_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_LIST = 'EDIT_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const INIT_LISTS = 'INIT_LISTS';

export const addNewList = (newListName) => ({
  type: ADD_NEW_LIST,
  newListName
})

export const addNewItem = (listName, itemName, itemValue) => ({
  type: ADD_NEW_ITEM,
  listName,
  itemName,
  itemValue
})

export const editItem = (listName, itemName, newItemName, newItemValue) => ({
  type: EDIT_ITEM,
  listName,
  itemName,
  newItemName,
  newItemValue
})

export const deleteItem = (listName, itemName) => ({
  type: DELETE_ITEM,
  listName,
  itemName
})

export const editList = (listName, newListName) => ({
  type: EDIT_LIST,
  listName,
  newListName
})

export const deleteList = (listName) => ({
  type: DELETE_LIST,
  listName
})

export const initLists = (lists) => ({
  type: INIT_LISTS,
  lists
})
