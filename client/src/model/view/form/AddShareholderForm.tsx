import { useMutation } from "@apollo/client";
import { useState } from "react";
import Repository from "../../../repository";
import { CreateShareholderResult } from "../../../repository/types";
import { AddShareHolderFormState } from "../../formState";
import BackButton from "../BackButton";
import { StyledAddShareholderForm } from "../style/addShareholderForm.styles"
import FormResults from "./FormResults";

export const AddShareholderForm = (props: {className: string}) => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [formData, setFormData] = useState<AddShareHolderFormState>(
        { shareholderId: "", shareholderName: "", shareholderAddress: "", shareholderIban: "", shareholderMovieId: "" }
    );

    const [createShareholder, {data, loading, error}]: CreateShareholderResult = useMutation(
        Repository.CreateShareholder(), {
            variables: {
                input:{
                    id: Number(formData.shareholderId),
                    movieId: Number(formData.shareholderMovieId),
                    name: formData.shareholderName,
                    address: formData.shareholderAddress,
                    iban: formData.shareholderIban,
                } 
            }
        }
    );
    
    /*** @TODO factor these duplications out to the MainForm if any time left in the end */
    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitted(x => !x);
        createShareholder();
    };
    const resultsCallback = () => setIsSubmitted(x => !x)
    const submitCallback = (e: React.FormEvent<HTMLFormElement>) => {handleSubmit.apply(undefined, [e])}
    const inputCallback = (e: React.ChangeEvent<HTMLInputElement>)=> {handleInput.apply(undefined, [e])}
   
        /*** @TODO:  find a way around the data:any type  if any time left  */
    const ShareHolderDataView: (props:{data:any}) => JSX.Element = (props) => {
        return <>
            <h4><u>Shareholder(id:{props.data.id}) Details:</u></h4>
            <p>Name: {props.data.createShareholder.name}</p>
            <p>Address: {props.data.createShareholder.address}</p>
            <p>Balance: {props.data.createShareholder.balance}</p>
            <p>Iban: {props.data.createShareholder.iban}</p>
        </>
    }

    return isSubmitted 
        ?  <FormResults backButton={ () => <BackButton children={"Go back to the form"} callback={resultsCallback}/> }
                        dataView={ShareHolderDataView} error={error} loading={loading}
                        dataViewModel={data}
                        loadingMessage={"Requested operation had been executed! Sit tight..."}
                        dataMessage={"The given element had been created!"}
            />
        :   <StyledAddShareholderForm className={ props.className } onSubmit={ submitCallback }>
                <fieldset>
                    <legend>
                        <abbr title="CRUD operation for saving a new shareholder into the Database!">
                            New Shareholder: 
                        </abbr>
                    </legend>

                    <label htmlFor="shareholder-id">
                        <abbr title="Included in the form because ID was specified in the 'frontend' part of the task description. This field is mandatory, minimum legal value is 0 and strings are not accepted" aria-label="required">*</abbr> Shareholder ID:
                    </label>

                    <input type="text" id="shareholder-id" pattern="\b\d{1,10}\b"
                        required
                        name="shareholderId"
                        value={ formData.shareholderId } 
                        onChange={ inputCallback }
                    />

                    <label htmlFor="shareholder-name">
                        <abbr title="This field is mandatory, only words separated by single space allowed" aria-label="required">*</abbr> Shareholder Fullname:
                    </label>
                    <input type="text" id="shareholder-name" pattern="^[a-zA-Z].*[\s\.]*$"
                        required
                        name="shareholderName"
                        value={ formData.shareholderName } 
                        onChange={ inputCallback }
                    />

                    <label htmlFor="shareholder-address">
                        <abbr title="This field is mandatory. Minimum three words, first word must be numeric." aria-label="required">*</abbr> Shareholder Address:
                    </label>
                    <input type="text" id="shareholder-address"  pattern="\w+(\s\w+){2,}"
                        required
                        name="shareholderAddress"
                        value={ formData.shareholderAddress } 
                        onChange={ inputCallback }
                    />   

                    <label htmlFor="shareholder-iban">
                        <abbr title="This field is mandatory, for the sake of this demo, no validation had been added to it" aria-label="required">*</abbr> IBAN:
                    </label>
                    <input type="text" id="shareholder-iban"
                        required
                        name="shareholderIban"
                        value={ formData.shareholderIban } 
                        onChange={ inputCallback }
                    />


                    <label htmlFor="shareholder-movie-id">
                        <abbr title="This field is mandatory, minimum legal value is 0 and strings are not accepted" aria-label="required">*</abbr> Movie ID:
                    </label>

                    <input type="text" id="shareholder-movie-id" pattern="\b\d{1,10}\b"
                        required
                        name="shareholderMovieId"
                        value={ formData.shareholderMovieId } 
                        onChange={ inputCallback }
                    />

                    <button className="transaction-submit">Submit new shareholder!</button>
                </fieldset>
            </StyledAddShareholderForm>
}