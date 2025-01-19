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
            price: e.target.getAttribute('data-price'),
            quantity: 1 // Définir la quantité initiale à 1
        };

        // Récupérer le panier actuel
        const cart = JSON.parse(getCookie('cart') || '[]');
        
        // Vérifier si le produit existe déjà dans le panier
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1; // Incrémenter la quantité
        } else {
            cart.push(product); // Ajouter le produit avec quantité 1
        }

        // Mettre à jour le cookie avec le panier
        setCookie('cart', JSON.stringify(cart), 10); // Expiration dans 10 minutes

        alert(`${product.name} ajouté au panier !`);
    });
});
