import { LightningElement, api } from 'lwc';

export default class OMItem extends LightningElement {
    @api product;

    handleDetails() {
        const event = new CustomEvent('detailsclick', {
            detail: this.product,
            bubbles: true
        });

        this.dispatchEvent(event);
    }
}