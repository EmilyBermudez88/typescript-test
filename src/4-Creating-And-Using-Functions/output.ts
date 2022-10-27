import { productsURL } from '../lib';

const prefix = '🐉 ';

//common to see this at the beginnign of code, defining everything so you don' thave to explicitly define later
type ProductType = {
  id: number,
  name:string,
  icon?:string
}


export default async function updateOutput(id:string){
  //need await here because we are awaiting the getProducts function to return the values first
    const products = await getProducts();
    const output = document.querySelector(`#${id}`);
    const html = layoutProducts(products);

    //if both the output and html exist, then the contents of the layoutProducts function will be put inside the output id div
    if(output && html){
      output.innerHTML= html;
    }
}

function layoutProducts(products: ProductType[]) {
  const items = products.map(({ id, name, icon }) => {
    const productHtml = `
    <span class="card-id">#${id}</span>
      <i class="card-icon ${icon} fa-lg"></i>
    <span class="card-name">${name}</span>
    `;
    const cardHtml = `
    <li>
        <div class="card">
            <div class="card-content">
                <div class="content">
                ${productHtml}
                </div>
            </div>
        </div>
    </li>
    `;
    return cardHtml;
  });
  let productsHtml = `<ul>${items.join('')}</ul>`;
  return productsHtml;
}

//async and await are pared together - you need to declare the function as an async function
//then inside you need to define what you are awaiting, which is usually a fetch call (looking for productsURL)
  //type of Promise added in at end
async function getProducts():Promise<ProductType[]>{
  //if you hovered over this previously, you saw it defined as response:Response, so you can explicity add it in
  //if you hover over fetch its return is a Promise of Response, so you can then assign the type of response to be "Response"
  const response:Response= await fetch(productsURL);
  //for this one, we know we are retrieving from the productType array (just how this code is laied out)- so we can explicity define it's type to be that of a ProductType array
  const products:ProductType[] = await response.json();
  //now we see that the return value is going to be ProductType[]
    //to be doubly protected, you can no go up to the top of hte function, and explicity lay out the type there (its return value is a Promise, with the value of ProductType array (see top of function))
  return products;
}



//THIS IS JUST FOR EXPERIMENTING AND LEARNING NOW (ABOVE WAS PUTTING ON PAGE)

//run our samples
runTheLearningSamples();

function runTheLearningSamples(){
  //this is hoisted (it's ok to call it before defining it)
  function displayProductInfo(id: number, name:string){
    console.log(`${prefix} typed parameters`)
    console.log(`product id = ${id} and name= ${name}`)
  }
  displayProductInfo(10, 'Pizza')

  console.log(addNumbersDeclaration(7,11))
  function addNumbersDeclaration(x:number, y:number){
    const sum:number = x + y;
    return sum;
  }

  const sampleProducts = [
    {
      id: 10,
      name: 'Pizza slice',
      icon: 'fas fa-pizza-slice',
    },
    {
      id: 20,
      name: 'Ice cream',
      icon: 'fas fa-ice-cream',
    },
    {
      id: 30,
      name: 'Cheese',
      icon: 'fas fa-cheese',
    },
  ];

  function getProductNames():string[]{
    return sampleProducts.map(p => p.name)
  }
  console.log(getProductNames());

  //good to have both options showing here: you can make sure it's a type of ProductType, but if it DOESN'T match, then you have undefined instead of an error thrown
  function getProductById(id:number): ProductType | undefined{
    return sampleProducts.find(p => id ===p.id)
  }
  console.log(getProductById(10))

//so this function doesn't have a return, so it register the function as a void type (it doesn't return anything)
//you COULD explicity lay it out, and have it as :
// displayProducts(products:ProductType[]):void { // do something}
  function displayProducts(products: ProductType[]){
    const productNames = products.map(p=>{
        const name = p.name.toLowerCase();
        return name;
    });
    const msg= `Sample products include ${productNames.join(', ')}`
    console.log(msg);
  }
  displayProducts(sampleProducts)

  const getRandomInt = (max:number)=> Math.floor(Math.random()*max)
  //without :ProductType, it's going to return a random object, BUT we want it to return a ProductType instead 
  function createProduct(name:string, icon?:string):ProductType{
    const id= getRandomInt(1000)
      return {
        id, 
        name, 
        icon
      };
  }
  console.log(`${prefix} Optional Paramters`);
  let pineapple = createProduct('pineapple', 'pine-apple.jpg');
  let mango = createProduct('mango')
  //when you see the console, you cna see the pinapple is an object with the id, name and icon included.
  //the mango has icon: undefined, because the mango icon doesn't exist
  //if you took the ? off of the icon, it would thrown an error that the second argument isn't provided 
  console.log(pineapple, mango)

//NOW LET'S TRY THE SAME CREATE PRODUCT FUNCTION WITH DEFAULTS
function createProductWithDefaults(name:string, icon:string= "generic-fruit.jpg"):ProductType{
  const id= getRandomInt(10)
    return {
      id, 
      name, 
      icon
    };
}
console.log(`${prefix} Default Paramters`);
   pineapple = createProductWithDefaults('pineapple', 'pine-apple.jpg');
   mango = createProductWithDefaults('mango')
  //when you see the console, you cna see the pinapple is an object with the id, name and icon included.
  //the mango has icon: undefined, because the mango icon doesn't exist
  //if you took the ? off of the icon, it would thrown an error that the second argument isn't provided 
  console.log(pineapple, mango)

  function buildAddress(street:string, city:string, ...restOfAddress: string[]){
    const address = `${street}, ${city}, ${restOfAddress.join(' ')}`;
    return address;
  }

  const someAddress = buildAddress(
      "15 Torrens Ave",
      "Toronto",
      "Canada",
      "M4K2H9"
  )
  console.log(someAddress)

//here we are using destructuring- because we know that the type is ProductType, we KNOW that it is an object being passed in
//if so, then we can pull out the key/value pairs we want, instead of having to type product. id, product.name, product.whatever over and over again
  function displayProduct({id, name}:ProductType):void {
    console.log(`${prefix} Destructuring Parameters`)
    console.log(`Product id=${id} and name= ${name}`)
  }
  const prod = getProductById(10);
  if (prod){
      displayProduct(prod)
  }
}
