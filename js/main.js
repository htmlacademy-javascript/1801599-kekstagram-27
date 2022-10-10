function getNumber(numberFrom,numberTo){
  if(numberFrom < 0 || numberFrom >= numberTo || numberTo < 0){
    return NaN;
  }
  return Math.round(Math.random() * (numberTo - numberFrom) + numberFrom);
}
getNumber(20,2);

function getCommentLength(comment,maxLength){
  if(comment.length > maxLength) {
    return false;
  }
  return true;
}
getCommentLength('hello',140);
