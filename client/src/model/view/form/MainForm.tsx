import { useRef, useState } from "react";
import { FormEnum } from "../../formEnum";
import { StyledMainForm } from "../style/mainForm.style";
import { AddMovieForm } from "./AddMovieForm";
import { AddShareholderForm } from "./AddShareholderForm";
import { AddTransactionForm } from "./AddTransactionForm";

const MainForm = (props: {className: string}) => {
    const actionType = useRef(null);

    const [activeForm, setActiveForm] = useState<FormEnum>(FormEnum.AddMovie);
    const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setActiveForm(e.target.value as FormEnum);
    }

    return <>
        <StyledMainForm className={props.className}>
            <label htmlFor="actions-list">Desired action:</label>
            <br/>
            <select ref={ actionType } onChange={handleFormChange} name="actions-list" id="actions-list">
                <option value="add-movie">Add a movie</option>
                <option value="add-shareholder">Add a shareholder</option>
                <option value="add-transaction">Add a transaction</option>
            </select>
            <br/>
            <br/>
            { activeForm === FormEnum.AddMovie && <AddMovieForm className={props.className}/> }
            { activeForm === FormEnum.AddShareholder && <AddShareholderForm className={props.className}/> }
            { activeForm === FormEnum.AddTransaction && <AddTransactionForm className={props.className}/> }
        </StyledMainForm>
    </>
}

export default MainForm;