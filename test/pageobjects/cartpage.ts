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

    private get objTotalAmount(){
        return $("//p[@class='totals__subtotal-value']")
    }

    public async validateProductDetails(expectedName: string) {
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
    }
    

    public async getPrice(price: string) {
        return price.split(" ")[1].trim();

    }

    public async getDiscountPrice(discountAmountString: string) {
        let discountAmounts;
        let parts = discountAmountString.split("(-Rs. ");
        if (parts.length > 1) {
         discountAmounts = parts[1].split(")")[0].trim();
        } else {
            console.log("Discount amount not found.");
        }
        return discountAmounts;
    }

    public async validateCartTotal(expectedTotal: string) {
        let cartTotals = await this.cartTotal.getText();
        const cartTotal = await this.getPrice(cartTotals);
        await this.objDiscountPrice.getText();
        const actualTotal = await this.cartTotal.getText();
        expect(actualTotal).toEqual(expectedTotal);
    }

    public async convertStringToNo(amount:any){
         amount= parseFloat(amount);
         return amount;
    }

    public async getTotal(totalAmount: any, actualProductPrice: any, discountAmount: any) {
        totalAmount = await this.convertStringToNo(totalAmount);
        actualProductPrice = await this.convertStringToNo(actualProductPrice);
        discountAmount = await this.convertStringToNo(discountAmount);
        const finalPriceAfterDiscount = actualProductPrice - discountAmount;
        await expect(finalPriceAfterDiscount).toEqual(totalAmount);
    }
    
    
}

export default new CartPage();
