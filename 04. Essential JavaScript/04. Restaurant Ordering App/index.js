import { menuArray } from "./data.js";

const menuItems = document.getElementById("menu-items");
const order = document.getElementById("order");
const orderItems = document.getElementById("order-items");
const orderItemsArr = getDefaultOrderItems();
const payModalOverlay = document.getElementById("pay-modal-overlay");
const payForm = document.getElementById("pay-form");

document.addEventListener("click", (ev) => {
    if (ev.target.dataset.addId !== undefined) {
        addItem(ev.target.dataset.addId);
    } else if (ev.target.dataset.removeId !== undefined) {
        removeItem(ev.target.dataset.removeId);
    } else if (ev.target.id === "order-complete-btn") {
        openPayModal();
    } else if (
        !payModalOverlay.classList.contains("hidden") &&
        ev.target.id === "pay-modal-overlay"
    ) {
        closePayModal();
    }
});

document.addEventListener("submit", (ev) => {
    ev.preventDefault();
    closePayModal();
    ev.va;
    finishOrder();
});

document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && !payModalOverlay.classList.contains("hidden")) {
        closePayModal();
    }
});

function addItem(id) {
    const { name, price, count } = orderItemsArr[id];

    if (getTotalPrice() === 0) order.classList.remove("hidden");

    if (count < 1) {
        orderItems.innerHTML += `
        <div class="order-item" id="order-item-${id}">
            <p id="order-item-name-${id}" class="order-item-name">${name}</p>
            <button class="order-item-remove" aria-label="Remove ${name} from Order" data-remove-id="${id}">
                remove</button>
            <p id="order-item-price-${id}" class="order-item-price">$${price}</p>
        </div>`;
    } else {
        const orderItemName = document.getElementById(`order-item-name-${id}`);
        const orderItemPrice = document.getElementById(
            `order-item-price-${id}`,
        );

        orderItemName.textContent = `${name} x${count + 1}`;
        orderItemPrice.textContent = `$${price * (count + 1)}`;
    }

    orderItemsArr[id].count++;

    updateTotalOrderPrice();
}

function removeItem(id) {
    const { name, price, count } = orderItemsArr[id];

    if (count === 1) {
        document.getElementById(`order-item-${id}`).remove();
    } else {
        const orderItemName = document.getElementById(`order-item-name-${id}`);
        const orderItemPrice = document.getElementById(
            `order-item-price-${id}`,
        );

        orderItemName.textContent = `${name} x${count - 1}`;
        orderItemPrice.textContent = `$${price * (count - 1)}`;
    }

    orderItemsArr[id].count--;

    if (getTotalPrice() === 0) order.classList.add("hidden");

    updateTotalOrderPrice();
}

function updateTotalOrderPrice() {
    const orderTotalPrice = document.getElementById("order-total-price");
    orderTotalPrice.textContent = `$${getTotalPrice()}`;
}

function openPayModal() {
    payModalOverlay.classList.remove("hidden");
    document.body.classList.add("no-scroll");
}

function closePayModal() {
    payModalOverlay.classList.add("hidden");
    document.body.classList.remove("no-scroll");
}

function finishOrder() {
    const form = new FormData(payForm);

    order.innerHTML = "";

    const thanksMessage = document.createElement("div");

    thanksMessage.setAttribute("id", "thanks");

    const message = document.createElement("p");

    thanksMessage.append(message);
    order.append(thanksMessage);

    message.textContent = `Thanks ${
        form.get("name")
    }! Your order is on its way!`;
}

function renderMenuItems() {
    let itemsHTML = "";

    for (const item of menuArray) {
        const { name, ingredients, id, price, emoji } = item;

        itemsHTML += `
        <div class="menu-item">
            <p class="menu-item-image-text">${emoji}</p>
            <div class="menu-item-info">
                <p class="menu-item-name">${name}</p>
                <p class="menu-item-ingredients">${ingredients.join(", ")}</p>
                <p class="menu-item-price">$${price}</p>
            </div>
            <button type="button" aria-label="Add ${name} to Order" class="menu-item-add-btn" data-add-id="${id}">
                <i class="fa-regular fa-plus" data-add-id="${id}"></i>
            </button>
        </div>`;
    }

    menuItems.innerHTML = itemsHTML;
}

function getDefaultOrderItems() {
    const arr = new Array(menuArray.length);

    for (const item of menuArray) {
        const { name, id, price } = item;

        arr[id] = { name: name, price: price, count: 0 };
    }

    return arr;
}

function getTotalPrice() {
    return orderItemsArr.reduce(
        (total, item) => total + item.price * item.count,
        0,
    );
}

function main() {
    renderMenuItems();
}

main();
