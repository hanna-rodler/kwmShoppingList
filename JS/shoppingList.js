let cartCounter=0;
let imgSrcInCart=[];
let total=0;

$(function() { // not deprecated version of $(document).ready(function() {}
  fillShop();
  accordion();
  
  // Add to cart by clicking on button "Add to Cart"
  $("input[value='Add to Cart']").on('click', function(e) {
    let clickedItem=$(e.currentTarget.parentElement).clone();
    addToCart(clickedItem);
  });
});

/**
 * [Adds an item to the cart, if it doesn't exist yet.
 * "Order"-Button is only added when there is at least one item in the cart.
 * If an item already exists, the quantity is updated.
 * The total amount of € in the cart is also updated each time an item is
 * added (newly or the quantity is updated).]
 *
 * @param currItem [the item where the button "Add to Cart" was clicked.]
 */
function addToCart(currItem) {
  let currImgSrc=currItem.children("img").attr("src");
  if(cartCounter===0) {
    // add first item to cart
    addFirstOfItem(currItem);
    imgSrcInCart[0]=currImgSrc;
    let orderBtn=$("input[value='Order']");
    orderBtn.removeClass("hidden");
    orderBtn.on("click", function() {
      alert("Thank you for your purchase!");
      emptyCart(orderBtn);
    });
  } else {
    let here=false;
    for(let itemSrc of imgSrcInCart) {
      // check if item already exists
      if(itemSrc===currImgSrc) {
        here=true;
        if(here) {
          // item already exists, update quantity
          let classList=currItem.attr("class").split(/\s+/);
          //let currClass = classList[1];
          let selector=`#cartContent .${classList[1]} .quantity`;
          let quantity=$(selector).html();
          quantity=Number(quantity)+1;
          $(selector).html(quantity);
          cartCounter++;
          updateTotal(currItem);
          //return here=true;
          return;
        }
      }
    }
    if(!here) {
      // item was not found
      addFirstOfItem(currItem)
      imgSrcInCart.push(currImgSrc);
    }
  }
  updateTotal(currItem);
}

/**
 * [Removes all items from the Cart, "resets" Cart to beginning status.]
 *
 * @param orderBtn [Button that lets user order items in cart.]
 */
function emptyCart(orderBtn) {
  $("#cartContent").children().remove();
  $("#total").html(0);
  orderBtn.addClass("hidden");
  cartCounter=0;
  total=0;
}

/**
 * [Update total monetary amount of purchase.]
 *
 * @param currItem [the item where the button "Add to Cart" was clicked.]
 */
function updateTotal(currItem) {
  let price=currItem.find(".price").html();
  total+=Number(price);
  $("#total").text(total);
}

/**
 * [Adds the item to cart if it's not in the cart yet.]
 *
 * @param currItem [the item where the button "Add to Cart" was clicked.]
 */
function addFirstOfItem(currItem) {
  currItem.find("input[type='button']").remove();
  currItem.find(".desc").remove();
  currItem.find(".hidden").removeClass("hidden");
  $("#cartContent").append(currItem);
  cartCounter++;
}

/**
 * [code from https://codepen.io/trobes/pen/PXyOMz
 * handles accordion display.]
 */
function accordion() {
  $('.toggle').click(function(e) {
    e.preventDefault();
    
    let $this=$(this);
    
    if($this.next().hasClass('show')) {
      $this.next().removeClass('show');
      $this.next().slideUp(350);
    } else {
      $this.parent().parent().find('li .inner').removeClass('show');
      $this.parent().parent().find('li .inner').slideUp(350);
      $this.next().toggleClass('show');
      $this.next().slideToggle(350);
    }
  });
}

/**
 * [Fills the shop with items. Adds them to the accordion.]
 */
function fillShop() {
  // Dresses
  addItem("#dress", "blackDress", "dress1_blackShort.jpg", "Black Short",
          "55");
  addItem("#dress", "pinkDress", "dress2_pinkLong.jpg", "Pink Waterfall",
          "45");
  addItem("#dress", "TurqDress", "dress3_lightTurqouiseLong.jpg", "Dream"+
    " in the Field", "45");
  addItem("#dress", "greenDress", "dress4_greenShort.jpg", "Short Green",
          "49");
  
  // Trousers
  addItem("#trousers", "redFlamenco",
          "trousers1_redFlamenco.jpg", "Red Flamenco", "35");
  addItem("#trousers", "caro",
          "trousers2_caro.jpg", "Caro", "45");
  addItem("#trousers", "pinkTrousers",
          "trousers3_lighPink.jpg", "Pink High Waist", "30");
  addItem("#trousers", "blueTrousers",
          "trousers4_blue.jpg", "Blue Comfy", "39");
  
  // Tops
  addItem("#top", "thoughtCatalog",
          "top1_thoughtCatalog.jpg", "Thought Catalog", "35");
  addItem("#top", "goalsDreamsMelanin",
          "top2_goals-dreams-melanin.jpg",
          "Goals, Dreams & Melanin", "35");
  addItem("#top", "serHacer",
          "top3_serHacer.jpg", "Ser &ne; Hacer", "25");
  addItem("#top", "loveWillSaveUs",
          "top4_loveWillSaveUs.jpg", "Love Will Save Us", "29");
  
  // Shoes
  addItem("#shoes", "brownStilettos", "shoes1_Stiefletten.jpg", "Brown"+
    " Stilettos", "55");
  addItem("#shoes", "pinkSporty", "shoes2_pink.jpg", "Sporty in Pink", "55");
  addItem("#shoes", "highHeels", "shoes3_highHeels.jpg", "Elegance", "49");
  addItem("#shoes", "redShoes", "shoes4_red.jpg", "Red Running", "49");
}

/**
 * [Dynamically adds an item to accordion.]
 *
 * @param appendID [Section where item should be added.]
 * @param itemClass [Class for item. (Class because item may also later
 * exist in cart.)]
 * @param imgSrc [Src for the image of the item.]
 * @param description [Description of item.]
 * @param price [Price for item (without "€" sign)]
 */
function addItem(appendID, itemClass, imgSrc, description, price) {
  let shopItem=`<div class='item ${itemClass}'>`+
    `<img src="imgs/${imgSrc}" alt="${description}">`+
    `<p class="desc">${description}</p>`+
    `<p class="hidden">Quantity: <span class="quantity">1</span>`+
    `</p><p>Price: <span class="price">${price}</span>€</p>`+
    `<input type="button" value="Add to Cart"></div>`
  $(appendID).append(shopItem);
}