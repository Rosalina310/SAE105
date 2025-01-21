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
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    let cart = [];

    try {
        cart = JSON.parse(getCookie('cart') || '[]');
    } catch (e) {
        console.error('Erreur lors de la récupération du panier :', e);
        cart = [];
    }

    if (cart.length > 0) {
        let totalPrice = 0;

        cart.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name} (${product.couleur}) - ${product.price} € x ${product.quantite}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.style.marginLeft = '10px';
            deleteButton.addEventListener('click', () => {
                if (confirm(`Êtes-vous sûr de vouloir supprimer ${product.name} ?`)) {
                    cart = cart.filter(item => !(item.id === product.id && item.couleur === product.couleur));
                    setCookie('cart', JSON.stringify(cart), 10);
                    window.location.reload();
                }
            });

            listItem.appendChild(deleteButton);
            cartItems.appendChild(listItem);

            totalPrice += product.price * product.quantite;
        });

        cartTotal.textContent = `Total : ${totalPrice.toFixed(2)} €`;
    } else {
        cartItems.textContent = 'Votre panier est vide.';
        cartTotal.textContent = '';
    }
});
