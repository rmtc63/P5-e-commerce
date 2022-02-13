 //La page Accueil//

 //Sur cette page affiche les détails du produit sur lequel l'utilisateur à cliqué depuis la page d'accueil...
 //...qui pourrait sélectionner une quantité, une coleur et enfin ajouter ce produit dans son panier//
  
  //Je crée un nom de variable pour récupérerre l'URL de la page...      
      let params = new URLSearchParams(window.location.search); 

  //... et de récupérer avec .get en déclarant dans une variable
    
      let productId = params.get("id");
      console.log(productId);

  //Je initialise des caractéristiques du produit

      const itemImage = document.getElementsByClassName("item__img");
      const itemTitle = document.getElementById("title");
      const itemPrice = document.getElementById("price");
      const itemDescription = document.getElementById("description");
      const itemColors = document.getElementById("colors");

  //Je vérifie la sélection de chaque élément
      
      console.log(itemImage);
      console.log(itemTitle);
      console.log(itemPrice);
      console.log(itemDescription);
      console.log(itemColors); 

  //J'ajout d'une string vide pour l'affichage de l'image sur la page
      let imageURL = ""; 

//Je requête l'API et faire apparaître le produit en rajoutant "productId"...
//...déclaré précédemment pour cibler et avoir le produit selectionné//

    fetch(`http://localhost:3000/api/products/${productId}`)
      .then((response) => response.json()) 
      .then((data) => {
      console.log(data);

  //Je procede l'implémentation des éléments de la page dans le code HTML

      itemImage[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`; 
      imageURL = data.imageUrl;
        
  //Je mets la valeur entre les crochets pour qu'il va chercher la première valeur

      console.log(itemImage[0]);
      console.log(imageURL);

      itemTitle.innerHTML = `<h1>${data.name}</h1>`;
      itemPrice.innerHTML = `${data.price}`;
      itemDescription.innerHTML = `${data.description}`;

  //Je boucle des options de couleurs avec for/in car les données du produit est en array of string

      for (select in data.colors) { 
      colors.options[colors.options.length] = new Option(data.colors[select]);
      console.log(data.colors[select]);
      }
    })
  
  //En cas où le serveur ne repond pas, j'ajoute un message d'erreur

    .catch((error) => {
      alert("Erreur! Refaire svp!");
  });

//-------------------------------------------------------------------------------------------------//

//Partie panier//

//Je fais une mise en variable des choix de l'utilisateur (choix de color et quantité)...
//...Je récupére les données par rapport au choix de l'utilisateur//

  //Je mets en variable des choix de l'utilisateur:

    //Recupération du choix de la quantité
      const itemQuantity = document.getElementById("quantity");
    //Recupération du choix de la coleur
      const itemOptions = document.getElementById("colors");
    //J'ajoute de l'élément au panier
      const addToCart = document.getElementById("addToCart");

//-------------------------------------------------------------------------------------------------//

//Partie eventListener//

//Je configure un eventListener: écoute du bouton et envoi au panier

    addToCart.addEventListener("click", (event) => {
    event.preventDefault();

    //Si la quantité du produit est équivalente ou inféreur à 0 et supérieur à 100

        if (
          itemQuantity.value <= 0 || itemQuantity.value > 100
        ) {

        alert("Erreur! Veuillez ajouter la quantité!");
      }

    //Si l'option de couleur n'a pas été selectionnée

      else if (itemOptions.value == "") {

      alert("Erreur! Veuillez choisir une couleur!");

      } else {

//Je récupère les valeurs du produit choisi et je déclare l'objet contenant...
//...les caractéristiques du produit au sein du bouton//

    let selectedProduct = {
      name: itemTitle.textContent,
      id: productId,
      price: itemPrice.textContent,
      color: itemOptions.value,
      quantity: itemQuantity.value,
      image: imageURL,
    };

// Vérification des données du produit récupérées à l'écoute du bouton
    console.log(selectedProduct);

//-------------------------------------------------------------------------------------------------//

//Partie localStorage//

//Initialisation du localStorage au sein du bouton//

  //Je déclare une variable où je mets les clés et les valeurs

  //JSON.parse convertit les données JSON du local storage en objet Javascript      
      let productInLocalStorage = JSON.parse(localStorage.getItem("product")); 

  //Je vérifie s'il y a déjà le produit enregistré dans le local storage ou non
      let addProductInLocalStorage = () => {
    
  //Je récupére des données dans un tableau avec la méthode .push
      productInLocalStorage.push(selectedProduct);

  //Je créee la clé "product" avec .setItem en uilisant la méthode JSON.stringify...
  //...et convertir l'objet Javascript en données JSON
      localStorage.setItem("product", JSON.stringify(productInLocalStorage)); 
    };

  //Je confirme l'ajout du produit au panier

      let itemAddedInCart = () => {
      alert("Votre article a bien été ajouté dans le panier !");

  };

      console.log(productInLocalStorage);

//-------------------------------------------------------------------------------------------------//
  
  //Je vérifie de l'ajout de produit avec une méthode booléenne
        let update = false;

    //Si le produit est envoyé dans le local storage  
        if (productInLocalStorage) { 

    //Pour chaque produit ajouté
        productInLocalStorage.forEach(function (productCheck, key) {

    //Si le produit ajouté possède un 'id' et une option 'color' identique: la quantité est mise à jour
      
        if ( productCheck.id == productId && productCheck.color == itemOptions.value ) {
        productInLocalStorage[key].quantity = parseInt(productCheck.quantity) + parseInt(itemQuantity.value);

    //Mise à jour des nouvelles valeurs du produit
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));

    //L'article ajouté est identique au produit présent dans le local storage
        update = true;

    //Confirmation de l'ajout 
        itemAddedInCart();
      }

        console.log(productInLocalStorage); 
    });

  //L'article ajouté n'est pas identique au produit présent dans le local storage
  //Si le produit possède une autre option 'color': le produit est ajouté séparemment
      if (!update) {

    //Vérification du produit existant dans le local storage
      addProductInLocalStorage();

    //Confirmation de l'ajout
      itemAddedInCart();
    }

  //L'article ajouté n'est pas identique aux produits présent dans le local storage
  //Si le produit possède un autre 'id' et une autre couleur: le produit est ajouté séparemment  
      } else {
    
    //Je créer un tableau vide
        productInLocalStorage = []; 

    //Je mets dans ce tableau le contenu de mon produit sélectionné
    //Je créee la nouvelle clé produit que je convertis en JSON pour le local storage
          addProductInLocalStorage(); 

    // Confirmation de l'ajout
          itemAddedInCart(); 
    }
  }
});

       
       
       
       
       
       
       
