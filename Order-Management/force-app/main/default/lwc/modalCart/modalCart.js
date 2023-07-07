import { LightningElement, api, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import CURT_SHOW_CHANNEL from '@salesforce/messageChannel/Curt_Show__c';
import ADD_TO_CART_CHANNEL from '@salesforce/messageChannel/Add_To_Cart__c';

import USER_ID from '@salesforce/user/Id';


import createOrder from '@salesforce/apex/ProductController.createOrder'
import createOrderItem from '@salesforce/apex/ProductController.createOrderItem'
import getLastAddOrder from '@salesforce/apex/ProductController.getLastAddOrder'

const columns = [
    { label: 'Product Name', fieldName: 'Name' },
    { label: 'Description', fieldName: 'Description__c' },
    { label: 'Type', fieldName: 'Type__c' },
    { label: 'Family', fieldName: 'Family__c' },
    { label: 'Price', fieldName: 'Price__c', type: 'currency' },
    { label: 'Img', fieldName: 'Image__c', type: 'customImage' },
    { label: 'Amount', fieldName: 'amount' },
];

export default class ModalCart extends LightningElement {
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
        }
        else {
            this.products.push({ ...message.add, amount: 1 })
        }
    }


    //dataTable
    columns = columns;
    @api products = []

    lastOrder;

    handleCheckout() {
        createOrder({
            name: "Order))",
            userId: USER_ID
        })
            .then(result => {
                // Обрабатываем успешное создание заказа
                alert(result);
                return getLastAddOrder(); // Возвращаем промис для следующего вызова
            })
            .then(result => {
                // Получаем последний добавленный заказ
                this.lastOrder = result;
                debugger;
                alert(JSON.stringify(this.lastOrder));
                return Promise.all(this.products.map(element => {
                    delete element.amount;
                    alert(JSON.stringify(element));
                    return createOrderItem({
                        name: "OrderItem))",
                        lastOrder: this.lastOrder,
                        product: element
                    });
                }));
            })
            .then(results => {
                // Обрабатываем успешное создание всех Order Item
                results.forEach(result => {
                    alert('OrderItem created:', result);
                });
            })
            .catch(error => {
                // Обрабатываем ошибку при выполнении любого из вызовов
                console.error('Error:', error);
            });
    }
}