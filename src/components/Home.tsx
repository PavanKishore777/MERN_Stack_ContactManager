import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Mininavbar from "./Mininavbar";
import Dummycard from "./Dummycard";
import "./styles/Home.css";
import Loading from "../Loading/Loading";
import * as contactActions from "../redux/contacts/contacts.action";
import * as contactReducer from "../redux/contacts/contacts.slice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import Errormessage from "../Error/Errormessage"; // Importing Errormessage component
import { IContactView } from "../model/IContactView";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
        return store[contactReducer.contactFeature]
    })

    useEffect(() => {
        dispatch(contactActions.getalluserscontactsaction())
    }, []);

    const { contacts, loading, errorMessage } = contactState

    const [searchTerm, setSearchTerm] = useState<string>("");

    const makesearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const filteredContacts = contacts.filter((contact: IContactView) => {
        const name = contact.name.toLowerCase().trim();
        const search = searchTerm.toLowerCase().trim();
        return name.includes(search);
    });

    const deletecontact = (contactId: string | undefined) => {
        dispatch(contactActions.deletecontactaction({contactId}))
    }

    return (
        <>
            {loading && <Loading/>} {/* Render loading spinner */}
            <div className="mt-2">
                <Heading Headingone="Manage " Headingtwo="Contacts" color="text-warning" colortwo="text-black"/>
            </div>
            {/* Rendering Errormessage component */}
            {/*{!loading && Object.keys(errorMessage).length > 0 && <Errormessage message={errorMessage.message}/>}*/}
            <Mininavbar makesearch={makesearch}/>
            {filteredContacts.length > 0 &&
                <section className="mt-3">
                    <div className="container">
                        <div className="row">
                            {filteredContacts.map((contact, index) => {
                                return (
                                    <div className="col-sm-6 mt-3" key={index}>
                                        {contact && <Dummycard contact={contact} deletecontact={deletecontact}/>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default Home;
