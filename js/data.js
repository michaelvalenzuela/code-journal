/* exported data */

var data = {
  view: 'edit-profile',
  profile: {
    username: '',
    fullName: '',
    location: '',
    avatarUrl: '',
    bio: ''
  },
  entries: []
};

window.addEventListener('beforeunload', function (e) {
  const $avatarUrlInput = document.getElementById('avatarUrlInput');
  const $usernameInput = document.getElementById('usernameInput');
  const $fullNameInput = document.getElementById('fullNameInput');
  const $locationInput = document.getElementById('locationInput');
  const $bioInput = document.getElementById('bioInput');

  if ($avatarUrlInput || $usernameInput || $fullNameInput || $locationInput || $bioInput) {
    const currentProfile = {
      avatarUrl: $avatarUrlInput.value,
      username: $usernameInput.value,
      fullName: $fullNameInput.value,
      location: $locationInput.value,
      bio: $bioInput.value
    };
    localStorage.setItem('profile', JSON.stringify([currentProfile]));
  }

  window.localStorage.setItem('completed-profile', JSON.stringify(data));

});
