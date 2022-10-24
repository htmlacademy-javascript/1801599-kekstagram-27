
const commentsContainer = document.querySelector('.social__comments');

const updateComments = (comments) => {
  commentsContainer.innerHTML = '';
  const commentFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    const commentDescription = document.createElement('p');
    commentDescription.classList.add('social__text');

    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentDescription.textContent = comment.message;

    commentItem.appendChild(commentAvatar);
    commentItem.appendChild(commentDescription);
    commentFragment.appendChild(commentItem);
  });

  commentsContainer.appendChild(commentFragment);
};

export {updateComments};
