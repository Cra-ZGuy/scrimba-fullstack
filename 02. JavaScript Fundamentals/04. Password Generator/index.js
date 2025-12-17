document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generate-btn");
    const password1 = document.getElementById("password-1");
    const password2 = document.getElementById("password-2");
    const themeToggle = document.getElementById("theme-toggle");
    const copied = document.getElementById("copied");

    const isDarkMode =
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    themeToggle.checked = isDarkMode;

    generatePasswords(password1, password2);

    generateBtn.addEventListener(
        "click",
        () => generatePasswords(password1, password2),
    );
    password1.addEventListener(
        "click",
        () => copyToClipboard(password1.textContent, copied),
    );
    password2.addEventListener(
        "click",
        () => copyToClipboard(password2.textContent, copied),
    );
});

window.addEventListener("load", () => {
    requestAnimationFrame(() => {
        setTimeout(() => {
            document.body.classList.remove("preload");
        }, 500);
    });
});

function generatePasswords(password1, password2) {
    password1.textContent = "";
    password2.textContent = "";

    for (let i = 0; i < 15; i++) {
        const char1 = String.fromCharCode(
            Math.floor(Math.random() * 94) + 33,
        );
        const char2 = String.fromCharCode(
            Math.floor(Math.random() * 94) + 33,
        );

        password1.textContent += char1;
        password2.textContent += char2;
    }
}

async function copyToClipboard(text, copied) {
    try {
        await navigator.clipboard.writeText(text);

        if (copied.timeoutId) {
            clearTimeout(copied.timeoutId)
        }

        copied.classList.add("copied-visible");

        copied.timeoutId = setTimeout(() => {
            copied.classList.remove("copied-visible");
        }, 2000);
    } catch (error) {
        console.error(error.message);
    }
}
