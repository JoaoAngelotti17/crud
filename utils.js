
const urlServer = "https://663c040017145c4d8c34f839.mockapi.io/Cliente";

let btns = document.querySelectorAll('a','.menuLink');
let currentUrl = window.location.href.split('?')[0];

for (let btn of btns) {
    
    if (btn.href === currentUrl) {
        btn.classList.add('active');
        break;
    }
}