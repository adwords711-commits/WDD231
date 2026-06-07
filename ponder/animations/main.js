const green = document.querySelector('.green');
const blue = document.querySelector('.blue');

green.addEventListener('click', function() {
    blue.classList.toggle('show');
});