document.addEventListener("DOMContentLoaded", () => {
    const inputBtn = document.getElementById("input-btn");
    const deleteBtn = document.getElementById("delete-btn");
    const tabBtn = document.getElementById("tab-btn");
    const inputEl = document.getElementById("input-el");
    const ulEl = document.getElementById("ul-el");

    ulEl.innerHTML = localStorage.getItem("ulElInnerHTML") ?? "";

    inputBtn.addEventListener("click", () => updateLeads(inputEl.value));

    deleteBtn.addEventListener("dblclick", () => {
        ulEl.innerHTML = "";
        localStorage.removeItem("ulElInnerHTML");
    });

    tabBtn.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0 && tabs[0].url) {
                updateLeads(tabs[0].url);
            } else {
                console.error("No active tab found.");
            }
        });
    });

    function updateLeads(lead) {
        ulEl.innerHTML += `
            <li>
                <a href="${lead}" target="_blank">
                    ${lead}
                </a>
            </li>
        `;

        localStorage.setItem("ulElInnerHTML", ulEl.innerHTML);

        inputEl.value = "";
    }
});
