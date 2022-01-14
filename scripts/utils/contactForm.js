document.addEventListener('DOMContentLoaded', () => { 

  // DOM Elements
  const modalbg = document.querySelector(".contactModal__container");
  
  const formData = document.querySelectorAll(".formData");
  const closeModalCrossElement = document.querySelector(".close");
  // get the form element
  const forms = document.querySelectorAll("form[data-form]");
  const formElement = document.querySelector("form[data-form]");
  const modalBodyElement = document.querySelector(".contactModal__body");

  // Managing of the errors
  let error;
  let errors;

  // ==================================
  // === CONTROLS AND ACCESSIBILITY ===
  // ==================================

  // Get all the triggers of type : aria-haspopup="dialog"
  const triggers = document.querySelectorAll('[aria-haspopup="dialog"]');
  const mainElement = document.querySelector('.main');

  // array of all the focusable elements of the modal window
  const focusableElementsArray = [
    '[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];

  const keyValues = {
    enter: 'Enter',
    escape: 'Escape',
    tab: 'Tab'
  };

  // ==============================================
  // === Modal contact opening and closing ===
  // ==============================================
 
  // ==================
  // === OPEN MODAL ===

  /**
   * Open the modal set as argument and set focus on the first focusable element
   * @param {HTMLElement} dialog Modal element to open
   * @returns Return if the modal has no focusable elements
   */
  const openModal = (dialog) => {
    // Select all the focusable elements of the modal, the first and the last
    const focusableElements = dialog.querySelectorAll(focusableElementsArray);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
     // Activate modal and disable main element when modal window opens
    dialog.setAttribute('aria-hidden', false);
    mainElement.setAttribute('aria-hidden', true);

    // return if no focusable element
    if(!firstFocusableElement) {
      return;
    }

    // Set focus on the first focusable element with a delay
    // to focus after the open modal animation
    window.setTimeout(() => {
      firstFocusableElement.focus();

      // keep the focus inside the dialog
      focusableElements.forEach((focusableElement) => {
        if(focusableElement.addEventListener) {
          console.log(focusableElement)
          focusableElement.addEventListener('keydown', (event) => {
            const tab = event.key === keyValues.tab;

            if(!tab) {
              return;
            }

            // Then if tab is pressed :
            if(event.shiftKey) {
              if(event.target === firstFocusableElement) {
                event.preventDefault();
                lastFocusableElement.focus();
              }
            } else if (event.target === lastFocusableElement) {
                event.preventDefault();
                firstFocusableElement.focus();
            }
          });
        }
      });
    }, 100);
  };

  // ==================
  // === CLOSE MODAL ===

  /**
   * Close the modal, remove error messages and restore the focus on opening trigger
   * @param {HTMLElement} dialog Modal element to be close
   * @param {HTMLElement} trigger Trigger on which to restore focus after closing
   */
  const closeModal = (dialog, trigger) => {
    dialog.setAttribute('aria-hidden', true);
    mainElement.setAttribute('aria-hidden', false);

    // Removes the error messages
    formData.forEach(formD => {
      formD.setAttribute("data-error-visible", "false");
      formD.setAttribute("data-error", "");
    });
    error = "";

    // Restore focus on the trigger that open the modal
    trigger.focus();
  };

  triggers.forEach((trigger) => {
    // Get the modal linked to the trigger via aria-controls attribute
    const dialog = document.getElementById(trigger.getAttribute('aria-controls'));
    
    // Get all the triggers for closing the modal via data attribute
    const closeTriggers = dialog.querySelectorAll('[data-close]');

    // Open the dialog modal via event 'click' on button
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(dialog);
    });

    // Open the dialog modal on pressing 'Enter' key
    trigger.addEventListener('keydown', (event) => {
      if(event.key === keyValues.enter) {
        event.preventDefault();
        openModal(dialog);
      }
    });

    // CLOSE THE DIALOG MODAL

    closeTriggers.forEach((closeTrigger) => {
      // Get the modal matching with the trigger via the id
      const dialogModalToClose = document.getElementById(closeTrigger.dataset.close);
      
      //  Close by click on the trigger
      closeTrigger.addEventListener('click', (event) => {
        closeModal(dialogModalToClose, trigger);
      });
    });

    // Close the dialog modal on pressing 'Escape' key
    dialog.addEventListener('keydown', (event) => {
      if(event.key === keyValues.escape) {
        event.preventDefault();
        console.log('escape')
        closeModal(dialog, trigger);
      }
    });

    // Close the modal by click on modal background
    window.addEventListener('click', (event) => {
      if(event.target === dialog) {
        closeModal(dialog, trigger);
      }
    });
  });

  // =======================
  // === Form validation ===
  // =======================

  // Check if form exist
  if (forms.length > 0) {
    // Loop on all elements
    for (let form of forms) {
      // Get all inputs that have to be validated (have data-validate attribute)
      const inputs = form.querySelectorAll("[data-validate]");

      // Listen the form submit event and submit the form
      // bind allow to pass all inputs as argument
      form.addEventListener("submit", submitForm.bind(form, inputs));
    }
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
    error = null;

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
    errors = [];

    inputs.forEach((input) => {
      const error = validateInput(input);
      if (error) {
        errors.push(error);
      }
    });

    // Check if errors array is empty and only in that case, form is submited
    if (errors.length === 0) {
      logDatas();
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

  // ========================================
  // === Get the form datas ===
  // === and display them in the console ====
  // ========================================

  function logDatas() {
    const datas = document.querySelectorAll('[data-validate]');
    datas.forEach(data => {
      console.log(`${data.name} : ${data.value}`);
    })
  }

});