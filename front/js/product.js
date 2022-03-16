 //La page Accueil//

 //Sur cette page affiche les détails du produit sur lequel l'utilisateur à cliqué depuis la page d'accueil...
   
      let params = new URLSearchParams(window.location.search); 
        let productId = params.get("id");
        console.log(productId);

      const itemImage = document.getElementsByClassName("item__img");
      const itemTitle = document.getElementById("title");
      const itemPrice = document.getElementById("price");
      const itemDescription = document.getElementById("description");
      const itemColors = document.getElementById("colors");
      
      console.log(itemImage);
      console.log(itemTitle);
      console.log(itemPrice);
      console.log(itemDescription);
      console.log(itemColors); 

      let imageURL = "";  //J'ajout d'une string vide pour l'affichage de l'image sur la page

    fetch(`http://localhost:3000/api/products/${productId}`)
      .then((response) => response.json()) 
      .then((data) => {
      console.log(data);

      itemImage[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`; 
      imageURL = data.imageUrl;
      console.log(itemImage[0]);
      console.log(imageURL);

      itemTitle.innerHTML = `<h1>${data.name}</h1>`;
      itemPrice.innerHTML = `${data.price}`;
      itemDescription.innerHTML = `${data.description}`;

      for (select in data.colors) { //options de couleurs avec for/in 
      colors.options[colors.options.length] = new Option(data.colors[select]);
      console.log(data.colors[select]);
      }
    })
    .catch((error) => {
      alert("Erreur! Refaire svp!");
    });

//-------------------------------------------------------------------------------------------------//

//Partie panier//

      const itemQuantity = document.getElementById("quantity");
      const itemOptions = document.getElementById("colors");
      const addToCart = document.getElementById("addToCart");

//-------------------------------------------------------------------------------------------------//

//Partie eventListener:écoute du bouton et envoi au panier//

    addToCart.addEventListener("click", (event) => {
      event.preventDefault();
          if (  //Si la quantité du produit est équivalente ou inféreur à 0 et supérieur à 100
          itemQuantity.value <= 0 || itemQuantity.value > 100
        ) {
          alert("Erreur! Veuillez ajouter la quantité!");
          }
        else if (itemOptions.value == "") {  //Si l'option de couleur n'a pas été selectionnée
          alert("Erreur! Veuillez choisir une couleur!");
      } else 
    {
    let selectedProduct = { 
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

  let productInLocalStorage = JSON.parse(localStorage.getItem("product")); 
  let addProductInLocalStorage = () => { 
      productInLocalStorage.push(selectedProduct);
      localStorage.setItem("product", JSON.stringify(productInLocalStorage)); 
    };
      let itemAddedInCart = () => {  
      alert("Votre article a bien été ajouté dans le panier !");
    };
      console.log(productInLocalStorage);
 
  //Je vérifie de l'ajout de produit avec une méthode booléenne
      let update = false;

      if (productInLocalStorage) {  //Si le produit est envoyé dans le local storage  
    
        productInLocalStorage.forEach(function (productCheck, key) { 
      if ( productCheck.id == productId && productCheck.color == itemOptions.value ) {
        productInLocalStorage[key].quantity = parseInt(productCheck.quantity) + parseInt(itemQuantity.value);
  
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));  
        update = true; 
        itemAddedInCart();  
      }
        console.log(productInLocalStorage); 
    });

      if (!update) { //Si le produit possède une autre option 'color': le produit est ajouté séparément
        addProductInLocalStorage();
        itemAddedInCart(); 
    }
       } else {
        productInLocalStorage = []; 
        addProductInLocalStorage(); 
        itemAddedInCart(); 
    }
  }
});