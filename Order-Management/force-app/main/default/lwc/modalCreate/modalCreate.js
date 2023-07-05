import { LightningElement, api, wire } from 'lwc';

import { subscribe, publish, MessageContext } from 'lightning/messageService';
import CREATE_SHOW_CHANNEL from '@salesforce/messageChannel/Create_Show__c';
import SEND_PRODUCT_CHANNEL from '@salesforce/messageChannel/Send_Product__c';

import { ShowToastEvent } from 'lightning/platformShowToastEvent'


export default class ModalCreate extends LightningElement {
    showModal = false;
    @api show() {
        this.showModal = true;
    }
    handleDialogClose() {
        this.ProductName = ''
        this.Description = ''
        this.Type = ''
        this.Family = ''
        this.Price = ''
        this.Image = ''
        this.showModal = false;

    }

    //redux get 
    subscription = null;

    @wire(MessageContext)
    messageContext;



    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        debugger
        this.subscription = subscribe(
            this.messageContext,
            CREATE_SHOW_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {

        if (message.Type === 'show')
            this.show()

    }

    //redux sent


    //inputs
    ProductName = '';
    ProductNameChange(event) {
        this.ProductName = event.target.value;
    }

    Description = '';
    DescriptionChange(event) {
        this.Description = event.target.value;
    }

    Type = '';
    TypeChange(event) {
        this.Type = event.target.value;
    }

    Family = '';
    FamilyChange(event) {
        this.Family = event.target.value;
    }

    Price = '';
    PriceChange(event) {
        this.Price = event.target.value;
    }

    Image = '';
    ImageChange(event) {
        this.Image = event.target.value;
    }

    newProduct;
    handleCreate() {
        if (this.ProductName && this.Description && this.Type && this.Family && this.Price) {
            this.newProduct = {
                "id": '100',
                productName: this.ProductName,
                Description: this.Description,
                Type: this.Type,
                Family: this.Family,
                price: this.Price,
                img: this.Image
            }

            const payload = {
                add: this.newProduct
            }
            publish(this.messageContext, SEND_PRODUCT_CHANNEL, payload)

            this.handleDialogClose()
            this.showToastSuccess()
        }

        else {
            this.showToastError();
        }
    }

    //TOAST_EVENT
    showToastError() {
        const event = new ShowToastEvent({
            title: 'Alert!',
            message: 'Only image input is not required',
            variant: 'error'
        });
        this.dispatchEvent(event);
    }

    showToastSuccess() {
        const event = new ShowToastEvent({
            title: 'Alert!',
            message: 'Create was success',
            variant: 'success'
        });
        this.dispatchEvent(event);
    }

}