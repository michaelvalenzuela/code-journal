const $avatarUrlInput = document.getElementById('avatarUrlInput');
const $form = document.getElementById('form');

$avatarUrlInput.addEventListener('input', function (e) {
  const $avatarImg = document.querySelector('.avatar-img');
  $avatarImg.setAttribute('src', e.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  data.profile.avatarUrl = event.target.avatarUrl.value;
  data.profile.username = event.target.username.value;
  data.profile.fullName = event.target.fullName.value;
  data.profile.location = event.target.location.value;
  data.profile.bio = event.target.bio.value;

  $form.reset();

  swapView('profile');
});

function loadFromLocalStorageToEdit(previousData) {
  const parsedData = JSON.parse(previousData);
  document.getElementById('avatarUrlInput').value = parsedData[0].avatarUrl ? parsedData[0].avatarUrl : '';
  if (parsedData[0].avatarUrl) {
    const $avatarImg = document.querySelector('.avatar-img');
    $avatarImg.setAttribute('src', parsedData[0].avatarUrl);
  }

  document.getElementById('usernameInput').value = parsedData[0].username ? parsedData[0].username : '';
  document.getElementById('fullNameInput').value = parsedData[0].fullName ? parsedData[0].fullName : '';
  document.getElementById('locationInput').value = parsedData[0].location ? parsedData[0].location : '';
  document.getElementById('bioInput').value = parsedData[0].bio ? parsedData[0].bio : '';
}

function renderProfile() {
  const $profileDiv = document.querySelector('div[data-view=profile]');

  const $titleFullName = document.createElement('h2');
  $titleFullName.textContent = data.profile.fullName;
  $profileDiv.appendChild($titleFullName);

  const $divRow = document.createElement('div');
  $divRow.classList.add('row');

  const $divCol1 = document.createElement('div');
  $divCol1.classList.add('col-two');

  const $avatar = document.createElement('img');
  $avatar.classList.add('avatar-img');
  if (data.profile.avatarUrl) {
    $avatar.setAttribute('src', data.profile.avatarUrl);
  } else {
    $avatar.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
  $divCol1.appendChild($avatar);

  const $divCol2 = document.createElement('div');
  $divCol2.classList.add('col-two');

  const $para1 = document.createElement('p');
  const $iconUser = document.createElement('i');
  const $spanUser = document.createElement('span');
  $iconUser.classList.add('fas', 'fa-user');
  $spanUser.classList.add('icon-text');
  $spanUser.textContent = data.profile.username;
  $iconUser.append($spanUser);
  $para1.appendChild($iconUser);

  const $para2 = document.createElement('p');
  const $iconLocation = document.createElement('i');
  const $spanLocation = document.createElement('span');
  $iconLocation.classList.add('fas', 'fa-map-marker-alt');
  $spanLocation.classList.add('icon-text');
  $spanLocation.textContent = data.profile.location;
  $iconLocation.append($spanLocation);
  $para2.appendChild($iconLocation);

  const $para3 = document.createElement('p');
  $para3.textContent = data.profile.bio;

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
        renderProfile();
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

window.addEventListener('DOMContentLoaded', function (e) {
  const lastCompletedProfile = window.localStorage.getItem('completed-profile');
  if (lastCompletedProfile !== null) {
    data = JSON.parse(lastCompletedProfile);
  } else if (!lastCompletedProfile) {
    const incompleteProfile = window.localStorage.getItem('incomplete-profile');
    if (incompleteProfile !== null) {
      loadFromLocalStorageToEdit(incompleteProfile);
    }
  }

  if (!data.profile.username) {
    swapView('edit-profile');
  } else {
    swapView(data.view);
  }
});
