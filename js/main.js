// https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json
let template = document.querySelector("[type='template']").innerHTML;
let productsRow = document.querySelector("#productsRow")
let collection = document.querySelectorAll("[data-col]")
let categories = document.querySelectorAll("[data-links]")


let xml = new XMLHttpRequest();
xml.open("get","https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json")
xml.onreadystatechange = function(){
	if(xml.readyState == 4 && xml.status == 200){
		startShop(JSON.parse(xml.responseText))
		
	}
}
xml.send()

function startShop(data){
	for (var i = 0; i < collection.length; i++) {
		collection[i].addEventListener("click",showCollections)
	}
	for (var i = 0; i < categories.length; i++) {
		categories[i].addEventListener("click",showCategories)
	}
	function displayProduct(data){
	console.log(data)
	let newTemplate = ""
	for (var i = 0; i < data.length; i++) {
		newTemplate += template.replace("{{imgSrc}}",data[i].imgSrc)
								.replace("{{productTitle}}",data[i].productTitle)
								.replace("{{model}}",data[i].model)
								.replace("{{price}}",data[i].price)
}
	productsRow.innerHTML = newTemplate;
	}
	displayProduct(data)
	function showCollections(e){
		e.preventDefault()
		let col = this.getAttribute("data-col")
		console.log(col)
		let kolekcija = data.filter(function(product){
			return product.colection == col
		})
		displayProduct(kolekcija)
		removeActive()
	}
	function showCategories(e){
		e.preventDefault()
		let cat = this.getAttribute("data-links")
		let kategorija = data.filter(function(product){
			if (cat == "newCol") {
				return product.newCol
			} else if (cat == "popular"){
				return product.popular
			} else {
				return product.action
			}
		})
		displayProduct(kategorija)
		removeActive()
		this.className = "active"
	}
}
function removeActive(){
	for (var i = 0; i < categories.length; i++) {
			categories[i].className = ""
		}
}