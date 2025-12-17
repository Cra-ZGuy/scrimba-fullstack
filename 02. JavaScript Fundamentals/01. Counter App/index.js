document.addEventListener("DOMContentLoaded", () => {
    let hasSaved = false;
    const countLabel = document.getElementById("count");
    const incButton = document.getElementById("increment-btn");
    const saveButton = document.getElementById("save-btn");
    const prevEntries = document.getElementById("previous-entries");

    incButton.addEventListener("click", () => {
        let count = parseInt(countLabel.innerText);
        count += 1;
        countLabel.innerText = count.toString();
    });

    saveButton.addEventListener("click", () => {
        if (hasSaved) {
            prevEntries.innerText += ` - ${countLabel.innerText}`;
        } else {
            prevEntries.innerText += ` ${countLabel.innerText}`;
        }

        countLabel.innerText = "0";
        hasSaved = true;
    });
});
