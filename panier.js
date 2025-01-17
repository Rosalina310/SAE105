// Fonction pour récupérer un cookie
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

// Charger les articles du panier
window.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cartItems');
    const cart = JSON.parse(getCookie('cart') || '[]'); // Récupère tous les produits du panier

    if (cart.length > 0) {
        cart.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name} - ${product.price} €`;
            cartItems.appendChild(listItem);
        });
    } else {
        cartItems.textContent = 'Votre panier est vide ou les articles ont expiré.';
    }
});
