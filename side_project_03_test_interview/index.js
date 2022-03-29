const apiUrl = 'http://private-32dcc-products72.apiary-mock.com/product';
const productsUl = document.querySelector('.products');
let arr;
let products = [];
async function getProducts() {
	try {
		const result = await fetch(apiUrl);
		if (result.ok) {
			const data = await result.json();
			arr = Array.from(data);
			arr.sort((a, b) => b.price - a.price);
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

getProducts();

// productsUl.addEventListener('click', addToCart);

// function addToCart(e) {
// 	if (e.target.classList.contains('add-to-cart-btn')) {
// 		let id = e.target.parentElement.parentElement.id;
// 		e.target.parentElement.parentElement.remove();
// 		let prodForCart;
// 		arr.forEach((el, index) => {
// 			if (el.id == id) {
// 				prodForCart = el;
// 				arr = [...arr.slice(0, index), ...arr.slice(index + 1, arr.length + 1)];
// 			}
// 		});
// 		createCartElement(prodForCart);
// 	}
// }
