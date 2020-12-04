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

window.addEventListener('beforeunload', function (event) {
  event.preventDefault();
  saveToLocalStorage();
});

function saveToLocalStorage() {
  const $avatarUrlInput = document.getElementById('avatarUrlInput');
  const $usernameInput = document.getElementById('usernameInput');
  const $fullNameInput = document.getElementById('fullNameInput');
  const $locationInput = document.getElementById('locationInput');
  const $bioInput = document.getElementById('bioInput');

  if ($avatarUrlInput || $usernameInput || $fullNameInput || $locationInput || $bioInput) {
    const incompleteProfile = {
      avatarUrl: $avatarUrlInput.value,
      username: $usernameInput.value,
      fullName: $fullNameInput.value,
      location: $locationInput.value,
      bio: $bioInput.value
    };
    localStorage.setItem('incomplete-profile', JSON.stringify([incompleteProfile]));
  }

  if (data.profile.username && data.profile.fullName && data.profile.location && data.profile.avatarUrl && data.profile.bio) {
    window.localStorage.setItem('completed-profile', JSON.stringify(data));
  }
}
