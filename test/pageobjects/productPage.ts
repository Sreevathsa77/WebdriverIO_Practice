import Page from "./page";
import { $ } from '@wdio/globals'

class HomePage extends Page {

    private get objSearchBarIcon() {
        return $("//*[@class='modal__toggle-open icon icon-search']")
    }

    private get objSearchField() {
        return $("#Search-In-Modal")
    }

    private async objProductName(productName: string) {
        const xpath = `//*[text()="${productName}"]`;
        return $(xpath);
    }

    private get objAddToCart() {
        return $("//button[@name='add']");
    }

    private get objProductTitle() {
        return $("//div[@id='ProductInfo-template--15328405717213__main']/h1");
    }

    private get objProductPrice(){
        return $("//div[@class='price__regular']/span[2]")
    }

    private get objCartIcon(){
        return $("//*[@class='icon icon-cart']");
    }

    private get objCheckout(){
        return $("//form[@id='cart-notification-form']/button");
    }

    public async ShouldSearchForProduct(productName: string) { 
        let productPrice;
        try {
            await this.objSearchBarIcon.click();
            await this.objSearchField.setValue(productName);
            await (await this.objProductName(productName)).click();
            const actualProductName = await this.objProductTitle.getText();
            await expect(actualProductName).toEqual(productName);

            let productPrices = await this.objProductPrice.getText();
             productPrice = productPrices.split(" ")[1].trim();
           
        } catch (error) {
            console.error('Test failed:', error);
        }
        return productPrice;
    }


    public async ShouldAddProductToCart(productName: string) {
       let productPrice =  await this.ShouldSearchForProduct(productName);
        try{
        await this.ShouldSearchForProduct(productName);
        await this.objAddToCart.click();
        await this.objCartIcon.click();
        await this.objCheckout.click();
        }catch(error){
            console.error('Test failed:', error)
        }
        return productPrice;

    }



}
export default new HomePage();