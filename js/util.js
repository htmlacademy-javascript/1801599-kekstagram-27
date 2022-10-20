function getRandomNumber(numberFrom,numberTo){
  if(numberFrom < 0 || numberTo < 0){
    return NaN;
  }

  const lower = Math.ceil(Math.min(numberFrom, numberTo));
  const upper = Math.round(Math.max(numberTo, numberTo));

  return Math.round(Math.random() * (upper - lower) + lower);
}

const UniqueRandomNumber = [];

function getUniqueRandomNumber(min,max){
  const uniqueNumber = getRandomNumber(min,max);
  if(UniqueRandomNumber.includes(uniqueNumber)){
    return getUniqueRandomNumber(min,max);
  }
  else if(UniqueRandomNumber.length >= (max - min + 1)) {
    return null;
  }
  UniqueRandomNumber.push(uniqueNumber);
  return uniqueNumber;
}

function getCommentLength(comment,maxLength){
  if(comment.length > maxLength) {
    return false;
  }
  return true;
}
getCommentLength('comment',140);

export { getRandomNumber, getUniqueRandomNumber };
