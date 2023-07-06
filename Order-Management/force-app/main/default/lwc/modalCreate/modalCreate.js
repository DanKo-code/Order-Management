import { LightningElement, api, wire, track } from 'lwc';

import { subscribe, publish, MessageContext } from 'lightning/messageService';
import CREATE_SHOW_CHANNEL from '@salesforce/messageChannel/Create_Show__c';
import SEND_PRODUCT_CHANNEL from '@salesforce/messageChannel/Send_Product__c';

import { ShowToastEvent } from 'lightning/platformShowToastEvent'

import getPicklistValues from '@salesforce/apex/ProductController.getPicklistValues'


export default class ModalCreate extends LightningElement {


    // //try get options values!!!
    // @track typeValues = []
    // @track familyValues = []
    // @track errors

    // @wire(getPicklistValues, { objectApiName: 'Product__c', fieldName: 'Type__c' })
    // wiredPlayerList({ data, error }) {
    //     if (data) {
    //         this.typeValues = data;
    //     }
    //     else if (error) {
    //         this.errors = error;
    //         alert(error)
    //     }
    // }

    // @wire(getPicklistValues, { objectApiName: 'Product__c', fieldName: '__c' })
    // wiredPlayerList({ data, error }) {
    //     if (data) {
    //         this.familyValues = data;
    //     }
    //     else if (error) {
    //         this.errors = error;
    //         alert(error)
    //     }
    // }


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
        debugger
        this.Type = event.target.textContent;
    }

    Family = '';
    FamilyChange(event) {
        this.Family = event.target.textContent;
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
                Name: this.ProductName,
                Description__c: this.Description,
                Type__c: this.Type,
                Family__c: this.Family,
                Price__c: this.Price,
                Image__c: this.Image
            }

            const payload = {
                add: this.newProduct
            }

            try {
                publish(this.messageContext, SEND_PRODUCT_CHANNEL, payload)
            } catch (error) {
                alert(error)
            }



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