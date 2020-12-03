let $avatarUrlInput = document.getElementsByName('avatarUrl')[0];
const $form = document.getElementById('form');

const prevProfile = window.localStorage.getItem('profile');

if (prevProfile !== null) {
  repopulate(prevProfile);
}

$avatarUrlInput.addEventListener('input', function (e) {
  const $avatarImg = document.querySelector('.avatar-img');
  $avatarImg.setAttribute('src', e.target.value);

});

$form.addEventListener('submit', function (event) {
  data.profile.avatarUrl = event.target.avatarUrl.value;
  data.profile.username = event.target.username.value;
  data.profile.fullName = event.target.fullName.value;
  data.profile.location = event.target.location.value;

  $form.reset();
});

window.addEventListener('beforeunload', function (e) {
  $avatarUrlInput = document.getElementsByName('avatarUrl')[0];
  const $usernameInput = document.getElementsByName('username')[0];
  const $fullNameInput = document.getElementsByName('fullName')[0];
  const $locationInput = document.getElementsByName('location')[0];
  const $bioInput = document.getElementsByName('bio')[0];

  const currentProfile = {
    avatarUrl: $avatarUrlInput.value,
    username: $usernameInput.value,
    fullName: $fullNameInput.value,
    location: $locationInput.value,
    bio: $bioInput.value
  };

  localStorage.setItem('profile', JSON.stringify([currentProfile]));

});

function repopulate(previousData) {
  const parsedData = JSON.parse(previousData);
  document.getElementsByName('avatarUrl')[0].value = parsedData[0].avatarUrl ? parsedData[0].avatarUrl : '';
  if (parsedData[0].avatarUrl) {
    const $avatarImg = document.querySelector('.avatar-img');
    $avatarImg.setAttribute('src', parsedData[0].avatarUrl);
  }

  document.getElementsByName('username')[0].value = parsedData[0].username ? parsedData[0].username : '';
  document.getElementsByName('fullName')[0].value = parsedData[0].fullName ? parsedData[0].fullName : '';
  document.getElementsByName('location')[0].value = parsedData[0].location ? parsedData[0].location : '';
  document.getElementsByName('bio')[0].value = parsedData[0].bio ? parsedData[0].bio : '';
}
