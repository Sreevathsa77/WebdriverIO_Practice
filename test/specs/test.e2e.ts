import HomePage from '../pageobjects/productPage.ts'
import CartPage from '../pageobjects/cartpage.ts'

describe('My Login application', () => {

    beforeEach('',async()=>[
        await HomePage.open()
    ])

    it('should select a product by name, navigate to the details page, and verify product details',  async () => {
        let productName = "15mm Combo Wrench";
        // await HomePage.ShouldSearchForProduct(productName);
        await HomePage.ShouldAddProductToCart(productName);
    });

    xit('should add a product to the cart and validate the contents' , async ()=>{
        let productName = "15mm Combo Wrench";
        await CartPage.validateProductDetails(productName)

    })

    after('', async ()=>{
        await browser.closeWindow();

    })
});

