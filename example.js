"use strict";

// Adds item prices without mutating items. Negative prices represent credits.
function calculateTotal(items) {
    if (!Array.isArray(items)) throw new TypeError("items must be an array");
    return items.reduce((total, item) => {
        if (!item || typeof item.price !== "number" || !Number.isFinite(item.price)) {
            throw new TypeError("each price must be a finite number");
        }
        return total + item.price;
    }, 0);
}

module.exports = { calculateTotal };
