import {createAsyncThunk} from "@reduxjs/toolkit";
import {Contactservice} from "../../services/Contactservice";
import {IContactView} from "../../model/IContactView";
import {IGroupView} from "../../model/IGroupView";

/**
 * getallcontact action
 */
export const getalluserscontactsaction: any = createAsyncThunk("users/getallusers", async (payload: {}, {rejectWithValue}): Promise<IContactView[] | any> => {
    try {
        const response = await Contactservice.getallcontacts();
        return response.data;
    } catch (error: any) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data)
    }
})
/**
 * get a contact
 */
export const getcontactaction: any = createAsyncThunk("users/getcontact", async (payload: {
    contactId: string
}, {rejectWithValue, dispatch}): Promise<IContactView[] | any> => {
    try {
        const {contactId} = payload;
        const response = await Contactservice.getcontact(contactId);
        if (response && response.data) {
            dispatch(getgroupaction({contact: response.data}))//get group info here when we get contact object
        }
        return response.data;
    } catch (error: any) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data)
    }
})
/**
 * create contact
 */
export const createcontactaction: any = createAsyncThunk("users/createcontact", async (payload: {
    contact: IContactView
}, {rejectWithValue}): Promise<IContactView[] | any> => {
    try {
        const {contact} = payload;
        const response = await Contactservice.createcontact(contact);
        return response.data;
    } catch (error: any) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data)
    }

})
/**
 * updatecontact
 */
export const updatecontactaction: any = createAsyncThunk("users/updatecontact", async (payload: {
    contact: IContactView,
    contactId: string
}, {rejectWithValue}): Promise<IContactView[] | any> => {
    try {
        const {contact, contactId} = payload;
        const response = await Contactservice.updatecontact(contact, contactId);
        return response.data;
    } catch (error: any) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data)
    }

})

/**
 * delete contact
 */
export const deletecontactaction: any = createAsyncThunk("users/deletecontact", async (payload: {
    contactId: string
}, {rejectWithValue, dispatch}): Promise<IContactView[] | any> => {
    try {
        const {contactId} = payload;
        const response = await Contactservice.deletecontact(contactId);
        if (response && response.data) {
            dispatch(getalluserscontactsaction());//get the data after deleted the specific contact deleted
        }
    } catch (error: any) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data)
    }

});

/**
 * get all groups
 */

export const getallgroupaction: any = createAsyncThunk("users/getallgroup", async (payload: {}, {rejectWithValue}): Promise<IGroupView[] | any> => {
    try {
        const response = await Contactservice.getallgroups()
        return response.data;
    } catch (error: any) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data)
    }

});
/**
 * get a group
 */
export const getgroupaction: any = createAsyncThunk("users/getgroup", async (payload: {
    contact: IContactView
}, {rejectWithValue}): Promise<IGroupView | any> => {
    const {contact} = payload
    try {
        const response = await Contactservice.getgroup(contact)
        return response.data;
    } catch (error: any) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data)
    }

});