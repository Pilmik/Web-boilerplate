//const testModules = require('./test-module');
//require('../css/app.css');

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
}

buttons.forEach(button =>{
    button.addEventListener('click', () => {
        togglePopup(popupAddTeacher);
    });
});

closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        if (popupAddTeacher.classList.contains('popup--active')) {
            togglePopup(popupAddTeacher);
        } else if (popupTeacherInfo.classList.contains('popup--active')) {
            togglePopup(popupTeacherInfo);
        }
    });
});

cards.forEach(card => {
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

nextButton.addEventListener('click', () => {
    carousel.scrollBy({
        left: 300, 
        behavior: 'smooth' 
    });
});

prevButton.addEventListener('click', () => {
    carousel.scrollBy({
        left: -300, 
        behavior: 'smooth' 
    });
});

//console.log(testModules.hello);
