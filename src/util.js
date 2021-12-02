export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.removeItem('userData');
}

export function notificationFunc(errorMessage) {
    const errorBox = document.querySelector('#errorBox')
    errorBox.style.display = 'inline-block';
    errorBox.querySelector('span').textContent = errorMessage;
    setTimeout(() => {errorBox.style.display = 'none'}, 3000);
}