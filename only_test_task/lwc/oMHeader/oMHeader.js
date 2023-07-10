import { LightningElement, track, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi'
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_NUMBER_FIELD from '@salesforce/schema/Account.AccountNumber';

import USER_ID from '@salesforce/user/Id';
// import NAME_FIELD from '@salesforce/schema/User.Name';
// const fields = [NAME_FIELD];


import { publish, MessageContext } from 'lightning/messageService';
import CURT_SHOW_CHANNEL from '@salesforce/messageChannel/Curt_Show__c';
import CREATE_SHOW_CHANNEL from '@salesforce/messageChannel/Create_Show__c';


import Id from '@salesforce/user/Id';
import IS_MANAGER_FIELD from '@salesforce/schema/User.IsManager__c';
const fields = [IS_MANAGER_FIELD];

import { CurrentPageReference } from 'lightning/navigation';




export default class OMHeader extends LightningElement {
    @wire(MessageContext)
    messageContext;

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

    //Work with IS_ADMIN
    isManager = false;
    userId = Id;
    @wire(getRecord, { recordId: '$userId', fields })
    user;
    get isManagerr() {
        return getFieldValue(this.user.data, IS_MANAGER_FIELD);
    }

    //Work with accountInf
    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.currentPageReference = currentPageReference;
    }

    get accountName() {
        return this.currentPageReference?.state?.c__accountName;
    }

    get accountNumber() {
        return this.currentPageReference?.state?.c__accountNumber;
    }
}