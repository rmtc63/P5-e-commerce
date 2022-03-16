//La page Accueil//

//Je commence par requêter l'API pour lui demander l'ensemble des produits              
	    fetch('http://localhost:3000/api/products')
        .then((response) => response.json()) 
        .then((data) => { 
        showProducts(data)
    }) 
        .catch(error => { 
            alert('Erreur de la requête');
    });
//----------------------------------------------------------------------------------------------

// Affichage des produits de la page//  
    showProducts = (data) => {
        for ((products) of (data)) { 
            console.log(data);
        const items = document.getElementById("items");  
            items.innerHTML +=`
            <a href="./product.html?id=${products._id}"> 
                <article>
                    <img src="${products.imageUrl}" alt="${products.altTxt}">
                    <h3 class="productName">${products.name}</h3>
                    <p class="productDescription">${products.description}</p>
                </article>
            </a>
       `
    };     
    console.log(data);
};