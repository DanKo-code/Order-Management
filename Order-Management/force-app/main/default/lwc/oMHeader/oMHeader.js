import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi'
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_NUMBER_FIELD from '@salesforce/schema/Account.AccountNumber';

import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
const fields = [NAME_FIELD];


import { publish, MessageContext } from 'lightning/messageService';
import CURT_SHOW_CHANNEL from '@salesforce/messageChannel/Curt_Show__c';
import CREATE_SHOW_CHANNEL from '@salesforce/messageChannel/Create_Show__c';

import getLoggedInAccount from '@salesforce/apex/AccountController.getLoggedInAccount';


import { CurrentPageReference } from 'lightning/navigation';



export default class OMHeader extends LightningElement {


    accountName;
    accountNumber;

    @wire(CurrentPageReference)
    handlePageReference(currentPageReference) {
        const urlParams = new URLSearchParams(currentPageReference.state.extraState);
        this.accountName = urlParams.get('accountName');
        this.accountNumber = urlParams.get('accountNumber');
    }

    @wire(MessageContext)
    messageContext;

    // @wire(MessageContext)
    // messageContext2;

    handleCart() {
        const payload = {
            Type: 'show'
        }

        publish(this.messageContext, CURT_SHOW_CHANNEL, payload)
    }

    handleCreate() {
        debugger
        const payload = {
            Type: 'show'
        }

        publish(this.messageContext, CREATE_SHOW_CHANNEL, payload)
    }
}