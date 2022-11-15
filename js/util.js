const isCommentLengthValid = (comment,maxLength) => {
  if(comment.length > maxLength) {
    return false;
  }
  return true;
};
isCommentLengthValid('comment',140);

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {isCommentLengthValid, isEscapeKey, debounce};
