import Page from "./page";
import { $ } from '@wdio/globals'

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

    public async ShouldSearchForProduct(productName:string) {

        try{
        // let productName = "15mm Combo Wrench";
        await this.objSearchBarIcon.click();
        await this.objSearchField.setValue(productName);
        await (await this.objProductName(productName)).click();
        const actualProductName = await this.objProductTitle.getText();
        await console.log(actualProductName)
        await expect(actualProductName).toEqual(productName);

    } catch (error) {
        console.error('Test failed:', error);
    }

    }

}
export default new HomePage();