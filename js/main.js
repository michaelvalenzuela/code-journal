const $avatarUrlInput = document.getElementsByName('avatarUrl')[0];
const $form = document.getElementById('form');

$avatarUrlInput.addEventListener('input', function (e) {
  const $avatarImg = document.querySelector('.avatar-img');
  $avatarImg.setAttribute('src', e.target.value);
});

$form.addEventListener('submit', function (event) {
  data.profile.avatarUrl = event.target.avatarUrl.value;
  data.profile.username = event.target.username.value;
  data.profile.fullName = event.target.fullName.value;
  data.profile.location = event.target.location.value;

  event.preventDefault();
});
