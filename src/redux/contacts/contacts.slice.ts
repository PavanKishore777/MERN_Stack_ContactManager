import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import * as contactActions from "./contacts.action"
import {Toastutil} from "../../util/Toastutil";
import {IContactView} from "../../model/IContactView";
import {IGroupView} from "../../model/IGroupView";

export const contactFeature = "contactFeature";

export interface InitialState {
    loading: boolean,
    contacts: IContactView[],
    groups: IGroupView[],
    group: IGroupView,
    contact: IContactView,
    errorMessage: SerializedError
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    contacts: [] as IContactView[],
    groups: [] as IGroupView[],
    contact: {} as IContactView,
    group: {} as IGroupView
}

export const contactSlice = createSlice({
    name: `contactSlice`,
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(contactActions.getalluserscontactsaction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactActions.getalluserscontactsaction.fulfilled, (state, action) => {
            state.loading = false;
            state.contacts = action.payload;
        }).addCase(contactActions.getalluserscontactsaction.rejected, (state, action) => {
            state.loading = false;
            Toastutil.displayerror("unable to get data")
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error;
            }
        })
        /**
         * get contact
         */
        builder.addCase(contactActions.getcontactaction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactActions.getcontactaction.fulfilled, (state, action) => {
            state.loading = false;
            state.contact = action.payload;
        }).addCase(contactActions.getcontactaction.rejected, (state, action) => {
            state.loading = false;
            Toastutil.displayerror("unable to get contact")
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error;
            }
        })
        /**
         * create contact
         */
        builder.addCase(contactActions.createcontactaction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactActions.createcontactaction.fulfilled, (state, action) => {
            state.loading = false;
            Toastutil.displaysuccess("contact created successfully")
        }).addCase(contactActions.createcontactaction.rejected, (state, action) => {
            state.loading = false;
            Toastutil.displayerror("unable to add contact")
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error;
            }
        })
        /**
         * update contact
         */
        builder.addCase(contactActions.updatecontactaction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactActions.updatecontactaction.fulfilled, (state, action) => {
            state.loading = false;
            Toastutil.displatinfotoast("contact updated successfully")
        }).addCase(contactActions.updatecontactaction.rejected, (state, action) => {
            state.loading = false;
            Toastutil.displayerror("unable to add contact")
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error;
            }
        })

        /**
         * delete contact
         */
        builder.addCase(contactActions.deletecontactaction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactActions.deletecontactaction.fulfilled, (state, action) => {
            state.loading = false;
            Toastutil.displatinfotoast("contact Deleted successfully")
        }).addCase(contactActions.deletecontactaction.rejected, (state, action) => {
            state.loading = false;
            Toastutil.displayerror("unable to delete contact")
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error;
            }
        })

        /**
         * getall groups
         */
        builder.addCase(contactActions.getallgroupaction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactActions.getallgroupaction.fulfilled, (state, action) => {
            state.loading = false;
            state.groups = action.payload;
        }).addCase(contactActions.getallgroupaction.rejected, (state, action) => {
            state.loading = false;
            Toastutil.displayerror("unable to fetch group data")
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error;
            }
        })

        /**
         * get group
         */
        builder.addCase(contactActions.getgroupaction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactActions.getgroupaction.fulfilled, (state, action) => {
            state.loading = false;
            state.group = action.payload;
        }).addCase(contactActions.getgroupaction.rejected, (state, action) => {
            state.loading = false;
            Toastutil.displayerror("unable to fetch group data")
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.error;
            }
        })
    }
})