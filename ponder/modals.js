const modal = document.getElementById("modal");
// gets the modal container (<div id="modal">)
const openButton = document.getElementById("open-modal");
const closeButton = document.querySelector(".close-button");

function openModal() {
    modal.classList.add("open");

    modal.setAttribute("aria-hidden", false);
}
function closeModal () {
    modal.classList.remove("open");

    modal.setAttribute("aria-hidden", "true");
}

openButton.addEventListener("click", openModal);
// whe the open button is clicked ,  run openModal()
closeButton.addEventListener("click", closeModal);
// when the X button is clicked , run the closeModal()

window.addEventListener("keydown", function (envent) {
    //listens for any key press anywhere on the page

    if (event.key === "Escape") {
        // checks if the pressed key is Escape
        closeModal();
        // closes the modal when Escape is pressed
    }
});

window.addEventListener("click", function (event) {
    //listens for any clicks on the page

    if (event.target === modal) {
        // checks if the user clicked directly on the overlay (not the white box)
        closeModal();
        // closes the modal if click is outside modal-content
    }
})