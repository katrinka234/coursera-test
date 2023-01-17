const products_container = document.querySelector('.products-container');

fetch('https://dummyjson.com/products')
    .then((response) => response.json())
    .then((result) => {
        result.products.forEach((product) => {
            products_container.innerHTML = 
                products_container.innerHTML +
                `
                <div class="card card-custom" style="width: 350px; margin-bottom: 30px;"> 
                    <h3 class="card-title">${product.title}</h3>
                    <img src="${product.images[0]}" class="card-img-top"</h5>
                    <h5 class="card-title">${product.description}</h5>
                    <b>Price: ${product.price}$</b>
                    <div class="progress-icons">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                    </div>
                    <a href="#" class="btn buy-btn">Buy Now</a>
                    <a href="#" class="btn cart-btn"><i class="fa-solid fa-cart-shopping"></i></a>
                    <a href="#" class="btn fav-btn"><i class="fa-regular fa-heart"></i></a>
                </div>
            `;
        });
    });