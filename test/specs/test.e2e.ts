import HomePage from '../pageobjects/productPage.ts'
import CartPage from '../pageobjects/cartpage.ts'

describe('My Login application', () => {
    let productName = "15mm Combo Wrench";


    beforeEach('',async()=>[
        await HomePage.open()
    ])

    it('should select a product by name, navigate to the details page, and verify product details',  async () => {
        let productName = "15mm Combo Wrench";
        await HomePage.ShouldAddProductToCart(productName);
    });

    it('should add a product to the cart and validate the contents' , async ()=>{
        let productName = "15mm Combo Wrench";
        await CartPage.validateProductDetails(productName)

    })

    it('should remove the product from the cart and confirm the cart is empty', async () => {
      
      await HomePage.ShouldAddProductToCart(productName);
      await CartPage.removeProductsFromCart();
      
    });
    

    after('', async ()=>{
        await browser.closeWindow();

    })
});

