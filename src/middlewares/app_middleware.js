

const appMiddleware = store => next => action => {
  const type = action.type;
  if(type === 'haha') {

  } else {
    next(action);
  }
}

export default appMiddleware
