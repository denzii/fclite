import { ApolloCache, MutationTuple, useMutation } from "@apollo/client";
import React, { useState } from "react";
import Repository from "../../../repository";
import { CreateTransactionResult, Movie, Transaction } from "../../../repository/types";
import { AddTransactionFormState } from "../../formState";
import Shareholder from "../../shareholder";
import BackButton from "../BackButton";
import { StyledAddTransactionForm } from "../style/addTransactionForm.styles"
import FormResults from "./FormResults";
  
export const AddTransactionForm = (props: {className: string}) => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [formData, setFormData] = useState<AddTransactionFormState>(
        { transactionId: "", movieId: "", amount: "", transactionDescription: "" }
    );

    const [createTransaction, {data, loading, error}]: CreateTransactionResult = useMutation(
        Repository.CreateTransaction(), {
            variables: {
                input: {
                    id: Number(formData.transactionId),
                    movieId: Number(formData.movieId),
                    amount: Number(formData.amount),
                    description: formData.transactionDescription,
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
        createTransaction();
    };
    const resultsCallback = () => setIsSubmitted(x => !x)
    const submitCallback = (e: React.FormEvent<HTMLFormElement>) => {handleSubmit.apply(undefined, [e])}
    const inputCallback =  (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>)=> {handleInput.apply(undefined, [e])}
    
    /*** @TODO:  find a way around the data:any type  if any time left  */
    const TransactionDataView: (props:{data:any}) => JSX.Element = (props) => {
        return <>
            <h4><u>Transaction(id:{props.data.createTransaction.id}) Details:</u></h4>
            <p>Amount: {props.data.createTransaction.amount}</p>
            <p>Description: {props.data.createTransaction.description}</p>
            <p>MovieId: {props.data.createTransaction.movieId}</p>
        </>
    }
    return isSubmitted 
        ? <FormResults backButton={ () => <BackButton children={"Go back to the form"} callback={resultsCallback}/> }
                       dataView={TransactionDataView} error={error} loading={loading}
                       dataViewModel={data}
                       loadingMessage={"Requested operation had been executed! Sit tight..."}
                       dataMessage={"The given element had been created!"}
          />
        :   <StyledAddTransactionForm className={ props.className } onSubmit={ submitCallback }>
                <fieldset>
                    <legend>
                    <abbr title="CRUD operation for saving a new transfer into the Database!">
                            New Transaction: 
                        </abbr>
                    </legend>
                    
                    <label htmlFor="transaction-id">
                        <abbr title="Included in the form because ID was specified in the 'frontend' part of the task description. This field is mandatory, minimum legal value is 0 and strings are not accepted" aria-label="required">*</abbr> Transfer ID:
                    </label>
                    <input type="text" id="transaction-id" pattern="\b\d{1,10}\b" 
                        required
                        name="transactionId"
                        value={ formData.transactionId } 
                        onChange={ inputCallback }
                    />
                                        
                    <label htmlFor="movie-id">
                        <abbr title="Included in the form because ID was specified in the 'frontend' part of the task description. This field is mandatory, minimum legal value is 0 and strings are not accepted" aria-label="required">*</abbr> Movie ID:
                    </label>
                    <input type="text" id="movie-id" pattern="\b\d{1,10}\b" 
                        required
                        name="movieId"
                        value={ formData.movieId } 
                        onChange={ inputCallback }
                    />

                    <label htmlFor="amount">
                        <abbr title="This field is mandatory, minimum legal value is 1 and strings are not accepted" aria-label="required">*</abbr> Amount (€):
                    </label>
                    <input type="text" id="amount" pattern="\b(?![0]\b)\d{1,10}\b"
                        required
                        name="amount"
                        value={ formData.amount } 
                        onChange={ inputCallback }
                    />
                    
                    <label htmlFor="transaction-description">
                        <abbr title="This field is mandatory, max length is 400 chars" aria-label="required">*</abbr> Transfer Notes: 
                    </label>
                    <textarea id="transaction-description" maxLength={400} rows={4} cols={20}
                            required
                            name="transactionDescription"
                            value={ formData.transactionDescription } 
                            onChange={inputCallback }
                    /> 
                    <button className="transaction-submit">Submit new transaction!</button>
                </fieldset>
            </StyledAddTransactionForm>
}