function getNumber(numberFrom,numberTo){
  if(numberFrom < 0 || numberTo < 0){
    return NaN;
  }

  const lower = Math.ceil(Math.min(numberFrom, numberTo));
  const upper = Math.round(Math.max(numberTo, numberTo));

  return Math.round(Math.random() * (upper - lower) + lower);
}
getNumber(20,2);

function getCommentLength(comment,maxLength){
  if(comment.length > maxLength) {
    return false;
  }
  return true;
}
getCommentLength('hello',140);
