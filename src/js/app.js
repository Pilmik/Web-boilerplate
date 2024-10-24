import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { randomUserMock, additionalUsers } from './FE4U-Lab2-mock.js';

// const testModules = require('./test-module');
// require('../css/app.css');

/** ******** Your code here! *********** */
const popupTeacherInfo = document.querySelector('.teacher__info');
const popupAddTeacher = document.querySelector('.add__teacher');
const closeButtons = document.querySelectorAll('.popup__close');
const prevButton = document.querySelector('.left-arrow-button');
const nextButton = document.querySelector('.right-arrow-button');
const carousel = document.querySelector('.carousel');

const togglePopup = (popup) => {
  popup.classList.toggle('popup--active');
  const isActive = popup.classList.contains('popup--active');
  popup.setAttribute('aria-hidden', !isActive);
};

closeButtons.forEach((closeBtn) => {
  closeBtn.addEventListener('click', () => {
    if (popupAddTeacher.classList.contains('popup--active')) {
      togglePopup(popupAddTeacher);
    } else if (popupTeacherInfo.classList.contains('popup--active')) {
      togglePopup(popupTeacherInfo);
    }
  });
});

function closePopup() {
  togglePopup(popupAddTeacher);
}

// =======Lab02======= //

// =======Task 1======= //
let idCounter = 1;

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  return age;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const courses = [
  'Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing',
  'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics',
];

function consolidateUsers(rUsers, aUsers) {
  const formattedRandomUsers = [];
  const formattedAddUsers = [];

  function getRandomCourse() {
    return courses[Math.floor(Math.random() * courses.length)];
  }

  function findMatchingUser(fullName, Users) {
    return Users.find((user) => fullName === user.full_name);
  }

  function formatRandomUsers(randomUsers) {
    randomUsers.forEach(({
      gender: g = null,
      name: { title: t = null, first: f = null, last: l = null } = {},
      location: {
        city: c = null,
        state: s = null,
        country: ct = null,
        postcode: pc = null,
        coordinates: coor = null,
        timezone: tmz = null,
      } = {},
      email: em = null,
      dob: { date: d = null, age: ag = null } = {},
      phone: ph = null,
      id: { name: nm = null, value: vl = null } = {},
      picture: { large: lg = null, thumbnail: thb = null } = {},
      nat = null,
    }) => {
      const calculatedAge = ag ?? (d ? calculateAge(d) : null);
      const isMatched = findMatchingUser(`${f} ${l}`, additionalUsers);
      const userId = nm && vl ? `${nm}${vl}` : isMatched?.id ?? `TEMP_ID${idCounter += 1}`;
      const fav = isMatched?.favorite ?? false;
      const cour = getRandomCourse();
      const bgc = isMatched?.bg_color ?? '#fc6c5c';
      const nt = isMatched?.note ?? '';
      formattedRandomUsers.push({
        gender: capitalizeFirstLetter(g),
        title: t,
        full_name: `${f} ${l}`,
        city: c,
        state: s,
        country: ct,
        nat,
        postcode: pc,
        coordinates: coor,
        timezone: tmz,
        email: em,
        b_date: d,
        age: calculatedAge,
        phone: ph,
        picture_large: lg,
        picture_thumbnail: thb,
        id: userId,
        favorite: fav,
        course: cour,
        bg_color: bgc,
        note: nt,
      });
    });
  }
  function formatAdditionalUsers(addUsers) {
    addUsers.forEach(({
      gender: g = null,
      title: t = null,
      full_name: fn = null,
      city: c = null,
      state: s = null,
      country: ct = null,
      nat = null,
      postcode: pc = null,
      coordinates: coor = null,
      timezone: tmz = null,
      email: em = null,
      b_day: bd = null,
      age: ag = null,
      picture_large: lg = null,
      picture_thumbnail: thb = null,
      id: userId = null,
      favorite: fav = null,
      bg_color: bgc = null,
      note: nt = null,
    }) => {
      const calculatedAge = ag ?? (bd ? calculateAge(bd) : null);
      const safeFn = fn ?? '';
      const isMatched = findMatchingUser(safeFn, formattedRandomUsers);
      const finalId = userId === null ? `TEMP_ID${idCounter += 1}` : userId;
      const finalFavorite = fav === null ? false : fav;
      const finalBgColor = bgc === null ? '#fc6c5c' : bgc;
      const finalNote = nt === null ? '' : nt;
      if (isMatched) {
        return;
      }
      formattedAddUsers.push({
        gender: capitalizeFirstLetter(g),
        title: t,
        full_name: fn,
        city: c,
        state: s,
        country: ct,
        nat,
        postcode: pc,
        coordinates: coor,
        timezone: tmz,
        email: em,
        b_date: bd,
        age: calculatedAge,
        picture_large: lg,
        picture_thumbnail: thb,
        id: finalId,
        favorite: finalFavorite,
        course: getRandomCourse(),
        bg_color: finalBgColor,
        note: finalNote,
      });
    });
  }

  formatRandomUsers(rUsers);
  formatAdditionalUsers(aUsers);

  return [...formattedRandomUsers, ...formattedAddUsers];
}

// =======Task 2======= //
function isUpper(char) {
  return char === char.toUpperCase() && char !== char.toLowerCase();
}

function isValidNumber(phone, nat) {
  if (typeof phone !== 'string' || !phone.trim()) {
    return false;
  }
  if (typeof nat !== 'string' || !nat.trim()) {
    return false;
  }
  const phoneNumber = parsePhoneNumberFromString(phone, nat);

  return phoneNumber && phoneNumber.isValid();
}

function isValidUser(user) {
  const errors = {};

  const properties = ['full_name', 'gender', 'city', 'country'];
  properties.forEach((p) => {
    if (!user[p]) {
      errors[p] = `${p} is required.`;
    } else if (typeof user[p] !== 'string' || !isUpper(user[p][0])) {
      errors[p] = `${p} must start with a capital letter and be a string.`;
    }
  });

  if (user.note && (typeof user.note !== 'string' || !isUpper(user.note[0]))) {
    errors.note = 'Note must start with a capital letter and be a string.';
  }

  if (typeof user.age !== 'number' || Number.isNaN(user.age)) {
    errors.age = 'age must be a number.';
  }

  if (!isValidNumber(user.phone, user.nat)) {
    errors.phone = 'invalid phone number or cannot be recognized.';
  }

  if (typeof user.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.email = 'email must be a valid email address.';
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
}

// =======Task 3======= //
function filterUsers(users, {
  country = false, age = false, gender = false, favorite = false,
} = {}) {
  let filteredUsers = [...users];

  if (country) {
    filteredUsers = filteredUsers.filter((user) => user.country === country);
  }

  if (age) {
    if (age.includes('-')) {
      const [minAge, maxAge] = age.split('-').map(Number);
      filteredUsers = filteredUsers.filter((user) => user.age >= minAge && user.age <= maxAge);
    } else if (age.includes('+')) {
      const minAge = parseInt(age, 10);
      filteredUsers = filteredUsers.filter((user) => user.age >= minAge);
    }
  }

  if (gender) {
    filteredUsers = filteredUsers.filter((user) => user.gender === gender);
  }

  if (favorite) {
    filteredUsers = filteredUsers.filter((user) => user.favorite === favorite);
  }

  return filteredUsers;
}

// =======Task 4======= //
function sortingUsers(users, { category, descending = false } = {}) {
  const sortCategories = ['full_name', 'age', 'b_day', 'country', 'course', 'gender'];
  const sortedUsers = [...users];

  if (!sortCategories.includes(category)) {
    return [];
  }

  if (category === 'full_name' || category === 'country' || category === 'course' || category === 'gender') {
    sortedUsers.sort((a, b) => {
      const fieldA = a[category] ? a[category].toLowerCase() : '';
      const fieldB = b[category] ? b[category].toLowerCase() : '';

      return descending
        ? fieldB.localeCompare(fieldA)
        : fieldA.localeCompare(fieldB);
    });
  }

  if (category === 'age') {
    sortedUsers.sort((a, b) => {
      const ageA = a.age !== null ? a.age : Infinity;
      const ageB = b.age !== null ? b.age : Infinity;

      return descending ? ageB - ageA : ageA - ageB;
    });
  }

  if (category === 'b_day') {
    sortedUsers.sort((a, b) => {
      const dateA = a.b_date ? new Date(a.b_date) : Infinity;
      const dateB = b.b_date ? new Date(b.b_date) : Infinity;

      return descending ? dateB - dateA : dateA - dateB;
    });
  }
  return sortedUsers;
}

// =======Task 5======= //

function findUsers(users, input) {
  const foundedUsers = [...users];

  if (typeof input === 'number') {
    return foundedUsers.filter((user) => user.age === input);
  }

  const cleanedInput = input.replace(/\s+/g, ' ').trim();
  const fullNamePattern = /^[A-Za-z]+( [A-Za-z]+)?$/;
  const agePattern = /^[<>]?=?\d+$/;

  if (fullNamePattern.test(cleanedInput)) {
    const result = foundedUsers.filter((user) => user.full_name
    && user.full_name.toLowerCase().includes(cleanedInput.toLowerCase()));
    if (result.length > 0) {
      return result;
    }
  }
  if (agePattern.test(cleanedInput)) {
    let operator = '=';
    let searchValue = cleanedInput;

    if (/^[<>]=?\d+$/.test(cleanedInput)) {
      const [firstChar, secondChar] = cleanedInput;
      operator = firstChar;
      if (secondChar === '=') {
        operator += '=';
      }
      searchValue = parseInt(cleanedInput.replace(/[<>=]/g, '').trim(), 10);
    } else {
      searchValue = parseInt(cleanedInput.replace(/[<>=]/g, '').trim(), 10);
    }

    return foundedUsers.filter((user) => {
      const userAge = user.age;
      switch (operator) {
        case '>':
          return userAge > searchValue;
        case '>=':
          return userAge >= searchValue;
        case '<':
          return userAge < searchValue;
        case '<=':
          return userAge <= searchValue;
        case '=':
        default:
          return userAge === searchValue;
      }
    });
  }

  return foundedUsers.filter((user) => user.note
  && user.note.toLowerCase().includes(cleanedInput.toLowerCase()));
}

// =======Task 6======= //

function findPercentage(users, input) {
  const foundedUsers = findUsers(users, input);
  const allUsers = users.length;

  if (allUsers === 0) {
    return 0;
  }

  const numberOfUsersFound = foundedUsers.length;
  const percentage = (numberOfUsersFound / allUsers) * 100;

  return Number(percentage.toFixed(2));
}

// ========Lab 3======== //

// ========Task 1======== //
const teachersArray = consolidateUsers(randomUserMock, additionalUsers);
let filteredTeachersArray = [...teachersArray];

let currentPage = 1;
const teachersPerPage = 10;
const currentFavoritePage = 1;

const favoritesPerPage = 5;
let totalFavoritePages = 0;

function updateFavorites() {
  const favoritesContainer = document.querySelector('.favorites-teachers .carousel');
  favoritesContainer.innerHTML = '';

  const favoriteTeachers = teachersArray.filter((teacher) => teacher.favorite);
  totalFavoritePages = Math.ceil(favoriteTeachers.length / favoritesPerPage);

  const startIndex = (currentFavoritePage - 1) * favoritesPerPage;
  const endIndex = startIndex + favoritesPerPage;
  const visibleTeachers = favoriteTeachers.slice(startIndex, endIndex);

  visibleTeachers.forEach((teacher) => {
    const favoriteCard = document.createElement('div');
    favoriteCard.classList.add('card');

    favoriteCard.innerHTML = `
      <div class="card-image">
      ${teacher.picture_large
    ? `<img src="${teacher.picture_large}" alt="Profile's photo" class="zoom-image">`
    : `${teacher.full_name.split(' ')[0][0]}.${teacher.full_name.split(' ')[1][0]}.`
}
      </div>
      <div class="card-info">
        <h4>${teacher.full_name.split(' ')[0]}</h4>
        <h4>${teacher.full_name.split(' ')[1]}</h4>
        <p class="country">${teacher.country}</p>
      </div>
    `;

    favoriteCard.addEventListener('click', () => {
      showTeacherDetails(teacher);
    });

    favoritesContainer.appendChild(favoriteCard);
  });
}

nextButton.addEventListener('click', () => {
  carousel.scrollBy({
    left: 300,
    behavior: 'smooth',
  });
});

prevButton.addEventListener('click', () => {
  carousel.scrollBy({
    left: -300,
    behavior: 'smooth',
  });
});

const prevPageButton = document.querySelector('.prev-page');
const nextPageButton = document.querySelector('.next-page');

function renderTable(teachers, page = 1) {
  const tableBody = document.querySelector('#table-body');
  tableBody.innerHTML = '';

  if (teachers.length === 0) {
    tableBody.innerHTML = '<tr><td>No results found</td></tr>';
    return;
  }

  const startIndex = (page - 1) * statRecordsPerPage;
  const endIndex = startIndex + statRecordsPerPage;
  const pageTeachers = teachers.slice(startIndex, endIndex);

  pageTeachers.forEach((teacher) => {
    const row = `
      <tr>
        <td>${teacher.full_name}</td>
        <td>${teacher.course}</td>
        <td>${teacher.age}</td>
        <td>${teacher.gender}</td>
        <td>${teacher.country}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });

  updatePagination(teachers.length);
}

prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderTeachers(filteredTeachersArray, currentPage);
    renderTable(filteredTeachersArray, currentPage);
  }
});

nextPageButton.addEventListener('click', () => {
  const totalPages = Math.ceil(filteredTeachersArray.length / teachersPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderTeachers(filteredTeachersArray, currentPage);
    renderTable(filteredTeachersArray, currentPage);
  }
});

function showTeacherDetails(teacher) {
  const popupTeacherInfo = document.querySelector('.teacher__info');
  const profileImage = document.querySelector('.profile__image');
  const profileName = document.querySelector('.teacher__info .name');
  const profileSpecialty = document.querySelector('.teacher__info .specialty');
  const profileCity = document.querySelector('.teacher__info .city');
  const profileAgeSex = document.querySelector('.teacher__info .age-sex');
  const profileEmail = document.querySelector('.teacher__info .email');
  const profilePhone = document.querySelector('.teacher__info .phone');
  const profileNote = document.querySelector('.teacher__info .note');
  const favoriteButton = document.querySelector('.favorite-button');

  profileImage.style.backgroundImage = `url(${teacher.picture_large || './images/placeholder.png'})`;
  profileName.textContent = teacher.full_name;
  profileSpecialty.textContent = teacher.course;
  profileCity.textContent = `${teacher.city}, ${teacher.country}`;
  profileAgeSex.textContent = `${teacher.age}, ${teacher.gender}`;
  profileEmail.textContent = teacher.email;
  profilePhone.textContent = teacher.phone;
  profileNote.textContent = teacher.note ? teacher.note : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.`;

  favoriteButton.src = teacher.favorite ? '../images/filled-star.svg' : '../images/star.svg';

  favoriteButton.onclick = () => {
    teacher.favorite = !teacher.favorite;
    favoriteButton.src = teacher.favorite ? '../images/filled-star.svg' : '../images/star.svg';

    updateFavorites();
    applyFilters();
  };

  togglePopup(popupTeacherInfo);
}
function generateRegions() {
  const teachersRegion = [];
  teachersArray.forEach((teacher) => {
    if (!teachersRegion.includes(teacher.country)) {
      teachersRegion.push(teacher.country);
    }
  });
  const regionOptions = teachersRegion.map((region) => `<option value="${region}">${region}</option>`);
  const regionSelect = document.getElementById('region');
  const countrySelect = document.getElementById('country');
  regionSelect.innerHTML += regionOptions.join('');
  countrySelect.innerHTML += regionOptions.join('');
}

function generateSpecialty() {
  const specialtySelect = document.getElementById('specialty');
  const specialtyOptions = courses.map((course) => `<option value="${course}">${course}</option>`);
  specialtySelect.innerHTML = specialtyOptions;
}

function renderTeachers(teachers, page = 1) {
  const teachersContainer = document.querySelector('.teachers-profiles');
  teachersContainer.innerHTML = '';

  if (teachers.length === 0) {
    teachersContainer.innerHTML = '<h3>No teachers found</h3>';
    return;
  }

  const startIndex = (page - 1) * teachersPerPage;
  const endIndex = startIndex + teachersPerPage;
  const teachersToDisplay = teachers.slice(startIndex, endIndex);

  teachersToDisplay.forEach((teacher) => {
    const teacherCard = document.createElement('div');
    teacherCard.classList.add('card');

    const favoriteSign = teacher.favorite ? `
      <div class="card-sign">
        <img src="./images/pngwing.com.png" alt="Star sign">
      </div>` : '';

    teacherCard.innerHTML = `
      ${favoriteSign}
      <div class="card-image">
      ${teacher.picture_large
    ? `<img src="${teacher.picture_large}" alt="Profile's photo" class="zoom-image">`
    : `${teacher.full_name.split(' ')[0][0]}.${teacher.full_name.split(' ')[1][0]}.`
}
      </div>
      <div class="card-info">
        <h4>${teacher.full_name.split(' ')[0]}</h4>
        <h4>${teacher.full_name.split(' ')[1]}</h4>
        <p class="specialization">${teacher.course}</p>
        <p class="country">${teacher.country}</p>
      </div>
    `;

    const cardImage = teacherCard.querySelector('.card-image');
    cardImage.style.borderColor = teacher.bg_color || '#fc6c5c';
    cardImage.style.color = teacher.bg_color || '#fc6c5c';

    teacherCard.addEventListener('click', () => {
      showTeacherDetails(teacher);
    });

    teachersContainer.appendChild(teacherCard);
  });
}

renderTeachers(teachersArray, currentPage);
generateRegions();
generateSpecialty();
updateFavorites();

// ========Task 2======== //

function applyFilters() {
  const ageFilter = document.getElementById('age').value;
  const regionFilter = document.getElementById('region').value;
  const genderFilter = document.getElementById('sex').value;
  const photoFilter = document.getElementById('photo-point').checked;
  const favoriteFilter = document.getElementById('favorites-point').checked;

  filteredTeachersArray = filterUsers(teachersArray, {
    age: ageFilter,
    country: regionFilter,
    gender: genderFilter,
    favorite: !!favoriteFilter,
  });

  if (photoFilter) {
    filteredTeachersArray = filteredTeachersArray.filter((teacher) => teacher.picture_large);
  }

  currentPage = 1;
  renderTable(filteredTeachersArray, currentPage);
  renderTeachers(filteredTeachersArray, currentPage);
}

document.getElementById('age').addEventListener('change', applyFilters);
document.getElementById('region').addEventListener('change', applyFilters);
document.getElementById('sex').addEventListener('change', applyFilters);
document.getElementById('photo-point').addEventListener('change', applyFilters);
document.getElementById('favorites-point').addEventListener('change', applyFilters);

// ========Task 3======== //
const currentStatPage = 1;
const statRecordsPerPage = 10;
let sortDirection = false;

function updatePagination(totalRecords) {
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(totalRecords / statRecordsPerPage);

  for (let i = 1; i <= totalPages; i += 1) {
    paginationContainer.innerHTML += `
      <li class="page-item"><a class="page-link" href="#">${i}</a></li>
    `;
  }

  document.querySelectorAll('.page-link').forEach((link, index) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      currentPage = index + 1;
      renderTable(filteredTeachersArray, currentPage);
      renderTeachers(filteredTeachersArray, currentPage);
    });
  });
}

document.querySelectorAll('th').forEach((th) => {
  const arrowDiv = document.createElement('div');
  arrowDiv.classList.add('arrow-bottom');
  th.appendChild(arrowDiv);
});

function handleSort(category) {
  sortDirection = !sortDirection;
  filteredTeachersArray = sortingUsers([...filteredTeachersArray],
    { category, descending: sortDirection });

  document.querySelectorAll('.arrow-bottom').forEach((arrow) => arrow.classList.remove('rotate'));

  const currentTh = document.querySelector(`#sort-${category}`);
  const arrowDiv = currentTh.querySelector('.arrow-bottom');

  if (!sortDirection) {
    arrowDiv.classList.add('rotate');
  }
  renderTable(filteredTeachersArray, currentPage);
  renderTeachers(filteredTeachersArray, currentPage);
}

document.querySelector('#sort-full_name').addEventListener('click', () => handleSort('full_name'));
document.querySelector('#sort-course').addEventListener('click', () => handleSort('course'));
document.querySelector('#sort-age').addEventListener('click', () => handleSort('age'));
document.querySelector('#sort-gender').addEventListener('click', () => handleSort('gender'));
document.querySelector('#sort-country').addEventListener('click', () => handleSort('country'));

renderTable(teachersArray, currentStatPage);

// ========Task 4======== //
document.querySelector('.search-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const searchInput = document.querySelector('#form-searching').value;
  filteredTeachersArray = findUsers(teachersArray, searchInput);

  renderTable(filteredTeachersArray);
  renderTeachers(filteredTeachersArray);
});

document.querySelector('#form-searching').addEventListener('input', () => {
  const searchInput = document.querySelector('#form-searching').value;

  if (searchInput === '') {
    renderTable(teachersArray);
    renderTeachers(teachersArray);
  }
});

// ========Task 5======== //
const outButtons = document.querySelectorAll('.add-teacher-button');
outButtons.forEach((button) => {
  button.addEventListener('click', () => {
    togglePopup(popupAddTeacher);
  });
});

function displayErrors(errors) {
  const errorContainer = document.querySelector('.error-container');
  errorContainer.innerHTML = '';

  let errorMessages = '';

  Object.entries(errors).forEach(([field, errorMessage]) => {
    if (field === 'general') {
      errorMessages += `<p>${errorMessage}</p>`;
    } else {
      errorMessages += `<p>${errorMessage}</p>`;
    }
  });
  errorContainer.innerHTML = errorMessages;
}

function clearValidationStyles() {
  const errorContainer = document.querySelector('.error-container');

  if (errorContainer) {
    errorContainer.innerHTML = '';
  }
}

document.querySelector('.add-teacher.button').addEventListener('click', (event) => {
  event.preventDefault();

  clearValidationStyles();

  const city = document.querySelector('#city')?.value ?? '';
  const name = document.querySelector('#name')?.value ?? '';
  const specialty = document.querySelector('#specialty')?.value ?? '';
  const country = document.querySelector('#country')?.value ?? '';
  const email = document.querySelector('#email')?.value ?? '';
  const phone = document.querySelector('#phone')?.value ?? '';
  const birthDate = document.querySelector('#date')?.value ?? '';
  const sexElement = document.querySelector('input[name="sex"]:checked');
  const sex = sexElement?.value ?? '';
  const bgcolor = document.querySelector('#bgcolor')?.value ?? '';
  const notes = document.querySelector('#notes')?.value ?? '';

  const newTeacher = {
    full_name: name,
    course: specialty,
    country,
    city,
    email,
    phone,
    b_date: birthDate,
    age: calculateAge(birthDate),
    gender: sex,
    bg_color: bgcolor,
    note: notes,
    nat: country,
  };

  const existingTeacher = teachersArray
    .find((teacher) => teacher.full_name === newTeacher.full_name);

  if (existingTeacher) {
    displayErrors({ general: 'A teacher with this name and email already exists.' });
    return;
  }

  const validation = isValidUser(newTeacher);

  if (!validation.isValid) {
    displayErrors(validation.errors);
    return;
  }

  teachersArray.push(newTeacher);

  filteredTeachersArray = [...teachersArray];
  renderTable(teachersArray);
  renderTeachers(teachersArray);

  closePopup();
});

// console.log(testModules.hello);
