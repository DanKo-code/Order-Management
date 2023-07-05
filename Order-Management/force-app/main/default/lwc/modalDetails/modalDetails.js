import { LightningElement, api } from 'lwc';

export default class ModalDetails extends LightningElement {
    showModal = false;

    @api show() {


        this.productKeys = Object.keys(this.product);
        this.productValues = Object.values(this.product);

        try {
            for (const key in this.product) {

                this.productKeysValues.push({ Key: key, Value: this.product[key] })

            }
        } catch (error) {
            alert(error)
        }


        debugger
        this.showModal = true;
    }
    handleDialogClose() {
        this.showModal = false;
    }

    checkimg(key) {
        return key === 'img';
    }

    @api product;
    productKeys;
    productValues;
    productKeysValues = [];
}