const restaurantList = document.getElementById('restaurant-list');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalDiv = document.getElementById('cart-total');
const placeOrderButton = document.getElementById('place-order');

const restaurants = [
    { id: 1, name: 'Pizza Hut', menu: ['Margherita', 'Pepperoni', 'BBQ Chicken'], prices: [8, 10, 9] },
    { id: 2, name: 'Burger Joint', menu: ['Classic Zinger Burger', 'Cheese Burger', 'Veggie Burger'], prices: [6, 7, 5] },
    { id: 3, name: 'Biriyani Corner', menu: ['Chicken Biriyani', 'Mutton Biriyani', 'Paneer Biriyani'], prices: [12, 15, 10] }
];

let cart = [];

function displayRestaurants() {
    restaurantList.innerHTML = '';
    restaurants.forEach(restaurant => {
        const div = document.createElement('div');
        div.classList.add('restaurant-card'); // Use the class from your CSS
        div.innerHTML = `
            <h3>${restaurant.name}</h3>
            <h4>Menu</h4>
            <ul>${restaurant.menu.map((item, index) => `<li>${item} - $${restaurant.prices[index]}</li>`).join('')}</ul>
            <button onclick="orderFood(${restaurant.id})">Order Food</button>
        `;
        restaurantList.appendChild(div);
    });
}

function orderFood(restaurantId) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
        const order = prompt(`Place your order from ${restaurant.name} (choose from: ${restaurant.menu.join(', ')})`);
        const itemIndex = restaurant.menu.indexOf(order);
        if (itemIndex !== -1) {
            addToCart(restaurant.name, order, restaurant.prices[itemIndex]);
        } else {
            alert('Sorry, that item is not on the menu.');
        }
    }
}

function addToCart(restaurantName, itemName, itemPrice) {
    cart.push({ restaurantName, itemName, itemPrice });
    displayCart();
}

function displayCart() {
    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `${item.itemName} from ${item.restaurantName} - $${item.itemPrice}`;
        cartItemsDiv.appendChild(itemDiv);
        total += item.itemPrice;
    });

    cartTotalDiv.innerHTML = `Total: $${total.toFixed(2)}`;
}

placeOrderButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before placing an order.');
        return;
    }

    alert(`Your order has been placed successfully! Total: $${cart.reduce((sum, item) => sum + item.itemPrice, 0).toFixed(2)}`);
    cart = []; // Clear cart after order
    displayCart(); // Refresh cart display
});

// Initialize the app
displayRestaurants();
