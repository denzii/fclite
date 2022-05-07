import { QueryResult, useQuery } from "@apollo/client";
import Repository from "../../repository";
import { Wallet } from "../../repository/types";
import _ from "./keyableFragment";

export const UserWallet: (props: { userId: number, setActiveWalletId: (walletId?:number) => void}) => JSX.Element = (props) => {
    const {error, data, loading}: QueryResult< {getWallet: Wallet}, { Id: number; }> = useQuery(
        Repository.GetWallet(),
        {variables: {Id: props.userId}
    });

    const handleWalletChange = () => {
        // remove id from the url and change the location by appending window history, no need for involving react router as it can be done in two lines and is done purely for cosmetic reasons.
        const newUrl = window.location.protocol + "//" + window.location.host + "/" +  window.location.pathname.split("/")[1];
        window.history.pushState({path:newUrl}, '', newUrl);
        props.setActiveWalletId(undefined);
    }

    const BackButton: () => JSX.Element = () => <button onClick={handleWalletChange}> Go back to the list</button>

    return <>
        { error && <>
            <p>Error: {error.message}</p>
            <BackButton/>
        </> }

        { loading && <p>Fetching wallet for shareholder with the id: {props.userId}</p> }
        
        { data && <>
            <fieldset>
                <legend>
                    <abbr title="A wallet is the summary of all data pertaining to a shareholder!">
                        {data.getWallet.shareholder.name}'s Wallet: 
                    </abbr>
                </legend>
                <strong><u>Shareholder Id: {data.getWallet.id}</u></strong>
                <p>Address: {data.getWallet.shareholder.address}</p>
                <p>IBAN: {data.getWallet.shareholder.iban}</p>
                <br/>                
                <h4>
                    <legend>
                        <abbr title="Each transfer belonging to the shareholder movie are listed.">
                         Transfers for their movie {`${ data.getWallet.movie.title } (id:  ${data.getWallet.movie.id})`} 
                        </abbr>
                    </legend>
                </h4>
                   
                {data.getWallet.movie.transactions && data.getWallet.movie.transactions.length > 0 && <>
                    <ol>
                        { data.getWallet.movie.transactions.map((transaction) =><_ key={transaction!.id}>
                            <li key={transaction!.id}>
                                <p>transaction id: {transaction!.id}</p>
                                <p>Amount: {transaction!.amount}</p>
                                <p>Description: {transaction!.description}</p>
                            </li>
                            <br/>
                        </_>) }
                    </ol>
                </>}
            </fieldset>
            <BackButton/>
        </> }
    </>
}