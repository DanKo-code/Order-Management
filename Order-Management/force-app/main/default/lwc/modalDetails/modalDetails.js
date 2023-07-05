import { LightningElement, api } from 'lwc';

export default class ModalDetails extends LightningElement {
    showModal = false;

    @api show() {
        this.showModal = true;
    }
    handleDialogClose() {
        this.showModal = false;
    }

    checkimg(key) {
        return key === 'img';
    }

    @api product;
}