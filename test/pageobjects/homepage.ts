import Page from "./page";
import { $ } from '@wdio/globals'

let productName = "15mm Combo Wrench";
class HomePage extends Page {

   private get objSearchBarIcon(){
    return $("//*[@class='modal__toggle-open icon icon-search']")
   }

   private get objSearchField(){
    return $("#Search-In-Modal")
   }

    private async objProductName(productName: string) {
        const xpath = `//*[text()="${productName}"]`;
        return $(xpath);
    }

    private get objAddToCart(){
        return $("//button[@name='add']");
    }

    private get objProductTitle(){
        return $("//div[@id='ProductInfo-template--15328405717213__main']/h1");
    }

    public async ShouldSearchForProduct() {

        try{
        // let productName = "15mm Combo Wrench";
        await this.objSearchBarIcon.click();
        await browser.pause(2000);
        await this.objSearchField.setValue(productName);
        await browser.pause(2000);
        await (await this.objProductName(productName)).click();
        await browser.pause(2000);
        const actualProductName = await this.objProductTitle.getText();
        await console.log(actualProductName)
        await expect(actualProductName).toEqual(productName);

    } catch (error) {
        console.error('Test failed:', error);
    }

    }

}
export default new HomePage();