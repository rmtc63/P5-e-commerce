//La page Accueil//

//Je commence par requêter l'API pour lui demander l'ensemble des produits              

	//Je fais une requête API avec la méthode Fetch
	    fetch('http://localhost:3000/api/products')
	
    //Je récupére des données depuis l'API
        .then((response) => 

    //Je traduis des données en objet JSON pour faciliter l'interpretation
        response.json()) 

    //Je récupére des données pour l'afficher
        .then((data) => { 

    //J'ajoute des données récupérés dans la fonction showProducts
        showProducts(data)
    }) 

    //Le rappel à exécuter lorsque la promesse est rejetée

        .catch(error => { 
            alert('Erreur de la requête');
    });
//------------------------------------------------------------------------------------------------------------------

// Affichage des produits de la page//  
   
    showProducts = (data) => {

    //Je crée une boucle avec "for of" pour parcourir le array contenant les produits

        for ((products) of (data)) { 
        console.log(data);

    //Je récupère la balise "#items" pour afficher les produits//    

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




