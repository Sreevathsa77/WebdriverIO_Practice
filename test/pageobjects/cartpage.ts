import { $ } from '@wdio/globals';
import Page from './page';
import ProductPage from './productPage.ts'

class CartPage extends Page {
    private get productName() {
        return $('//tr[1]/td[2]/a');
    }

    private get productPrice() {
        return $('//tr[1]/td[5]//span');
    }

    private get cartTotal() {
        return $("//div[@class='totals']/p");
    }

    private get objDiscountPrice() {
        return $("//*[contains(text(),'PERCENTAGE_DISC')]")
    }

    private get objTotalAmount() {
        return $("//p[@class='totals__subtotal-value']")
    }

    private get objCartCount() {
        return $("//input[@class='quantity__input']")
    }

    public async validateProductDetails(expectedName: string) {
        try {
            let productPrice = await ProductPage.ShouldAddProductToCart(expectedName);

            let actualProductName = await this.productName.getText();
            let actualProductPrices = await this.productPrice.getText();
            let actualProductPrice = await this.getPrice(actualProductPrices);

            let cartTotals = await this.cartTotal.getText();
            let cartTotal = await this.getPrice(cartTotals);

            let discountAmountString = await this.objDiscountPrice.getText();
            let discountAmount = await this.getDiscountPrice(discountAmountString);
            console.log("Discount: " + discountAmount);

            let totalAmountString = await this.objTotalAmount.getText();
            let totalAmount = await this.getPrice(totalAmountString);

            await expect(actualProductName).toEqual(expectedName);
            await expect(actualProductPrice).toEqual(productPrice);


            // Awaiting getTotal call to avoid unresolved promise
            await this.getTotal(totalAmount, actualProductPrice, discountAmount);
            await this.validateCartItemCount();
        } catch (error) {
            console.error('Test failed:', error);
        }
    }


    public async getPrice(price: string) {
        return price.split(" ")[1].trim();

    }

    public async getDiscountPrice(discountAmountString: string) {
        try {
            let discountAmounts;
            let parts = discountAmountString.split("(-Rs. ");
            if (parts.length > 1) {
                discountAmounts = parts[1].split(")")[0].trim();
            } else {
                console.log("Discount amount not found.");
            }
            return discountAmounts;
        } catch (error) {
            console.error('Test failed:', error);
        }
    }

    public async validateCartTotal() {
        try {
            let expectedTotal = 1;
            let cartTotals = await this.cartTotal.getText();
            const cartTotal = await this.getPrice(cartTotals);
            await this.objDiscountPrice.getText();
            const actualTotal = await this.cartTotal.getText();
            expect(actualTotal).toEqual(expectedTotal);
        } catch (error) {
            console.error('Test failed:', error);
        }
    }

    public async convertStringToNo(amount: any) {
        amount = parseFloat(amount);
        return amount;
    }

    public async getTotal(totalAmount: any, actualProductPrice: any, discountAmount: any) {
        try {
            totalAmount = await this.convertStringToNo(totalAmount);
            actualProductPrice = await this.convertStringToNo(actualProductPrice);
            discountAmount = await this.convertStringToNo(discountAmount);
            const finalPriceAfterDiscount = actualProductPrice - discountAmount;
            await expect(finalPriceAfterDiscount).toEqual(totalAmount);
        } catch (error) {
            console.error('Test failed:', error);
        }
    }

    private get objIncreaseCartCount() {
        return $("//button[@name='plus']")
    }

    private get objDeleteCartCount() {
        return $$("//*[@class='icon icon-remove']")
    }


    public async validateCartItemCount() {

        let expectedCount: number = 1;
        let itemCountText = await this.objCartCount.getValue();
        let itemCount = parseInt(itemCountText);
        await expect(itemCount).toEqual(expectedCount);

        for (let cartCount = 0; cartCount < 3; cartCount++) {
            // Increment cart count
            await this.objIncreaseCartCount.waitForClickable({ timeout: 5000 })
            await this.objIncreaseCartCount.click();

            // Get updated cart count text
            itemCountText = await this.objCartCount.getValue();

            // Parse to integer
            itemCount = parseInt(itemCountText);
            expectedCount++;

            // Validate the expected count
            await expect(itemCount).toEqual(expectedCount);
        }
    }

    private get objCartEmptyText() {
        return $("//h1[@class='cart__empty-text']")
    }

    private get objCartDelete() {
        return $('#Remove-1')
        // return $$("//*[contains(@id, 'Remove')]")
    }

    public async removeProductsFromCart() {
        try {
            await browser.url("https://web-playground.ultralesson.com/cart")
            if( await this.objCartDelete.isDisplayed()){
            await this.objCartDelete.waitForClickable({ timeout: 5000 })
            await this.objCartDelete.click();
            }
            else{
                await console.log(`No products are added to cart to delete. Please add some item !!!!`)
            }

            await this.objCartEmptyText.waitForDisplayed({ timeout: 5000 });
            await expect(this.objCartEmptyText).toBeDisplayed();
        } catch (error) {
            console.error('Test failed:', error);
        }

    }


}

export default new CartPage();
