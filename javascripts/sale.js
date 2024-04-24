const product=[
  {id:1, name:"オリジナルブレンド200g", price:"500円"},
  {id:2, name:"オリジナルブレンド500g", price:"900円"},
  {id:3, name:"スペシャルブレンド200g", price:"700円"},
  {id:4, name:"スペシャルブレンド500g", price:"1200円"}
] 
const productElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

function add() {
    const productId =productElement.value;
    const price = product.filter(item=>item.id==productId)[0].price;
    const name = product.filter(item=>item.id==productId)[0].name;
    const number = numberElement.value;
    
    let purchase = {
      name:name,
      price: parseInt(price),
      number: parseInt(number),
    };
  
    const newPurchase = purchases.findIndex((item) => item.price === purchase.price) 
    if(purchases.length < 1 || newPurchase === -1) {
      purchases.push(purchase)
    } else {
      purchases[newPurchase].number += purchase.number
    }
  
    window.alert(`${display()}\n\n小計${subtotal()}円`);
    productElement.value = "";
    numberElement.value = "";
  }

function display() {
    return purchases.map((purchase)=>{
       return `${purchase.name} ${purchase.price}円:${purchase.number}点`
    }).join("\n");
}

function subtotal() {
    return purchases.reduce((prev,value)=>{
        return  value.price*value.number+prev;
    }, 0)
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  window.alert(`${display()}\n\n小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`);
  purchases = [];
  productElement.value= "";
  numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 2000){
   return 500;
  } else {
   return 250;
  }
}

