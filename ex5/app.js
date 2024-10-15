const items = [
    {
        name: "Used Bicycle",
        category: "Transport",
        description: "A gently used bicycle in good condition.",
        imageUrl: "cycle.jpeg",
        price: 150,
        contact: "seller1@example.com"
    },
    {
        name: "Gaming Console",
        category: "Electronics",
        description: "A slightly used gaming console with games.",
        imageUrl: "game.jpeg",
        price: 250,
        contact: "seller2@example.com"
    }
];

let cart = [];

// Show sections
document.getElementById('view-buy').onclick = () => {
    document.getElementById('buy-section').classList.remove('hidden');
    document.getElementById('sell-section').classList.add('hidden');
    document.getElementById('item-detail').classList.add('hidden');
    displayItems();
};

document.getElementById('view-sell').onclick = () => {
    document.getElementById('sell-section').classList.remove('hidden');
    document.getElementById('buy-section').classList.add('hidden');
    document.getElementById('item-detail').classList.add('hidden');
};

// Handle item selling
document.getElementById('sell-form').onsubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById('item-name').value;
    const category = document.getElementById('item-category').value;
    const description = document.getElementById('item-description').value;
    const imageFile = document.getElementById('item-image').files[0];
    const price = parseFloat(document.getElementById('item-price').value);
    const contact = document.getElementById('seller-contact').value;

    const imageUrl = URL.createObjectURL(imageFile);
    items.push({ name, category, description, imageUrl, price, contact });
    
    alert('Item listed successfully!');
    document.getElementById('sell-form').reset();
};

// Display items for sale
function displayItems() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';

    items.forEach((item, index) => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <h3>${item.name}</h3>
            <p>Category: ${item.category}</p>
            <p>Price: $${item.price.toFixed(2)}</p>
            <img src="${item.imageUrl}" alt="${item.name}" />
            <button onclick="viewDetails(${index})">View Details</button>
        `;
        itemList.appendChild(itemCard);
    });
}

// View item details
function viewDetails(index) {
    const item = items[index];
    const detailContent = document.getElementById('detail-content');
    
    detailContent.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
        <p><strong>Seller Contact:</strong> ${item.contact}</p>
        <img src="${item.imageUrl}" alt="${item.name}" style="max-width: 300px;" />
        <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    
    document.getElementById('item-detail').classList.remove('hidden');
    document.getElementById('buy-section').classList.add('hidden');
}

document.getElementById('back-to-items').onclick = () => {
    document.getElementById('item-detail').classList.add('hidden');
    document.getElementById('buy-section').classList.remove('hidden');
};

// Add item to cart
function addToCart(index) {
    cart.push(items[index]);
    updateCartInfo();
    alert('Item added to cart!');
}

// Update cart information
function updateCartInfo() {
    document.getElementById('cart-count').innerText = cart.length;
};

// Handle checkout button
document.getElementById('checkout-button').onclick = () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    displayOrderSummary();
    document.getElementById('checkout-popup').style.display = 'flex'; // Show pop-up
};

// Display order summary
function displayOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    const totalAmount = document.getElementById('total-amount');
    orderSummary.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        orderSummary.innerHTML += `<p>${item.name} - $${item.price.toFixed(2)}</p>`;
        total += item.price;
    });

    totalAmount.innerText = `Total Amount: $${total.toFixed(2)}`;
}

// Handle payment method selection
document.getElementById('payment-method').onchange = (event) => {
    const cardDetails = document.getElementById('card-details');
    cardDetails.style.display = event.target.value === 'card' ? 'block' : 'none';
};

// Handle confirm order button
document.getElementById('confirm-order-button').onclick = () => {
    const deliveryAddress = document.getElementById('delivery-address').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (!deliveryAddress) {
        alert('Please enter your delivery address.');
        return;
    }

    alert(`Order confirmed! Total: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}\nDelivery Address: ${deliveryAddress}\nPayment Method: ${paymentMethod}`);
    cart = [];
    updateCartInfo();
    document.getElementById('checkout-popup').style.display = 'none'; // Hide pop-up
};

// Close checkout popup
document.getElementById('checkout-popup').onclick = (event) => {
    if (event.target === document.getElementById('checkout-popup')) {
        document.getElementById('checkout-popup').style.display = 'none';
    }
};




