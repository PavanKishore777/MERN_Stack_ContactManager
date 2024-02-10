import React, {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import Heading from "./Heading";
import "./styles/floating.css"
import Loading from "../Loading/Loading";
import Errormessage from "../Error/Errormessage";
import * as contactActions from "../redux/contacts/contacts.action";
import * as contactReducer from "../redux/contacts/contacts.slice";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../redux/store";
import {IContactView} from "../model/IContactView";


const Editcontact: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
        return store[contactReducer.contactFeature]
    })
    const {loading, contact: contactRedux, errorMessage, groups} = contactState;
    const {contactId} = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        if (contactId) {
            dispatch(contactActions.getcontactaction({contactId: contactId}))
        }
    }, [contactId]);

    /**
     * if change in contact redux,populate data
     * @param event
     */
    useEffect(() => {
        if (contactRedux && Object.keys(contactRedux).length > 0) {
            setcontact({
                ...contact,
                name: contactRedux.name ? contactRedux.name : "",
                company: contactRedux.company ? contactRedux.company : "",
                email: contactRedux.email ? contactRedux.email : "",
                title: contactRedux.title ? contactRedux.title : "",
                mobile: contactRedux.mobile ? contactRedux.mobile : "",
                imageUrl: contactRedux.imageUrl ? contactRedux.imageUrl : "",
                groupId: contactRedux.groupId ? contactRedux.groupId : "",
            })
        }
    }, [contactRedux])


    const handlesubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(contactActions.updatecontactaction({contact: contact, contactId: contactId})).then((response: any) => {
            if (!response.error) {
                navigate("/home");
            }
        })
    };

    const handleMobileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9]*$/;
        if (!regex.test(event.target.value)) {
            // If the input is not numeric, prevent the change
            event.preventDefault();
        } else {
            // Update the contact state with the new value
            setcontact({
                ...contact,
                mobile: event.target.value
            });
        }
    };

    const updateinput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setcontact({
            ...contact,
            [event.target.name]: event.target.value
        })
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setcontact({
                    ...contact,
                    imageUrl: reader.result as string
                });
            };
            reader.readAsDataURL(file);
        } else {
            // Handle the case where the file input is cleared
            setcontact({
                ...contact,
                imageUrl: "" // Set imageurl to an empty string
            });
        }
    };
    // const getImageName = (imageUrl: string): string => {
    //     // Split the URL by '/'
    //     const urlParts = imageUrl.split('/');
    //     // Get the last part of the URL, which is the image file name
    //     const imageName = urlParts[urlParts.length - 1];
    //     return imageName;
    // };


    return (
        <>
            {loading && <Loading/>}
            <Heading Headingone="Edit " Headingtwo="Contact" color="text-warning" colortwo="text-black"/>
            {!loading && Object.keys(errorMessage).length > 0 && <Errormessage message={errorMessage}/>}
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col"></div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-sm-3">
                            {
                                contact && contact.imageUrl &&
                                <img src={contact.imageUrl} alt=""
                                     className="img-fluid rounded-circle shadow-lg bg-white imagefixes"/>
                            }
                        </div>
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
                                {/*
                                THIS CODE IS FOR LOCAL UPLOAD OF IMAGE BUT THROUGH MONGO IT TAKES ONLY UPT SOME LIMIT SO INSTEAD FOR THE
                                BETTER DEPLOYMENT AND PRODUCTIVITY I MADE A IMAGE ONLINE URL IT IS ALSO WORKS SAME
                                <div className="mb-2">*/}
                                {/*    <input*/}
                                {/*        type="file"*/}
                                {/*        accept="image/*"*/}
                                {/*        onChange={(e) => {*/}
                                {/*            updateinput(e);*/}
                                {/*            handleImageUpload(e);*/}
                                {/*        }}*/}
                                {/*        id="image-input"*/}
                                {/*        className="form-control"*/}
                                {/*    />*/}
                                {/*    /!*<p>Image Selected: {getImageName(contact.imageurl)}</p>*!/*/}
                                {/*</div>*/}
                                <div className="mb-2">
                                    <input
                                        name={`mobile`}
                                        value={contact.mobile}
                                        onChange={e => handleMobileChange(e)}
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
                                    placeholder="select category">
                                    <option value=""> select category</option>
                                    {
                                        groups && groups.length > 0 &&
                                        groups.map((group, index) => {
                                            return (
                                                <option key={index} value={group._id}>{group.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <div className="mb-2 mt-3">
                                    <input type="submit" className="btn btn-primary mx-1" value="Update"/>
                                    <Link to="/home" className="btn btn-danger float-end">
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Editcontact;
