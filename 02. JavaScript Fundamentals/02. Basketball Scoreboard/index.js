document.addEventListener("DOMContentLoaded", () => {
    const homeScoreEl = document.getElementById("score-home");
    const guestScoreEl = document.getElementById("score-guest");
    const homeAdd1Btn = document.getElementById("home-add-1");
    const homeAdd2Btn = document.getElementById("home-add-2");
    const homeAdd3Btn = document.getElementById("home-add-3");
    const guestAdd1Btn = document.getElementById("guest-add-1");
    const guestAdd2Btn = document.getElementById("guest-add-2");
    const guestAdd3Btn = document.getElementById("guest-add-3");

    homeScoreEl.textContent = "";
    guestScoreEl.textContent = "";

    /**
     * Updates the score display for a team.
     * @param {boolean} isHomeTeam
     * @param {number} score
     */
    function updateScoreDisplay(isHomeTeam, score) {
        const scoreEl = isHomeTeam ? homeScoreEl : guestScoreEl;
        const textContent = scoreEl.textContent;
        const currentScore = parseInt(textContent === "" ? 0 : textContent);
        const newScore = currentScore + score;

        if (newScore >= 100) {
            scoreEl.textContent = "99";
        } else if (newScore >= 10) {
            scoreEl.textContent = newScore;
        } else {
            scoreEl.textContent = "\u00A0" + newScore;
        }
    }

    homeAdd1Btn.addEventListener("click", () => updateScoreDisplay(true, 1));
    homeAdd2Btn.addEventListener("click", () => updateScoreDisplay(true, 2));
    homeAdd3Btn.addEventListener("click", () => updateScoreDisplay(true, 3));
    guestAdd1Btn.addEventListener("click", () => updateScoreDisplay(false, 1));
    guestAdd2Btn.addEventListener("click", () => updateScoreDisplay(false, 2));
    guestAdd3Btn.addEventListener("click", () => updateScoreDisplay(false, 3));
});
