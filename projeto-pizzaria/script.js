const s = (el)=>document.querySelector(el);
const sa = (el)=>document.querySelectorAll(el);
let modalQnt = 1;
let cart = [];
let modalKey = 0;
pizzaJson.map((item, index)=>{
    // preenchendo as informações da classe pizza item do template
    let pizzaItem = s('.models .pizza-item').cloneNode(true); 

    // informando na variavel data-key qual é a pizza escolhida, atraves do seu index
    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.pizza-item--name').innerHTML= item.name; 
    pizzaItem.querySelector('.pizza-item--desc').innerHTML= item.description; 
    pizzaItem.querySelector('.pizza-item--price').innerHTML= `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        //bloqueando a ação de atualizar tela present na tag a do template
        e.preventDefault();
        // informando ao modal qual foi a pizza clicada, atraves do data-key
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQnt = 1;
        modalKey = key


         
           
        s('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        s('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        s('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        s('.pizzaBig img').src = pizzaJson[key].img;
        s('.pizzaInfo--size.selected').classList.remove('selected');
        sa('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 1){
                size.classList.add('selected');
            }
        size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        s('.pizzaInfo--qt').innerHTML = modalQnt;
        // abrindo o modal
        s('.pizzaWindowArea').style.opacity = 0;
        s('.pizzaWindowArea').style.display = "flex";
        setTimeout(()=>{
            s('.pizzaWindowArea').style.opacity = 1;
        },150);       
    });
    // aqui adiciona o item clonado na área correspondente no template  
    s('.pizza-area').append( pizzaItem );
});

//eventos do modal
function closeModal(){
    s('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        s('.pizzaWindowArea').style.display= 'none';
    }, 500);
}
sa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
   item.addEventListener('click', closeModal);
});
s('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQnt > 1){
    modalQnt --;
    s('.pizzaInfo--qt').innerHTML = modalQnt;
}
});

s('.pizzaInfo--qtmais').addEventListener('click', ()=>{
modalQnt ++;
s('.pizzaInfo--qt').innerHTML = modalQnt;
});

sa('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        s('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        if(sizeIndex == 0){
            price = price * 0.8;
        } else if(sizeIndex == 1){
            price = price * 1.3
        }
        sa('.pizzaInfo--actualPrice').innerHTML= `R$ ${pizzaJson[key].price.toFixed(2)}`;
    });
});


 

// adiciona as informações para a variavel cart(carrinho)
s('.pizzaInfo--addButton').addEventListener('click', ()=>{
let size =  parseInt(s('.pizzaInfo--size.selected').getAttribute('data-key'));

let identifier = pizzaJson[modalKey].id+'@'+size;

let key = cart.findIndex((item)=> item.identifier == identifier);

if(key > -1){
cart[key].qnt += modalQnt;
} else {
cart.push({
    identifier,
    id:pizzaJson[modalKey].id,
    size,
    qnt:modalQnt
});
}
updateCart();
closeModal();
});

//evento de click no carrinho do mobile
s('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
s('aside').style.left = '0';
    }
});
s('.menu-closer').addEventListener('click' , ()=>{
    s('aside').style.left = '100vw';
} )

function updateCart(){
    //primeira linha atualiza no mobile
    s('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){
   s('aside').classList.add('show');
   s('.cart').innerHTML ='';

   let subTotal = 0;
   let desconto = 0;
   let total = 0;

   for(let i in cart) {
    let pizzaItem = pizzaJson.find((item)=>
        item.id == cart[i].id);
  // calculando o valor dentro do carrinho
    subTotal += pizzaItem.price * cart[i].qnt; 

        let cartItem = s('.models .cart--item').cloneNode(true);  
        let pizzaSizeName ;  
        switch(cart[i].size) {
            case 0:
                pizzaSizeName = 'P'
                break;
            case 1:
                pizzaSizeName = 'M'
                break;
            case 2:
                pizzaSizeName = 'G'
                break;       
        }

        let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
        cartItem.querySelector('img').src = pizzaItem.img;
        cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
        cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qnt;
        cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
            if(cart[i].qnt > 1){
            cart[i].qnt--;
        } else{
            // splice remove a pizza do carrinho 
            cart.splice(i , 1);
        }
            updateCart();
        });
        cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
            cart[i].qnt++;
            updateCart();
        });




        s('.cart').append(cartItem);   
    if(subTotal > 80){
        desconto = subTotal * 0.1;
        total = subTotal - desconto;
    } else{
        desconto = 0;
        total = subTotal;
    }
    s('.subtotal span:last-child').innerHTML = `R$ ${subTotal.toFixed(2)}`;
    s('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
    s('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    }
   } else {
        s('aside').classList.remove('show');
        //fecha o aside no mobile
        s('aside').style.left = '100vw';
    }
}
function updatePrice(){
    if( sizeIndex == 0){
        price = price *0.8;
        pizzaItem.querySelector('.pizza-item--price').innerHTML= `R$ ${item.price.toFixed(2)}`;
    } else(sizeIndex == 2);{
        price = price * 1.3;
        pizzaItem.querySelector('.pizza-item--price').innerHTML= `R$ ${item.price.toFixed(2)}`;
    } 
}