import { randomUserMock, additionalUsers } from './FE4U-Lab2-mock.js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// const testModules = require('./test-module');
// require('../css/app.css');

/** ******** Your code here! *********** */
const buttons = document.querySelectorAll('.add-teacher-button');
const popupAddTeacher = document.querySelector('.add__teacher');
const popupTeacherInfo = document.querySelector('.teacher__info');
const closeButtons = document.querySelectorAll('.popup__close');
const cards = document.querySelectorAll('.card');

const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.teacher__info .name');

const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.left-arrow-button');
const nextButton = document.querySelector('.right-arrow-button');

const togglePopup = (popup) => {
  popup.classList.toggle('popup--active');
  const isActive = popup.classList.contains('popup--active');
  popup.setAttribute('aria-hidden', !isActive);
};

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    togglePopup(popupAddTeacher);
  });
});

closeButtons.forEach((closeBtn) => {
  closeBtn.addEventListener('click', () => {
    if (popupAddTeacher.classList.contains('popup--active')) {
      togglePopup(popupAddTeacher);
    } else if (popupTeacherInfo.classList.contains('popup--active')) {
      togglePopup(popupTeacherInfo);
    }
  });
});
/*
cards.forEach((card) => {
  card.addEventListener('click', () => {
    togglePopup(popupTeacherInfo);
    const profileImageFrom = card.querySelector('.zoom-image');
    if (profileImageFrom) {
      const profileImageSrc = profileImageFrom.getAttribute('src');
      profileImage.style.backgroundImage = `url(${profileImageSrc})`;
    } else {
      profileImage.style.backgroundImage = 'url(./images/placeholder.png)';
    }
    const cardNameElements = card.querySelectorAll('h4');
    const firstName = cardNameElements[0].textContent;
    const lastName = cardNameElements[1].textContent;
    profileName.textContent = `${firstName} ${lastName}`;
  });
});
*/
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

// =======Lab02======= //

// =======Task 1======= //
let idCounter = 1;

function consolidateUsers(rUsers, aUsers) {
  const courses = [
    'Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing',
    'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics',
  ];

  const formattedRandomUsers = [];
  const formattedAddUsers = [];

  function getRandomCourse() {
    return courses[Math.floor(Math.random() * courses.length)];
  }

  function findMatchingUser(fullName, Users) {
    return Users.find((user) => fullName === user.full_name);
  }

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
        gender: g,
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
        gender: g,
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

  const properties = ['full_name', 'gender', 'state', 'city', 'country'];
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
  const sortCategories = ['full_name', 'age', 'b_day', 'country'];
  const sortedUsers = [...users];

  if (!sortCategories.includes(category)) {
    return [];
  }

  if (category === 'full_name') {
    sortedUsers.sort((a, b) => {
      const nameA = a.full_name ? a.full_name.toLowerCase() : '';
      const nameB = b.full_name ? b.full_name.toLowerCase() : '';

      if (nameA < nameB) return descending ? 1 : -1;
      if (nameA > nameB) return descending ? -1 : 1;
      return 0;
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
      const dateA = a.b_date ? new Date(a.b_date) : new Date(0);
      const dateB = b.b_date ? new Date(b.b_date) : new Date(0);

      return descending ? dateB - dateA : dateA - dateB;
    });
  }

  if (category === 'country') {
    sortedUsers.sort((a, b) => {
      const countryA = a.country ? a.country.toLowerCase() : '';
      const countryB = b.country ? b.country.toLowerCase() : '';

      if (countryA < countryB) return descending ? 1 : -1;
      if (countryA > countryB) return descending ? -1 : 1;
      return 0;
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
  const agePattern = /^[<>]=?\d+$|^\d+$/;

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
      searchValue = parseInt(cleanedInput, 10);
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

const testArray = consolidateUsers(randomUserMock, additionalUsers);
console.log(testArray);

console.log([...testArray].map(isValidUser));

console.log(filterUsers(testArray, {
  country: 'Germany', age: '30+', gender: 'Female',
}));

console.log(sortingUsers(testArray, { category: 'b_day' }));

console.log(sortingUsers(findUsers(testArray, '>=40'), { category: 'age', descending: false }));

console.log(findPercentage(testArray, '>70'));

console.log("Test");

// ========Lab 3======== //

// ========Task 1======== //
let teachersArray = consolidateUsers(randomUserMock, additionalUsers);
let currentPage = 1;
const teachersPerPage = 10;

function updateFavorites() {
  const favoritesContainer = document.querySelector('.favorites-teachers .carousel');
  favoritesContainer.innerHTML = '';

  const favoriteTeachers = teachersArray.filter(teacher => teacher.favorite);

  favoriteTeachers.forEach(teacher => {
    const favoriteCard = document.createElement('div');
    favoriteCard.classList.add('card');

    favoriteCard.innerHTML = `
      <div class="card-image">
        <img src="${teacher.picture_large || './images/placeholder.png'}" alt="Profile's photo" class="zoom-image">
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

const prevPageButton = document.querySelector('.prev-page');
const nextPageButton = document.querySelector('.next-page');

prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderTeachers(teachersArray, currentPage);
  }
});

nextPageButton.addEventListener('click', () => {
  const totalPages = Math.ceil(teachersArray.length / teachersPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderTeachers(teachersArray, currentPage);
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
  const favoriteButton = document.querySelector('.favorite-button');

  

  profileImage.style.backgroundImage = `url(${teacher.picture_large || './images/placeholder.png'})`;
  profileName.textContent = teacher.full_name;
  profileSpecialty.textContent = teacher.course;
  profileCity.textContent = `${teacher.city}, ${teacher.country}`;
  profileAgeSex.textContent = `${teacher.age}, ${teacher.gender}`;
  profileEmail.textContent = teacher.email;
  profilePhone.textContent = teacher.phone;

  favoriteButton.src = teacher.favorite ? '../images/filled-star.svg' : '../images/star.svg';

  favoriteButton.onclick = () => {
    teacher.favorite = !teacher.favorite;
    favoriteButton.src = teacher.favorite ? '../images/filled-star.svg' : '../images/star.svg';

    updateFavorites();

    renderTeachers(teachersArray, currentPage);
  };

  togglePopup(popupTeacherInfo);
}

function renderTeachers(teachers, page = 1) {
  const teachersContainer = document.querySelector('.teachers-profiles');
  teachersContainer.innerHTML = ''; 

  const startIndex = (page - 1) * teachersPerPage;
  const endIndex = startIndex + teachersPerPage;
  const teachersToDisplay = teachers.slice(startIndex, endIndex);

  teachersToDisplay.forEach(teacher => {
    const teacherCard = document.createElement('div');
    teacherCard.classList.add('card');

    const favoriteSign = teacher.favorite ? `
      <div class="card-sign">
        <img src="./images/pngwing.com.png" alt="Star sign">
      </div>` : '';

    teacherCard.innerHTML = `
      ${favoriteSign}
      <div class="card-image">
        <img src="${teacher.picture_large || './images/placeholder.png'}" alt="Profile's photo" class="zoom-image">
      </div>
      <div class="card-info">
        <h4>${teacher.full_name.split(' ')[0]}</h4>
        <h4>${teacher.full_name.split(' ')[1]}</h4>
        <p class="specialization">${teacher.course}</p>
        <p class="country">${teacher.country}</p>
      </div>
    `;

    teacherCard.addEventListener('click', () => {
      showTeacherDetails(teacher);
    });

    teachersContainer.appendChild(teacherCard);
  });
}

renderTeachers(teachersArray, currentPage);
updateFavorites();
// console.log(testModules.hello);
