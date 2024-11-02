const products = [
  {
      name: "Bicycle",
      description: "Gear less bicycle in a good condition",
      image: "cycle.jpeg",
      price: 180,
      reviews: ["★★★★☆: reasonable rate", "★★★☆☆: It was okay."]
  },
  {
      name: "Microwave Oven",
      description: "Automated Oven (Used only once)",
      image: "oven.jpeg",
      price: 100,
      reviews: ["★★★★☆: Good value.", "★★☆☆☆: Not what I expected."]
  },
  {
    name: "Flower Pot",
    description: "Vintage Flower Pot",
    image: "pot.jpeg",
    price: 90,
    reviews: ["★★★★☆: Perfect!"]
}
];

let cart = [];

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
      section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
  if (sectionId === 'availableProducts') {
      loadProducts();
  } else if (sectionId === 'cart') {
      displayCheckout();
  }
}

function loadProducts() {
  const productsList = document.getElementById("productsList");
  productsList.innerHTML = '';
  products.forEach((product, index) => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
          <h3>${product.name}</h3>
          <img src="${product.image}" alt="${product.name}" style="width: 260px; height: 200px;">
          <p>${product.description}</p>
          <p>Price: $${product.price}</p>
          <div class="reviews">
              <h4>Reviews:</h4>
              ${product.reviews.map(review => `<div class="review">${review}</div>`).join('')}
              <div class="review-input">
                  <input type="text" id="reviewInput${index}" placeholder="Leave a review">
                  <button onclick="submitReview(${index})">Submit Review</button>
              </div>
          </div>
          <button onclick="addToCart(${index})">Add to Cart</button>
      `;
      productsList.appendChild(productDiv);
  });
}

function submitReview(productIndex) {
  const reviewInput = document.getElementById(`reviewInput${productIndex}`);
  const reviewText = reviewInput.value;
  if (reviewText) {
      const starRating = getRandomStarRating();
      products[productIndex].reviews.push(`${starRating}: ${reviewText}`);
      loadProducts(); 
      reviewInput.value = '';
  } else {
      alert("Please enter a review.");
  }
}

function getRandomStarRating() {
  const rating = Math.floor(Math.random() * 6); // 0-5 stars
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function addToCart(productIndex) {
  cart.push(products[productIndex]);
  alert(`${products[productIndex].name} has been added to your cart.`);
}

function displayCheckout() {
  const checkoutList = document.getElementById("checkoutList");
  const totalAmount = document.getElementById("totalAmount");
  checkoutList.innerHTML = '';
  let total = 0;
  cart.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.textContent = `${product.name} - $${product.price}`;
      checkoutList.appendChild(productDiv);
      total += product.price;
  });
  totalAmount.textContent = `Total Amount: $${total}`;
}

function checkout() {
  const deliveryAddress = document.getElementById("deliveryAddress").value;
  const paymentMethod = document.getElementById("paymentMethod").value;
  if (deliveryAddress && (paymentMethod !== "card" || validateCardDetails())) {
      alert("Order Submitted successfully! Product will be delivered soon.");
      resetCart();
  } else {
      alert("Please fill in all fields.");
  }
}

function validateCardDetails() {
  const cardNumber = document.getElementById("cardNumber").value;
  const cardExpiry = document.getElementById("cardExpiry").value;
  const cardCVV = document.getElementById("cardCVV").value;
  return cardNumber && cardExpiry && cardCVV;
}

function resetCart() {
  cart = [];
  document.getElementById("deliveryAddress").value = '';
  document.getElementById("cardNumber").value = '';
  document.getElementById("cardExpiry").value = '';
  document.getElementById("cardCVV").value = '';
  showSection('availableProducts');
}

document.getElementById('paymentMethod').addEventListener('change', function() {
  document.getElementById('cardDetails').style.display = this.value === 'card' ? 'block' : 'none';
});

function sellProduct() {
  const productName = document.getElementById("productName").value;
  const productDescription = document.getElementById("productDescription").value;
  const productImage = document.getElementById("productImage").files[0];
  const productPrice = document.getElementById("productPrice").value;

  if (productName && productDescription && productImage && productPrice) {
      const imageUrl = URL.createObjectURL(productImage);
      products.push({ name: productName, description: productDescription, image: imageUrl, price: parseFloat(productPrice), reviews: [] });
      alert("Product listed successfully!");
      document.getElementById("productName").value = '';
      document.getElementById("productDescription").value = '';
      document.getElementById("productPrice").value = '';
      document.getElementById("productImage").value = '';
      
      showSection('availableProducts');
  } else {
      alert("Please fill in all fields.");
  }
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username && password) {
      alert("Logged in successfully!");
      showSection('availableProducts');
  } else {
      alert("Please enter username and password.");
  }
}
