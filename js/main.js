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

  event.preventDefault();

  swapView('profile');
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

function renderProfile(profile) {
  const $profileDiv = document.querySelector('div[data-view=profile]');

  const $titleFullName = document.createElement('h2');
  $titleFullName.textContent = profile.fullName;
  $profileDiv.appendChild($titleFullName);

  const $divRow = document.createElement('div');
  $divRow.classList.add('row');

  const $divCol1 = document.createElement('div');
  $divCol1.classList.add('col-two');

  const $avatar = document.createElement('img');
  $avatar.classList.add('avatar-img');
  if (profile.avatarUrl) {
    $avatar.setAttribute('src', profile.avatarUrl);
  } else {
    $avatar.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
  $divCol1.appendChild($avatar);

  const $divCol2 = document.createElement('div');
  $divCol2.classList.add('col-two');

  const $para1 = document.createElement('p');
  const $iconUser = document.createElement('i');
  $iconUser.classList.add('fas', 'fa-user');
  $iconUser.textContent = profile.username;
  $para1.appendChild($iconUser);

  const $para2 = document.createElement('p');
  const $iconLocation = document.createElement('i');
  $iconLocation.classList.add('fas', 'fa-map-marker-alt');
  $iconLocation.textContent = profile.location;
  $para2.appendChild($iconLocation);

  const $para3 = document.createElement('p');
  $para3.textContent = profile.bio;

  $divCol2.appendChild($para1);
  $divCol2.appendChild($para2);
  $divCol2.appendChild($para3);

  $divRow.appendChild($divCol1);
  $divRow.appendChild($divCol2);

  $profileDiv.appendChild($divRow);

  return $profileDiv;
}

function swapView(showView) {
  const views = document.querySelectorAll('div[data-view]');
  for (const view of views) {
    if (view.getAttribute('data-view') === showView) {
      if (showView === 'profile') {
        removeChildren(view);
        renderProfile(data.profile);
      }
      view.hidden = false;
      data.view = showView;
    } else {
      view.hidden = true;
    }
  }
}

function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
