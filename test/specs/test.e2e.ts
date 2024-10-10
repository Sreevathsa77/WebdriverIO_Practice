import HomePage from '../pageobjects/homepage.ts'

describe('My Login application', () => {

    // before('',async()=>[
    //     await HomePage.open('')
    // ])

    it('should select a product by name, navigate to the details page, and verify product details',  async () => {
        await HomePage.open();
        let productName = "15mm Combo Wrench";
        await HomePage.ShouldSearchForProduct(productName);
    });
});

