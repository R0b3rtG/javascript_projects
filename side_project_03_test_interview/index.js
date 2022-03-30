const apiUrl = 'http://private-32dcc-products72.apiary-mock.com/product';
const productsUl = document.querySelector('.products');
const shoppingCart = document.querySelector('.grid');
const totalPrice = document.querySelector('.total-price .value');
const continueButton = document.querySelector('.continue-btn');
const totalPriceSpan = document.querySelector('.total-price');
const noProductsTitle = document.querySelector('.no-products-title');
const productsExistTitle = document.querySelector('.products-exist-title');

let arr;
let products = [];
let cartItems = [];
let totalPriceValue = 0;

async function getProducts() {
	try {
		const result = await fetch(apiUrl);
		if (result.ok) {
			const data = await result.json();
			arr = Array.from(data);
			arr.sort((a, b) => b.price - a.price);
			products = [];
			arr.forEach((product) => {
				createProduct(product);
			});
			productsUl.textContent = '';
			products.forEach((prod) => {
				productsUl.append(prod);
			});
		} else console.error(err);
	} catch (err) {
		console.log(err);
	}
}

function createProduct(product) {
	const li = document.createElement('li');
	li.classList.add('product');
	li.id = product.id;

	const productTitle = document.createElement('p');
	productTitle.classList.add('product-title');
	productTitle.append(product.name);
	li.append(productTitle);

	const alignmentDiv = document.createElement('div');
	const productPrice = document.createElement('p');
	productPrice.classList.add('product-price');
	productPrice.append('Price: ');
	const span = document.createElement('span');
	const currency = document.createElement('span');
	currency.classList.add('currency');
	currency.innerHTML = '&dollar;';
	const price = document.createElement('span');
	price.classList.add('price');
	price.append(product.price);
	span.append(currency);
	span.append(price);
	productPrice.append(span);
	alignmentDiv.append(productPrice);

	const button = document.createElement('button');
	button.classList.add('add-to-cart-btn');
	button.classList.add('btn');

	const icon = document.createElement('i');
	icon.classList.add('fa-solid');
	icon.classList.add('fa-cart-plus');

	button.append(icon);
	button.append(' Add to cart');
	alignmentDiv.append(button);
	li.append(alignmentDiv);
	products.push(li);
}

productsUl.addEventListener('click', addToCart);

function addToCart(e) {
	if (e.target.classList.contains('add-to-cart-btn')) {
		let id = e.target.parentElement.parentElement.id;
		e.target.parentElement.parentElement.remove();
		let prodForCart;
		arr.forEach((el, index) => {
			if (el.id == id) {
				prodForCart = el;
				arr = [...arr.slice(0, index), ...arr.slice(index + 1, arr.length + 1)];
			}
		});
		cartItems.push({ product: prodForCart, quantity: 1 });
		shoppingCart.append(createCartElement(prodForCart));

		updateTotalPrice();

		if (shoppingCart.childElementCount > 1) {
			shoppingCart.classList.remove('hidden');
			continueButton.classList.remove('hidden');
			totalPriceSpan.classList.remove('hidden');
			noProductsTitle.classList.add('hidden');
			productsExistTitle.classList.remove('hidden');
		} else {
			shoppingCart.classList.add('hidden');
			continueButton.classList.add('hidden');
			totalPriceSpan.classList.add('hidden');
			noProductsTitle.classList.remove('hidden');
			productsExistTitle.classList.add('hidden');
		}
	}

	const inputs = document.querySelectorAll('input');
	inputs.forEach((input) => {
		input.removeEventListener('blur', changeQuantity);
	});
	inputs.forEach((input) => {
		input.addEventListener('blur', changeQuantity);
	});

	const deleteBtns = document.querySelectorAll('.delete-cart-item-btn');
	deleteBtns.forEach((btn) => {
		btn.removeEventListener('click', deleteFromCart);
	});
	deleteBtns.forEach((btn) => {
		btn.addEventListener('click', deleteFromCart);
	});
}

function deleteFromCart(e) {
	let id = e.target.parentElement.id;
	let removedItem;
	cartItems.forEach((item, index) => {
		if (item.product.id == id) {
			removedItem = item.product;
			cartItems = [
				...cartItems.slice(0, index),
				...cartItems.slice(index + 1, cartItems.length + 1),
			];
		}
	});
	arr.push(removedItem);
	arr.sort((a, b) => b.price - a.price);
	products = [];
	arr.forEach((product) => {
		createProduct(product);
	});
	productsUl.textContent = '';
	products.forEach((prod) => {
		productsUl.append(prod);
	});
	e.target.parentElement.remove();
	updateTotalPrice();
	if (shoppingCart.childElementCount > 1) {
		shoppingCart.classList.remove('hidden');
		continueButton.classList.remove('hidden');
		totalPriceSpan.classList.remove('hidden');
		noProductsTitle.classList.add('hidden');
		productsExistTitle.classList.remove('hidden');
	} else {
		shoppingCart.classList.add('hidden');
		continueButton.classList.add('hidden');
		totalPriceSpan.classList.add('hidden');
		noProductsTitle.classList.remove('hidden');
		productsExistTitle.classList.add('hidden');
	}
}

function updateTotalPrice() {
	totalPriceValue = 0;
	cartItems.forEach((item) => {
		totalPriceValue += item.product.price * item.quantity;
	});
	totalPrice.textContent = totalPriceValue.toFixed(2);
}

function formatQualityInput(e) {
	value = e.target.value;
	let re = /^\d+$/g;
	if (!re.test(value)) {
		e.target.value = 1;
	}
}

function changeQuantity(e) {
	formatQualityInput(e);

	let id = e.target.parentElement.parentElement.id;
	cartItems.forEach((item) => {
		if (id == item.product.id) {
			item.quantity = parseInt(e.target.value);
			updateTotalPrice();
		}
	});
}

function createCartElement(productInfo) {
	const prod = document.createElement('div');
	prod.classList.add('prod');
	prod.id = productInfo.id;

	const nameSpan = document.createElement('span');
	const infoIcon = document.createElement('i');
	infoIcon.classList.add('fa-solid');
	infoIcon.classList.add('fa-circle-info');
	const infoPopUp = document.createElement('span');
	infoPopUp.classList.add('hover-info');
	infoPopUp.textContent =
		'This is short description about this awesome product that only appears on hover.';

	nameSpan.append(`${productInfo.name} `);
	nameSpan.append(infoIcon);
	nameSpan.append(infoPopUp);
	prod.append(nameSpan);

	const inputSpan = document.createElement('span');
	const input = document.createElement('input');
	input.value = 1;
	input.setAttribute('type', 'text');
	input.setAttribute('maxlength', '2');
	inputSpan.append(input);
	prod.append(inputSpan);

	const priceSpan = document.createElement('span');
	priceSpan.classList.add('price');
	const currency = document.createElement('span');
	currency.classList.add('currency');
	currency.innerHTML = '&dollar;';
	const value = document.createElement('span');
	value.classList.add('value');
	value.textContent = productInfo.price;
	priceSpan.append(currency);
	priceSpan.append(value);
	prod.append(priceSpan);

	const deleteButton = document.createElement('button');
	deleteButton.classList.add('delete-cart-item-btn');
	deleteButton.textContent = 'delete';
	prod.append(deleteButton);

	return prod;
}

getProducts();
