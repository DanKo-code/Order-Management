import { LightningElement, api, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import CURT_SHOW_CHANNEL from '@salesforce/messageChannel/Curt_Show__c';
import ADD_TO_CART_CHANNEL from '@salesforce/messageChannel/Add_To_Cart__c';

import USER_ID from '@salesforce/user/Id';


import createOrder from '@salesforce/apex/ProductController.createOrder'
import createOrderItem from '@salesforce/apex/ProductController.createOrderItem'
import getLastAddOrder from '@salesforce/apex/ProductController.getLastAddOrder'

import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

const columns = [
    { label: 'Product Name', fieldName: 'Name' },
    { label: 'Description', fieldName: 'Description__c' },
    { label: 'Type', fieldName: 'Type__c' },
    { label: 'Family', fieldName: 'Family__c' },
    { label: 'Price', fieldName: 'Price__c', type: 'currency' },
    { label: 'Img', fieldName: 'Image__c', type: 'customImage' },
    { label: 'Amount', fieldName: 'amount' },
];

export default class ModalCart extends NavigationMixin(LightningElement) {
    showModal = false;
    @api show() {
        this.showModal = true;
    }
    handleDialogClose() {
        this.showModal = false;
    }


    //redux
    subscription = null;
    subscription2 = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            CURT_SHOW_CHANNEL,
            (message) => this.handleMessage(message)
        );

        this.subscription2 = subscribe(
            this.messageContext,
            ADD_TO_CART_CHANNEL,
            (message) => this.handleMessage2(message)
        );
    }

    handleMessage(message) {

        if (message.Type === 'show')
            this.show()

    }

    handleMessage2(message) {

        //alert(JSON.stringify(message.add))

        const foundElement = this.products.find(element => element.Id === message.add.Id)

        if (foundElement) {
            foundElement.amount += 1
            foundElement.Price__c += message.add.Price__c
        }
        else {
            this.products.push({ ...message.add, amount: 1 })
        }
    }


    //Work with accountInf
    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.currentPageReference = currentPageReference;
    }



    //dataTable
    columns = columns;
    @api products = []

    lastOrder;

    // async handleCheckout() {
    //     alert(this.currentPageReference?.state?.c__accountId)
    //     newOrderId = await createOrder({
    //         name: "Order))",
    //         accountId: this.currentPageReference?.state?.c__accountId
    //     });

    //     this.products.forEach(element => {

    //         //alert(JSON.stringify(element))

    //         //delete element.amount

    //         debugger
    //         alert("this is newOrderId" + newOrderId)
    //         try {
    //             await createOrderItem(newOrderId, element.Id)
    //         } catch (error) {
    //             alert(error)
    //         }

    //     });
    // }

    async handleCheckout() {
        const accountId = this.currentPageReference?.state?.c__accountId;
        //alert(accountId);

        const newOrderId = await createOrder({
            accountId: accountId
        });

        for (const element of this.products) {
            try {
                //delete element.amount
                await createOrderItem({ orderId: newOrderId.Id, productId: element.Id, quantity: element.amount, price: element.Price__c });
            } catch (error) {
                alert(JSON.stringify(error));
            }
        }

        //Navigate
        await this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Order__c',
                actionName: 'list',
            },
            state: {
                filterName: '00B2t000000O79lEAC'
            }
        })
    }
}