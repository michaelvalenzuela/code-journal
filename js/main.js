const $avatarUrlInput = document.getElementsByName('avatarUrl')[0];
const $form = document.getElementById('form');

$avatarUrlInput.addEventListener('input', function (e) {
  const $avatarImg = document.querySelector('.avatar-img');
  $avatarImg.setAttribute('src', e.target.value);
});

$form.addEventListener('submit', function (e) {
});
