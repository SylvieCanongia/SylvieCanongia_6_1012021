// function displayModal() {
//     const modal = document.getElementById("contact_modal");
// 	modal.style.display = "block";
// }

// function closeModal() {
//     const modal = document.getElementById("contact_modal");
//     modal.style.display = "none";
// }

// DOM Elements
const modalbg = document.querySelector(".contactModal__container");
const modalBtn = document.querySelectorAll(".contactButton");
const formData = document.querySelectorAll(".formData");
const closeModalCrossElement = document.querySelector(".close");
// get the form element
const forms = document.querySelectorAll("form[data-form]");
const formElement = document.querySelector("form[data-form]");
const modalBodyElement = document.querySelector(".contactModal__body");

// ==============================================
// === Modal subscription opening and closing ===
// ==============================================

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  // display the form content in case
  // it is not the first time the button is clicked
  formElement.style.display = "block";
  modalbg.style.display = "block";
}

// === Close the modal by click on the cross ===

// function to close the modal
const closeModal = () => {
  modalbg.style.display = "none";
}

// listen the event click on the cross
closeModalCrossElement.addEventListener("click", closeModal);

// =======================
// === Form validation ===
// =======================

// Check if form exist
if (forms.length > 0) {
  // Loop on all elements
  for (let form of forms) {
    // Get all inputs that have to be validated (have data-validate attribute)
    const inputs = form.querySelectorAll("[data-validate]");

    // Loops trough inputs to check them
    inputs.forEach((input) => {
      // Add input event to all inputs to check them with checkInput function
      input.addEventListener("submit", checkInput);
    });

    // Listen the form submit event and submit the form
    // bind allow to pass all inputs as argument
    form.addEventListener("submit", submitForm.bind(form, inputs));
  }
}

// ===================
// === CHECK INPUT ===
// ===================

// Check input
function checkInput() {
    console.log("entrée dans checkInput)");
  const input = this;
  validateInput(input);
  console.log(input)
}

// ======================
// === VALIDATE INPUT ===
// ======================

// Validate input
function validateInput(input) {
  // get the value and formData element for assigning error message
  // (via CSS pseudo-elements)
  const value = input.value;
  const formDataElement = input.closest("[data-formData]");
  // Declare error variable for displaying error messages and assign null by default
  let error = null;

  // Check if : -> if the input is not radio or checkbox
  // -> and input has data-required attribute
  //  -> and the value is empty and the value has a required minlength
  // -> the input value is < to the minlength
  if (
    input.type !== "radio" &&
    input.type !== "checkbox" &&
    input.dataset.required !== undefined &&
    input.dataset.minlength !== undefined &&
    value.length < input.dataset.minlength
  ) {
    // Set an error message to the data-error attribute for display to the user
    formDataElement.setAttribute(
      "data-error",
      `Ce champ est requis. Veuillez entrer au moins ${input.dataset.minlength} caractères.`
    );
    error = formDataElement.dataset.error;
  }

  // Check if input has data-email attribute and if email is not valid with validateEmail function
  if (input.dataset.email !== undefined && !validateEmail(value)) {
    formDataElement.setAttribute(
      "data-error",
      "Ce champ est requis. Veuillez entrer une adresse email valide."
    );
    error = formDataElement.dataset.error;
  }

  // Validate email using a regex
  function validateEmail(email) {
    const regexMail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexMail.test(String(email).toLowerCase());
  }

  // If there is no error, remove message from error element and so data-error attribute
  // and set data-error-visible attribute to false
  if (!error) {
    formDataElement.setAttribute("data-error-visible", "false");
    error = "";
    formDataElement.setAttribute("data-error", "");
  } else {
    formDataElement.setAttribute("data-error-visible", "true");
  }

  return error;
}

// ============================
// ======== SUBMITFORM ========
// ============================

// submit form on submit button click
// all inputs are passed as argument with bind to loop through inputs
// and call validateInput on each input element
function submitForm(inputs, event) {
  event.preventDefault();
  const errors = [];

  inputs.forEach((input) => {
    const error = validateInput(input);
    if (error) {
      errors.push(error);
    }
  });

  // Check if errors array is empty and only in that case, form is submited
  if (errors.length === 0) {
    // reset the form
    formElement.reset();
    confirmSubmission();
  }
}

// =========================
// === CONFIRM SUBMISSION ===
// ==========================

function confirmSubmission() {
  // hide the form content
  formElement.style.display = "none";

  // Display a message after form validation success
  // 1. Create a div element
  const divElement = document.createElement("div");
  divElement.className = "modal-confirm";

  // 2. Put a p element into the div element
  const pElement = document.createElement("p");
  pElement.textContent = "Merci pour votre message. Je vous répondrai dans les meilleurs délais.";

  divElement.appendChild(pElement);

  // Add a button for closing the confirmation modal
  const buttonElement = document.createElement("input");
  buttonElement.classList.add("btn-submit", "btn-close-modal");
  buttonElement.setAttribute("type", "button");
  buttonElement.setAttribute("value", "Fermer");

  divElement.appendChild(buttonElement);

  // Put the div element into the modal body
  modalBodyElement.appendChild(divElement);

  closeModalCrossElement.addEventListener("click", closeConfirmModal);

  const btnCloseModalElement = document.querySelector(".btn-close-modal");
  btnCloseModalElement.addEventListener("click", closeConfirmModal);
}

// ==================================
// === Modal confirmation closing ===
// ==================================

function closeConfirmModal() {
  // Select and remove the p Element
  modalBodyElement.querySelector("p").remove();
  // Select and remove the button Element
  modalBodyElement.querySelector(".btn-close-modal").remove();
  // Select and remove the div Element
  modalBodyElement.querySelector(".modal-confirm").remove();
  // close the modal
  modalbg.style.display = "none";
}

