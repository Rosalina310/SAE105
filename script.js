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

// Fonction pour ajouter un produit au panier
function addToCart(product) {
    let cart = [];
    try {
        cart = JSON.parse(getCookie('cart') || '[]');
    } catch (e) {
        console.error("Erreur lors de la récupération du panier :", e);
    }

    // Vérifier si le produit existe déjà
    const existingProduct = cart.find(item => item.id === product.id && item.couleur === product.couleur);

    if (existingProduct) {
        existingProduct.quantite += product.quantite;
    } else {
        cart.push(product);
    }

    // Mettre à jour le cookie
    setCookie('cart', JSON.stringify(cart), 10);

    alert(`${product.name} a été ajouté au panier !`);
}

// Écouteurs d'événements pour les boutons "Ajouter au panier"
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.id;
        const productName = button.dataset.name;
        const productPrice = parseFloat(button.dataset.price);
        const productColor = "";  // Pas de couleur pour ce produit
        const productQuantity = parseInt(document.getElementById('quantite').value, 10);

        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            quantite: productQuantity,
            couleur: productColor
        };

        addToCart(product);
    });
});
