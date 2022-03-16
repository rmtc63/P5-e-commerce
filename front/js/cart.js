//La page Panier//

let params = new URLSearchParams(window.location.search); 

    let orderIdUrl = params.get("orderid");
	console.log(orderIdUrl);
	if(orderIdUrl== null) {

	let products = []; 
	console.log(products);
	
	let productInLocalStorage = JSON.parse(localStorage.getItem("product")); 
	
//-------------------------------------------------------------------------------------------------//

//Affichage des produits sur la page//
		
	if (productInLocalStorage === null || productInLocalStorage == 0) {
		console.log("Votre panier est vide!");

		document.getElementById("cart__items").innerHTML = `
				<div class="cart__empty">
		  			<p> Désolé votre panier est vide ! </p>
				</div>
	 		 `;
  			} else {
  				console.log("Votre panier n'est pas vide!");
  	
		let productsCart = []; 	
			for (i = 0 ;i < productInLocalStorage.length; i++) {
		  	products.push(productInLocalStorage[i].id);   
	  		console.log(products.length);
  	  		productsCart =
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
		  const cartItems = document.getElementById("cart__items"); 
		  cartItems.innerHTML += productsCart;
	}
  
//-------------------------------------------------------------------------------------------------//
 
//Gestion de suppression des articles//
  
		deleteProduct = () => { 
		  const deleteItem = document.getElementsByClassName("deleteItem");
	  		console.log(deleteItem);
  
	  	for (let a = 0; a < deleteItem.length; a++) {
			deleteItem[a].addEventListener("click", (event) => {
		  	event.preventDefault();
			let deleteId = productInLocalStorage[a].id;
			let deleteColor = productInLocalStorage[a].color;
  	  		console.log("deleteId: " + deleteId); 
		  
	  	productInLocalStorage = productInLocalStorage.filter(
			(element) => element.id !== deleteId || element.color !== deleteColor
		);
  		localStorage.setItem("product", JSON.stringify(productInLocalStorage)); 
  		  	alert("Votre article a bien été retiré de votre panier !");
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
		
		productInLocalStorage[m].price * productInLocalStorage[m].quantity; //Prix de l'article quantité * prix
		calculPrice.push(cartAmount); 	
  
		const reducer = (Accumulator, currentValue) => Accumulator + currentValue; 
		total = calculPrice.reduce(reducer);
  		console.log("reducer: " + total); 
	  }
  
	//Affichage sur la page du montant total//

		  const totalPrice = document.getElementById("totalPrice");
		  totalPrice.textContent = total;
		}; 
			priceAmount();  
			totalArticles = () => {
 	  		let totalItems = 0;
  
	  		for (e in productInLocalStorage) {
			const newQuantity = parseInt(productInLocalStorage[e].quantity, 10);
  			totalItems += newQuantity;
	  }
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
		  
		productInLocalStorage[n] = newLocalStorage;
		localStorage.setItem("product", JSON.stringify(productInLocalStorage));
  		alert("Mise à jour de votre panier!");
		  
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

	//Je configure un eventListener: écoute du bouton et envoi au panier// 
		order.addEventListener("click", (event) => {
		event.preventDefault();
		    const contact = {
	        firstName: document.getElementById("firstName").value,
	        lastName: document.getElementById("lastName").value,
	        address: document.getElementById("address").value,
	        city: document.getElementById("city").value,
	        email: document.getElementById("email").value,
	    };
	
		//Contrôler les données avec Regex 
	    	formFirstName = () => {  
	        const validFirstName = contact.firstName; 
			if (/^[a-zA-Z--]{2,20}$/.test(validFirstName)) { 
	          return true;
	        } else {
	          let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
	          firstNameErrorMsg.innerHTML = "Prénom invalide";
	        }
	      };
	      	formName = () => {    
	        const validName = contact.lastName;	
	        if (/^[a-zA-Z\s-]{2,20}$/.test(validName)) {
	          return true;
	        } else {
	          let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
	          lastNameErrorMsg.innerHTML = "Nom invalide";
	        }
	      };
	      	formAddress = () => {    
	        const validAddress = contact.address;
	        if (/^[a-zA-Z0-9\s-]{2,50}$/.test(validAddress)) {
	          return true;
	        } else {
	          let addressErrorMsg = document.getElementById("addressErrorMsg");
	          addressErrorMsg.innerHTML = "Adresse invalide";
	        }
	      };    
	      	formCity = () => { 
	        const validAddress = contact.city;
	        if (/^[a-zA-Z-\s-]{2,20}$/.test(validAddress)) {
	          return true;
	        } else {
	          let cityErrorMsg = document.getElementById("cityErrorMsg");
	          cityErrorMsg.innerHTML = "Ville invalide";
	        }
	      };   
	      	formEmail = () => { 
	        const validEmail = contact.email; 
			if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(validEmail)) {
	          return true;
	        } else {
	          let emailErrorMsg = document.getElementById("emailErrorMsg");
	          emailErrorMsg.innerHTML = "Mail invalide";
	        }
	      };
	      	formCheck = () => {
	        if (
	          formFirstName() &&
	          formName() &&
	          formAddress() &&
	          formCity() &&
	          formEmail()
	        ) {	        
	        	return true;	
	        } else {
	          	alert("Une erreur est survenue, merci de vérifier vos informations");
	        }
	      };
	      formCheck();
	
	      const cartData = {
	        contact,
	        products,
	      };	
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
	    if (formCheck()) {
	        document.location.href = `confirmation.html?orderid=${data.orderId}`;
	          }
	        });
	    }); 
	  };	
	  	form();
}
//-------------------------------------------------------------------------------------------------//
	
//La page Confirmation//
	
	else { 
		const orderId = document.getElementById('orderId');
		confirmation = () => {
		orderId.innerHTML = orderIdUrl;	
		localStorage.clear(); 
	}
		confirmation();
	} 