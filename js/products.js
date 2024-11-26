async function loadProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    displayProducts(products);  
}
// Intersection Observer 설정
const observerOptions = {
    root: null, // 뷰포트를 기준으로 함
    rootMargin: '0px',
    threshold: 0.1 // 이미지의 10%가 뷰포트에 들어오면 로드
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // data-src 값을 src에 할당하여 이미지 로드
            img.src = img.dataset.src;
            img.removeAttribute('data-src'); // data-src 속성 제거
            observer.unobserve(img); // Observer에서 이미지 제거
        }
    });
}, observerOptions);

function displayProducts(products) {

    // Find the container where products will be displayed
    const container = document.querySelector('#all-products .container');

   
    // Iterate over each product and create the HTML structure safely
    products.forEach(product => {
        // Create the main product div
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        // Create the product picture div
        const pictureDiv = document.createElement('div');
        pictureDiv.classList.add('product-picture');
        const img = document.createElement('img');
        img.dataset.src = product.image; // data-src에 실제 이미지 URL 저장
        img.alt = `product: ${product.title}`;
        img.width = 250;
        // 초기 src는 빈 값으로 설정
        img.src = ''; 
        pictureDiv.appendChild(img);

        // Observer에 이미지 등록
        imageObserver.observe(img);
        // Append pictureDiv to productElement
        productElement.appendChild(pictureDiv);

        // Create the product info div
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('product-info');

        const category = document.createElement('h5');
        category.classList.add('categories');
        category.textContent = product.category;

        const title = document.createElement('h4');
        title.classList.add('title');
        title.textContent = product.title;

        const price = document.createElement('h3');
        price.classList.add('price');
        const priceSpan = document.createElement('span');
        priceSpan.textContent = `US$ ${product.price}`;
        price.appendChild(priceSpan);

        const button = document.createElement('button');
        button.textContent = 'Add to bag';

        // Append elements to the product info div
        infoDiv.appendChild(category);
        infoDiv.appendChild(title);
        infoDiv.appendChild(price);
        infoDiv.appendChild(button);

        // Append picture and info divs to the main product element
        productElement.appendChild(pictureDiv);
        productElement.appendChild(infoDiv);

        // Append the new product element to the container
        container.appendChild(productElement);
    });

    

}



loadProducts();

// Simulate heavy operation. It could be a complex price calculation.
for (let i = 0; i < 10000000; i++) {
    const temp = Math.sqrt(i) * Math.sqrt(i);
}

