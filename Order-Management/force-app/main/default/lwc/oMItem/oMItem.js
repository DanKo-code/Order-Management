import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class OMItem extends LightningElement {
    @api product;

    handleDetails() {
        const event = new CustomEvent('detailsclick', {
            detail: this.product,
            bubbles: true
        });

        this.dispatchEvent(event);
    }

    handleCartAdd() {
        this.showToast();
    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Alert!',
            message: 'Product added to cart',
            variant: 'success'
        });
        this.dispatchEvent(event);
    }
}