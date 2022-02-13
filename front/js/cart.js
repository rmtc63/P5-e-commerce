//La page Panier//
		
//Je récupère des produits dans le local storage

	let products = [];
	console.log(products);
	
//Je récupère les données en convertissant la chaine de caractère JSON en objet javascript
	let productInLocalStorage = JSON.parse(localStorage.getItem("product")); 
	
//-------------------------------------------------------------------------------------------------//

//Affichage des produits sur la page//

	//Si le panier est vide
		
		if (productInLocalStorage === null || productInLocalStorage == 0) {
			
			console.log("Votre panier est vide!");
  
		//Incrémentation du code HTML pour l'affichage du panier vide

			document.getElementById("cart__items").innerHTML = `
				<div class="cart__empty">
		  			<p> Désolé votre panier est vide ! </p>
				</div>
	 		 `;
  			} else {
  
		console.log("Votre panier n'est pas vide!");
  
	//Si le panier n'est pas vide : Affichage des produits dans le localStorage		
			let productsCart = [];
	
		//for ([expressionInitiale]; [condition]; [expressionIncrément])
		//for déclare une variable i, vérifie que i est bien inférieur au nombre d'options puis passe à l'option suivante en incrémentant i a chaque itération
				
			for (i = 0 ;i < productInLocalStorage.length; i++) {
  
	//La méthode .push() récupère uniquement l'id de chaque produit dans le panier, dans le array products
		  	
			products.push(productInLocalStorage[i].id);   
	  		console.log(products.length);
  
	  //Incrémentation du code à chaque tour de boucle pour chaque produit qui a été ajouté au panier	  	
	  		productsCart =
  
	  //Concaténation pour que le produit s'ajoute au tableau productsCart sans écraser le précédent 			
	  		productsCart + 
		`  
		  <article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage.color}">         
			  <div class="cart__item__img">
				  <img src="${productInLocalStorage[i].image}" alt="${productInLocalStorage[i].alt}">
			  </div>
			  <div class="cart__item__content">
				  <div class="cart__item__content__titlePrice">
					  <h2>${productInLocalStorage[i].name}</h2>
					  <p>${productInLocalStorage[i].color}</p>
					  <p>${productInLocalStorage[i].price} €</p>
				  </div>          
				  <div class="cart__item__content__settings">
					  <div class="cart__item__content__settings__quantity">
						  <p>Qté : </p>
						  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[i].quantity}">
					  </div>
					  <div class="cart__item__content__settings__delete">
						  <p class="deleteItem">Supprimer</p>
					  </div>
				  </div>
			  </div>
		  </article>
		`;
	}
  

	if (i === productInLocalStorage.length) {
  
	  //Injection du code HTML et affichage sur la page panier

		  const cartItems = document.getElementById("cart__items"); 
		  cartItems.innerHTML += productsCart;
	}
  
//-------------------------------------------------------------------------------------------------//
 
//Gestion de suppression des articles//
  
	//Supprimer un article du panier

		deleteProduct = () => {
		  const deleteItem = document.getElementsByClassName("deleteItem");
	  		console.log(deleteItem);
  
	  	for (let a = 0; a < deleteItem.length; a++) {
			deleteItem[a].addEventListener("click", (event) => {
		  	event.preventDefault();
  
	//Enregistrement de l'id et de la couleur séléctionnée par le bouton supprimer
		
	 		let deleteId = productInLocalStorage[a].id;
			let deleteColor = productInLocalStorage[a].color;
  
		// Affichage de l'id de l'article supprimé
	  		console.log("deleteId: " + deleteId); 
  
	//Sélection des éléments à garder avec la méthode .filter et suppression de l'élément cliqué avec la logique inversée !==
		  
	  	productInLocalStorage = productInLocalStorage.filter(
			(element) => element.id !== deleteId || element.color !== deleteColor
		);
  
	//Mise à jour du local storage avec les produits restants		  
		  localStorage.setItem("product", JSON.stringify(productInLocalStorage)); 
  
		  //Confirmation de la suppression du produit		  
		 	alert("Votre article a bien été retiré de votre panier !");
  
		  //Rechargement de la page pour actualiser le contenu du panier
		  	window.location.href = "cart.html"; 
		});
	  }
	};
  
		deleteProduct();
  
//-------------------------------------------------------------------------------------------------//
  
//Gestion du montant total du panier//
  
		priceAmount = () => {
		const calculPrice = [];
  
	  for (m = 0; m < productInLocalStorage.length; m++) {
  
	  	console.log(productInLocalStorage[m].price);
  
		const cartAmount =
		
	//Prix de l'article quantité * prix

		productInLocalStorage[m].price * productInLocalStorage[m].quantity; 
		calculPrice.push(cartAmount);
  
	//La fonction reduce() garde en mémoire les résultats de l'opération à chaque calcule en cumulant la somme précédente à chaque opération jusqu'au résultat/ elle contient en paramètre un accumulateur et la valeur courante
		//Accumulator = La valeur précédente

		const reducer = (Accumulator, currentValue) => Accumulator + currentValue; 
		total = calculPrice.reduce(reducer);
  
		console.log("reducer: " + total); //Visualisation du reducer
	  }
  
	//Affichage sur la page du montant total//

		  const totalPrice = document.getElementById("totalPrice");
		  totalPrice.textContent = total;
		}; 

			priceAmount();  
			totalArticles = () => {
 
	  		let totalItems = 0;
  
	  		for (e in productInLocalStorage) {
  
		//Analyse et converti la valeur 'quantity' dans le localstorage en une chaîne,...
		//...et renvoie un entier (parseInteger), sur la base décimale de 10 ...
		//...Transforme la donnée string en donnée number
			
			const newQuantity = parseInt(productInLocalStorage[e].quantity, 10);
  
		//Attribue la valeur retournée par parseInt à la variable totalItems			
			totalItems += newQuantity;
	  }
  
	  //Attribue à totalQuantity la valeur de totalItems et l'afficher dans le DOM
	  		
	  		const totalQuantity = document.getElementById("totalQuantity");
	  		totalQuantity.textContent = totalItems; 
  
	  };
	};
  
		totalArticles = () => {
		totalArticles();
	}
//-------------------------------------------------------------------------------------------------//
  
  //Gestion de modifier la quantité dans le panier//
  
		changeQuantity = () => {
	  
	  	let itemQuantity = document.getElementsByClassName("itemQuantity");
	  
	  	for (let n = 0; n < itemQuantity.length; n++) {
			itemQuantity[n].addEventListener("change", (event) => {
		  	event.preventDefault();
  
	//Initialisation d'un nouveau tableau avec la nouvelle quantité
		  
		let itemWithNewQuantity = itemQuantity[n].value;
		  
		  const newLocalStorage = {
			id: productInLocalStorage[n].id,
			image: productInLocalStorage[n].image,
			alt: productInLocalStorage[n].alt,
			name: productInLocalStorage[n].name,
			color: productInLocalStorage[n].color,
			price: productInLocalStorage[n].price,
			quantity: itemWithNewQuantity,
		  };
  
	//Je remplace le localstorage avec les nouvelles valeurs
		  
		productInLocalStorage[n] = newLocalStorage;
		localStorage.setItem("product", JSON.stringify(productInLocalStorage));
  
	//Pop-up de la mise à jour du panier
		alert("Mise à jour de votre panier!");
  
	//Actualisation du montant total et de la quantité d'articles dans le panier 
		  
		totalArticles();
		priceAmount();
		});
	  }
	};
  
		changeQuantity();

//-------------------------------------------------------------------------------------------------//
	
//Affichage du formulaire//
	
	form = () => {
	const order = document.getElementById("order");   
	console.log(order);

//addeventlistener_début

	//Je configure un eventListener: écoute du bouton et envoi au panier// 
		
		order.addEventListener("click", (event) => {
		event.preventDefault();
	
	//Je récupère des données du formulaire dans un objet

	    const contact = {
	        firstName: document.getElementById("firstName").value,
	        lastName: document.getElementById("lastName").value,
	        address: document.getElementById("address").value,
	        city: document.getElementById("city").value,
	        email: document.getElementById("email").value,
	    };
	
	    //Contrôle prénom
	    	formFirstName = () => {
	        const validFirstName = contact.firstName;
	        
			//Regex contenant l'ensemble des caractères admis dans le champs de remplissage à la validation
	        if (/^[a-zA-Z--]{2,20}$/.test(validFirstName)) { 
	          return true;
	        } else {
	          let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
	          firstNameErrorMsg.innerHTML = "Prénom invalide";
	        }
	      };
	
	    //Contrôle du nom
	      	formName = () => {
	        const validName = contact.lastName;	
	        
			if (/^[a-zA-Z\s-]{2,20}$/.test(validName)) {
	          return true;
	        } else {
	          let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
	          lastNameErrorMsg.innerHTML = "Nom invalide";
	        }
	      };
	
	    //Contrôle de l'adresse
	      	formAddress = () => {
	        const validAddress = contact.address;
	        
			if (/^[a-zA-Z0-9\s-]{2,50}$/.test(validAddress)) {
	          return true;
	        } else {
	          let addressErrorMsg = document.getElementById("addressErrorMsg");
	          addressErrorMsg.innerHTML = "Adresse invalide";
	        }
	      };
	
	    //Contrôle de la ville
	      	formCity = () => {
	        const validAddress = contact.city;
	        
			if (/^[a-zA-Z-\s-]{2,20}$/.test(validAddress)) {
	          return true;
	        } else {
	          let cityErrorMsg = document.getElementById("cityErrorMsg");
	          cityErrorMsg.innerHTML = "Ville invalide";
	        }
	      };
	
	    //Contrôle de l'email
	      	formEmail = () => {
	        const validEmail = contact.email;
	        
			if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(validEmail)) {
	          return true;
	        } else {
	          let emailErrorMsg = document.getElementById("emailErrorMsg");
	          emailErrorMsg.innerHTML = "Mail invalide";
	        }
	      };
	
	//Je vérifie des informations récupérées
	      	formCheck = () => {
	        if (
	          formFirstName() &&
	          formName() &&
	          formAddress() &&
	          formCity() &&
	          formEmail()
	        ) {

	        //Envoi des informations dans le local storage
	        //localStorage.setItem('contact', JSON.stringify(contact)); // données utilisateur
	        //Méthode booléan
	          	return true;
	
	        } else {
	          	alert("Une erreur est survenue, merci de vérifier vos informations");
	        }
	      };
	
	      formCheck();
	
	//Je récupère des données du formulaire et des produits dans un objet
	      const cartData = {
	        contact,
	        products,
	      };
	
	//J'envoi des données du formulaire et des produits au serveur avec la méthode POST
	      const checkOut = {
	        method: "POST",
	        body: JSON.stringify(cartData),
	        headers: {
	          "Content-Type": "application/json",
	        },
	      };
	
	    fetch("http://localhost:3000/api/products/order", checkOut)
	        .then((response) => response.json())
	        .then((data) => {
	          
	        localStorage.setItem("orderId", data.orderId);
	          
	        if (formCheck()) {
	            document.location.href = `confirmation.html?id=${data.orderId}`;
	          }
	        });
	    }); 
	  };
	
	  	form();

// addeventlistener_fin

//-------------------------------------------------------------------------------------------------//

//La page Confirmation//
	
	//En ciblant de la balise 'orderId'
		
		const orderId = document.getElementById('orderId');
		confirmation = () => {
	
	//En affichant du numéro de commande
		orderId.innerHTML = localStorage.getItem('orderId');
	
	//En utilisant la méthode .clear() qui efface toutes les clés stockées 
		localStorage.clear(); 
	}
	
		confirmation();




	
	

	  