import HomePage from '../pageobjects/homepage.ts'

describe('My Login application', () => {

    // before('',async()=>[
    //     await HomePage.open('')
    // ])

    it('should select a product by name, navigate to the details page, and verify product details',  () => {
        HomePage.open();
         HomePage.ShouldSearchForProduct();
    });
});

