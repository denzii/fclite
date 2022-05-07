import { useMutation } from "@apollo/client";
import { useState } from "react";
import Repository from "../../../repository";
import { CreateMovieResult, MovieInput } from "../../../repository/types";
import { AddMovieFormState } from "../../formState";
import BackButton from "../BackButton";
import { StyledAddMovieForm } from "../style/addMovieForm.style";
import FormResults from "./FormResults";

export const AddMovieForm = (props: {className: string}) => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [formData, setFormData] = useState<AddMovieFormState>( {
            movieId: "",
            movieName: "" 
        }
    );
    const [createMovie, {data, loading, error}]: CreateMovieResult = useMutation(
        Repository.CreateMovie(), {
            variables: {
                 input: {
                    id: Number(formData.movieId),
                    title: formData.movieName
                } as MovieInput
            }
        }
    );

    /*** @TODO factor these duplications out to the MainForm if any time left in the end */
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsSubmitted(x => !x);
        createMovie();
    };
    const resultsCallback = () => setIsSubmitted(x => !x);
    const submitCallback = (e: React.FormEvent<HTMLFormElement>) => {handleSubmit.apply(undefined, [e])}
    const inputCallback = (e: React.ChangeEvent<HTMLInputElement>)=> {handleInput.apply(undefined, [e])} 

        /*** @TODO:  find a way around the data:any type  if any time left  */
    const ShareHolderDataView: (props: {data: any}) => JSX.Element = (props) => {
        return <>
            <h4><u>Movie(id:{props.data.createMovie.id}) Details:</u></h4>
            <p>Title: {props.data.createMovie.title}</p>
        </>
    }
    return isSubmitted 
        ? <FormResults backButton={ () => <BackButton children={"Go back to the form"} callback={ resultsCallback }/> } 
                       dataView={ShareHolderDataView} error={error} loading={loading}
                       dataViewModel={data}
                       loadingMessage={"Requested operation had been executed! Sit tight..."}
                       dataMessage={"The given element had been created!"}
          />
        : <StyledAddMovieForm className={ props.className } onSubmit={ submitCallback }>
            <fieldset>
                <legend>
                    <abbr title="CRUD operation for saving a new movie into the Database!">
                        New Movie: 
                    </abbr>
                </legend>

                <label htmlFor="movie-id">
                    <abbr title="Included in the form because ID was specified in the 'frontend' part of the task description. This field is mandatory, minimum legal value is 0 and strings are not accepted" aria-label="required">*</abbr> Movie ID:
                </label>
                <input type="text" id="movie-id" pattern="\b\d{1,10}\b" 
                    required
                    name="movieId"
                    value={ formData.movieId } 
                    onChange={ inputCallback }
                />

                <label htmlFor="movie-name">
                    <abbr title="This field is mandatory, only letters, numbers,  whitespace and hyphens are allowed" aria-label="required">*</abbr> Movie Name:
                </label>
                <input type="text" id="movie-name" pattern="(^[^\[]+)(\d?)" 
                    required
                    name="movieName"
                    value={ formData.movieName }
                    onChange={ inputCallback }
                />
                
                <button className="transaction-submit">Submit new movie!</button>
            </fieldset>
        </StyledAddMovieForm>
}