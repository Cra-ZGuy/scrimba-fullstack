class UnitConverter {
    static init() {
        this.unitInputEl = document.getElementById("unit-input-el");
        this.convertBtn = document.getElementById("convert-btn");
        this.cLength = document.getElementById("conversion-length");
        this.cVolume = document.getElementById("conversion-volume");
        this.cMass = document.getElementById("conversion-mass");

        this.unitInputEl.value = "20";
        this.convert();

        this.convertBtn.addEventListener("click", () => this.convert());
    }

    static convert() {
        const units = Number(this.unitInputEl.value);

        if (!units && units !== 0) return;

        this.cLength.textContent = `${units} meters = ${
            (units * 3.28084).toFixed(3)
        } feet | ${units} feet = ${(units * 0.3048).toFixed(3)} meters`;
        this.cVolume.textContent = `${units} liters = ${
            (units * 0.264172).toFixed(3)
        } gallons | ${units} gallons = ${(units * 3.78541).toFixed(3)} liters`;
        this.cMass.textContent = `${units} kilos = ${
            (units * 2.20462).toFixed(3)
        } pounds | ${units} pounds = ${(units * 0.453592).toFixed(3)} kilos`;
    }
}

document.addEventListener("DOMContentLoaded", () => UnitConverter.init());