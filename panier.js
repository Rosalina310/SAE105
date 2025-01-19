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

// Fonction pour définir un cookie
function setCookie(name, value, minutes) {
    const now = new Date();
    now.setTime(now.getTime() + minutes * 60 * 1000); // Expiration en minutes
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${now.toUTCString()};path=/`;
}

// Charger les articles du panier
window.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cartItems'); // Conteneur pour les articles du panier
    const cartTotal = document.getElementById('cartTotal'); // Conteneur pour le total
    let cart = JSON.parse(getCookie('cart') || '[]'); // Récupère tous les produits du panier

    if (cart.length > 0) {
        let totalPrice = 0; // Initialisation du prix total

        // Regrouper les produits par ID et calculer les quantités
        const groupedProducts = cart.reduce((acc, product) => {
            const existingProduct = acc.find(item => item.id === product.id);
            if (existingProduct) {
                // Augmenter la quantité du produit existant
                existingProduct.quantity += product.quantity;
            } else {
                // Ajouter le produit avec la quantité initiale
                acc.push({...product, quantity: product.quantity || 1});
            }
            return acc;
        }, []);

        // Afficher les produits avec leur quantité et bouton de suppression
        groupedProducts.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name} - ${product.price} € x(${product.quantity})`;

            // Ajouter le bouton de suppression
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.style.marginLeft = '10px';
            deleteButton.addEventListener('click', () => {
                if (confirm(`Êtes-vous sûr de vouloir supprimer ${product.name} de votre panier ?`)) {
                    // Supprimer le produit du panier
                    cart = cart.filter(item => item.id !== product.id);

                    // Mettre à jour le cookie avec le panier mis à jour
                    setCookie('cart', JSON.stringify(cart), 10);

                    // Réactualiser l'affichage du panier
                    window.location.reload(); // Utiliser window.location.reload() pour forcer le rechargement de la page
                }
            });

            // Ajouter le bouton au produit
            listItem.appendChild(deleteButton);
            cartItems.appendChild(listItem);

            // Calculer le prix total
            totalPrice += product.price * product.quantity;
        });

        // Afficher le prix total
        cartTotal.textContent = `Total : ${totalPrice.toFixed(2)} €`;
    } else {
        cartItems.textContent = 'Votre panier est vide ou les articles ont expiré.';
        if (cartTotal) cartTotal.textContent = ''; // Effacer le total s'il n'y a rien
    }
});
