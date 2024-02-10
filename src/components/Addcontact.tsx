import React, {useEffect, useState} from "react";
import Heading from "./Heading";
import "./styles/floating.css";
import {Link} from "react-router-dom";
import Loading from "../Loading/Loading";
import {useNavigate} from "react-router-dom";
import Errormessage from "../Error/Errormessage";
import * as contactActions from "../redux/contacts/contacts.action";
import * as contactReducer from "../redux/contacts/contacts.slice";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../redux/store";
import {IContactView} from "../model/IContactView";


const Addcontact: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const navigate = useNavigate();
    const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
        return store[contactReducer.contactFeature]
    })

    const {loading, groups, errorMessage} = contactState
    const [contact, setcontact] = useState<IContactView>({
        name: "",
        company: "",
        email: "",
        title: "",
        mobile: "",
        imageUrl: "",
        groupId: ""
    });


    useEffect(() => {
        dispatch(contactActions.getallgroupaction());
    }, []);

    const updateinput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setcontact({
            ...contact,
            [event.target.name]: event.target.value
        })
    }

    const handlesubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(contactActions.createcontactaction({contact: contact})).then((response: any) => {
            if (!response.error) {
                navigate("/home")
            }
        })
    }
    const handleMobileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        // Use a regular expression to allow only numeric characters
        const numericValue = inputValue.replace(/[^0-9]/g, "");
        // Update the contact object with the cleaned numeric value for mobile
        setcontact({
            ...contact,
            mobile: numericValue
        });
    };
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file) {
            // Assuming you're using FileReader to read the file as data URL
            const reader = new FileReader();
            reader.onload = () => {
                setcontact({
                    ...contact,
                    imageUrl: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            {loading && <Loading/>}

            <Heading Headingone="Add" Headingtwo="Contact" color="text-warning" colortwo="text-black"/>
            {
                !loading && Object.keys(errorMessage).length > 0 && <Errormessage message={errorMessage.message} />

            }
            <section className="mt-3 addcontactaddclass">
                <div className="container">
                    <div className="row">
                        <div className="col">

                        </div>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <div className="col-sm-4">
                            <form className="add-contact-form" onSubmit={e => handlesubmit(e)}>
                                <div className="mb-2">
                                    <input
                                        name={`name`}
                                        value={contact.name}
                                        onChange={e => updateinput(e)}
                                        required={true} type="text" id="name-input" placeholder="Enter Name"
                                        className="form-control"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name={`imageUrl`}
                                        value={contact.imageUrl}
                                        onChange={e => updateinput(e)}
                                        required={true} type="text" id="image-input" placeholder="imageurl"
                                        className="form-control"/>
                                </div>

                                {/*  THIS CODE IS FOR LOCAL UPLOAD OF IMAGE BUT THROUGH MONGO IT TAKES ONLY UPT SOME LIMIT SO INSTEAD FOR THE
                                BETTER DEPLOYMENT AND PRODUCTIVITY I MADE A IMAGE ONLINE URL IT IS ALSO WORKS SAME

                                <div className="mb-2">*/}
                                {/*    <input*/}
                                {/*        type="file"*/}
                                {/*        accept="image/*"*/}
                                {/*        onChange={(e) => {*/}
                                {/*            updateinput(e);*/}
                                {/*            handleImageUpload(e);*/}

                                {/*        }}*/}
                                {/*        required={true}*/}
                                {/*        placeholder="upload image"*/}
                                {/*        id="image-input"*/}
                                {/*        className="form-control"*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <div className="mb-2">
                                    <input
                                        name={`mobile`}
                                        value={contact.mobile}
                                        onChange={(e) => {
                                            updateinput(e);
                                            handleMobileChange(e);
                                        }}
                                        required={true}
                                        type="text"
                                        id="mobile-input"
                                        placeholder="Mobile"
                                        className="form-control"
                                        inputMode="numeric"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name={`email`}
                                        value={contact.email}
                                        onChange={e => updateinput(e)}
                                        required={true} type="email" id="email-input" placeholder="Email"
                                        className="form-control"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name={`company`}
                                        value={contact.company}
                                        onChange={e => updateinput(e)}
                                        required={true} type="text" id="company-input" placeholder="Company Name"
                                        className="form-control"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        name={`title`}
                                        value={contact.title}
                                        onChange={e => updateinput(e)}
                                        required={true} type="text" id="title-input" placeholder="Title"
                                        className="form-control"/>
                                </div>
                                <select

                                    name={`groupId`}
                                    value={contact.groupId}
                                    onChange={e => updateinput(e)}
                                    required={true} className="form-control" id="group-select-input"
                                    placeholder="select categoery">
                                    <option value=""> select categoery</option>
                                    {
                                        groups.map((group, index) => {
                                            return (
                                                <option key={index} value={group._id}>{group.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <div className="mb-2 mt-3">
                                    <input type="submit" className="btn btn-success mx-1" value="Create"/>
                                    <Link to="/home" className="btn btn-danger float-end">
                                        Cancel
                                    </Link>


                                </div>

                            </form>
                        </div>
                        <div className="col-sm-3">
                            {
                                contact && contact.imageUrl &&
                                <img
                                    className="img-fluid rounded-circle shadow-lg bg-white align-content-end imagefixes"
                                    src={contact.imageUrl}
                                    alt=""/>
                            }
                        </div>
                    </div>
                </div>
            </section>

        </>
    )


}

export default Addcontact;