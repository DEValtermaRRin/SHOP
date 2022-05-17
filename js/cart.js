const addedGoods = document.querySelector(".goods");
const hiddenCart = document.querySelector(".hidden-cart.hidden");
const totalSumHTML = document.querySelector(".total-sum");
const totalCountHTML = document.querySelector(".cart__label");

const totalCartArr = [];
class Card {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.count = 1;
    this.sum = this.price;
  }
}

document.querySelector(".products__grid").addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") {
    hiddenCart.classList.add("hidden");
    return;
  }
  hiddenCart.classList.remove("hidden");
  totalCountHTML.classList.remove("hidden");
  let btn = e.target;
  let cardInfo = btn.closest(".card");

  const cardId = cardInfo.dataset?.id;
  const cardName = cardInfo.dataset?.name;
  const cardPrice = Number.parseFloat(cardInfo.dataset?.price);

  // создаю новый экземпляр товара
  let nextItemObj = new Card(cardId, cardName, cardPrice);

  // ищу в массиве продукт с таким же id, если он есть, то меняю количество на 1
  // и сразу меняю его итоговую стоимость
  function watchingSameObj(allProducts, product) {
    if (allProducts.find((item) => item.id === product.id)) {
      const productIndex = allProducts.findIndex(
        (item) => item.id === product.id
      );
      product = allProducts[productIndex];
      product.count += 1;
      product.sum = product.count * product.price;
      allProducts.splice(productIndex, 1);
    }
    return product;
  }
  function pushProdToCart(arr, product) {
    arr.push(watchingSameObj(arr, product));
    return arr;
  }

  pushProdToCart(totalCartArr, nextItemObj);

  function addingProductToHTML(arr) {
    addedGoods.innerHTML = "";
    arr.forEach((elem) => {
      addedGoods.insertAdjacentHTML(
        "beforeend",
        `<div class="goods__item" data-id="${elem.id}">
			<div class="goods__name">${elem.name}</div>
			<div class="goods__price">$ ${elem.price}</div>
			<div class="goods__count">${elem.count}</div>
			<div class="goods__sum">$ ${elem.sum}</div>
		</div>`
      );
    });
  }

  addingProductToHTML(totalCartArr);

  function countProductSum(arr) {
    let totalSum = 0;
    arr.forEach((elem) => {
      totalSum += elem.sum;
    });
    return totalSum;
  }

  totalSumHTML.innerHTML = `$ ${countProductSum(totalCartArr)}`;

  function countAllProducts(arr) {
    let totalCount = 0;
    arr.forEach((elem) => {
      totalCount += elem.count;
    });
    return totalCount;
  }

  totalCountHTML.innerHTML = `${countAllProducts(totalCartArr)}`;
});
