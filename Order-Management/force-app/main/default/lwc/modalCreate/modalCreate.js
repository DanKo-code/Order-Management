import { LightningElement, api, wire, track } from 'lwc';

import { subscribe, publish, MessageContext } from 'lightning/messageService';
import CREATE_SHOW_CHANNEL from '@salesforce/messageChannel/Create_Show__c';
import SEND_PRODUCT_CHANNEL from '@salesforce/messageChannel/Send_product__c';

import { ShowToastEvent } from 'lightning/platformShowToastEvent'

import createProduct from '@salesforce/apex/ProductController.createProduct'

import getImage from '@salesforce/apex/imageGetter.getImage'


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

            debugger
            //Проверка на цену
            if (isNaN(this.Price)) {
                this.showToastErrorPrice();
                return;
            }


            if (this.Image === '') {
                getImage({ prodName: this.ProductName })
                    .then(result => {
                        this.Image = result
                    })
                    .then(() => {

                        this.newProduct = {
                            Name: this.ProductName,
                            Description__c: this.Description,
                            Type__c: this.Type,
                            Family__c: this.Family,
                            Price__c: this.Price,
                            Image__c: this.Image
                        }

                        createProduct({
                            name: this.newProduct.Name,
                            description: this.newProduct.Description__c,
                            type: this.newProduct.Type__c,
                            family: this.newProduct.Family__c,
                            price: this.newProduct.Price__c,
                            image: this.newProduct.Image__c
                        }).then(() => {
                            try {

                                const payload = {
                                    add: this.newProduct
                                }

                                publish(this.messageContext, SEND_PRODUCT_CHANNEL, payload)

                            } catch (error) {
                                alert(error)
                            }


                            debugger
                            this.handleDialogClose()
                            this.showToastSuccess()
                        })
                            .catch(error => {
                                this.errors = error;
                                alert(JSON.stringify(error))
                            })
                    })

            }
            else {
                this.newProduct = {
                    Name: this.ProductName,
                    Description__c: this.Description,
                    Type__c: this.Type,
                    Family__c: this.Family,
                    Price__c: this.Price,
                    Image__c: this.Image
                }

                createProduct({
                    name: this.newProduct.Name,
                    description: this.newProduct.Description__c,
                    type: this.newProduct.Type__c,
                    family: this.newProduct.Family__c,
                    price: this.newProduct.Price__c,
                    image: this.newProduct.Image__c
                })
                    .then(() => {
                        try {

                            const payload = {
                                add: this.newProduct
                            }

                            publish(this.messageContext, SEND_PRODUCT_CHANNEL, payload)
                        } catch (error) {
                            alert(error)
                        }



                        this.handleDialogClose()
                        this.showToastSuccess()
                    })
            }
        }

        else {
            this.showToastError();
        }
    }

    //TOAST_EVENT
    showToastErrorPrice() {
        const event = new ShowToastEvent({
            title: 'Alert!',
            message: 'Input number price!',
            variant: 'error'
        });
        this.dispatchEvent(event);
    }

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