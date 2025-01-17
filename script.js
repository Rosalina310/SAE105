// Fonction pour définir un cookie
function setCookie(name, value, minutes) {
    const now = new Date();
    now.setTime(now.getTime() + minutes * 60 * 1000); // Expiration en minutes
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${now.toUTCString()};path=/`;
}

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

// Ajouter un produit au panier
document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', (e) => {
        const product = {
            id: e.target.getAttribute('data-id'),
            name: e.target.getAttribute('data-name'),
            price: e.target.getAttribute('data-price')
        };

        // Récupérer le panier actuel
        const cart = JSON.parse(getCookie('cart') || '[]');
        
        // Ajouter le nouveau produit au panier
        cart.push(product);

        // Mettre à jour le cookie avec le panier
        setCookie('cart', JSON.stringify(cart), 10); // Expiration dans 10 minutes

        alert(`${product.name} ajouté au panier !`);
    });
});
