const button = document.getElementById('purchaseButton');

button.addEventListener('click', async event =>{
    event.preventDefault();
    const response = await fetch('/api/carts/purchase', {
        method:'POST'
    });
    const result = await response.json();
    console.log(result);
});