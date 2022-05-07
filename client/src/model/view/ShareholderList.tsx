import { useEffect, useState } from "react";
// import Shareholder from "../shareholder";
import { StyledShareHolderList } from "./style/shareholderList.style";
import _ from "./keyableFragment";
import { UserWallet } from "./UserWallet";
import { QueryResult, useQuery } from "@apollo/client";
import Repository from "../../repository";
import { Shareholder } from "../../repository/types";

/** @todo Add pagination if any time left in the end */

const ShareholderList = (props: {className: string}) => {
    const [activeWalletId, setActiveWalletId] = useState<number|undefined>(undefined);
    const {error, data, loading}: QueryResult<{getShareholders:Shareholder[] }, { Id: number; }> = useQuery(Repository.GetShareholders());
    
    useEffect(() => {
        // detect when a number is entered in the address bar manuallyto  render wallet component instead of the list
        const pathnameParts = window.location.pathname.split("/");
        const lastElementInUrl = pathnameParts[pathnameParts.length - 1];
        const id = parseInt(lastElementInUrl);
        
        // when id is equal to 0, it isnt truthy?
        if(id || id === 0){
            setActiveWalletId(id);
        }
    }, []);

    const handleUserSelection = (person: Shareholder) => {
        // append the id to the address bar imperatively as its just a cosmetic thing at this point (no need to involve react router and create more complexity)
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "/" + person.id;
        window.history.pushState({path:newUrl}, '' , newUrl);
        
        setActiveWalletId(person.id);
    };
    
    return <>
        {loading && <div>Loading the list of shareholders...</div>}
        {error && <div>Error :(</div>}
        {data && <>
        {activeWalletId == undefined 
            ? <>
                <StyledShareHolderList className={props.className} aria-labelledby='tab-container__shareholders'>
                    <fieldset>
                        <legend>
                        <abbr title="Wallet for a shareholder could be viewed by selecting a person from the list!">
                            Shareholders: 
                            </abbr>
                        </legend>
                        {data.getShareholders.map((person)=> <_ key={person.id}>
                            <button id={`summary-${person.id}`} onClick={handleUserSelection.bind(undefined, person)}>
                                {`${person.id}:  ${person.name}`}
                            </button>
                        </_>)}            
                    </fieldset>
                </StyledShareHolderList>
            </>
            : <UserWallet userId={activeWalletId} setActiveWalletId={setActiveWalletId}/>
        }
        </>}
        
    </>
}

export default ShareholderList;

