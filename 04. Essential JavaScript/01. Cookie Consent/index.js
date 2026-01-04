class CookieConsent {
    static init() {
        /**
         * @type {HTMLElement}
         */
        const modalEl = document.getElementById("modal");

        /**
         * @type {HTMLButtonElement}
         */
        const closeBtn = document.getElementById("modal-close-btn");

        /**
         * @type {HTMLFormElement}
         */
        const consentForm = document.getElementById("consent-form");

        /**
         * @type {HTMLElement}
         */
        const modalTextEl = document.getElementById("modal-text");

        /**
         * @type {HTMLElement}
         */
        const modalChoiceBtnsEl = document.getElementById("modal-choice-btns");

        /**
         * @type {HTMLButtonElement}
         */
        const declineBtn = document.getElementById("decline-btn");

        closeBtn.addEventListener("click", () => {
            modalEl.style.display = "none";
        });

        consentForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(consentForm);
            const fullName = formData.get("fullName");

            modalTextEl.innerHTML = `<div class="modal-inner-loading">
                <img src="images/loading.svg" class="loading">
                <p id="upload-text">
                    Uploading your data to the dark web...
                </p>
            </div>`;

            setTimeout(() => {
                document.getElementById("upload-text").innerText =
                    `Making the sale...`;
            }, 1500);

            setTimeout(() => {
                document.getElementById("modal-inner").innerHTML = `
                <h2>Thanks <span class="modal-display-name">${fullName}</span>, you sucker! </h2>
                <p>We just sold the rights to your eternal soul.</p>
                <div class="idiot-gif">
                    <img src="images/pirate.gif">
                </div>`;

                closeBtn.disabled = false;
            }, 3000);
        });

        declineBtn.addEventListener("mouseenter", () => {
            modalChoiceBtnsEl.classList.toggle("reverse");
        });

        setTimeout(() => {
            modalEl.style.display = "inline";
        }, 1500);
    }
}

document.addEventListener("DOMContentLoaded", () => CookieConsent.init());
