import { useEffect, useState } from "react";
import { TabEnum } from "../tabEnum";
import _ from "./keyableFragment";
import { StyledTabContainer } from "./style/tabContainer.style";
import { BrowserRouter as Router, Outlet, Routes, Route, Link, useRoutes, RouteObject} from "react-router-dom";

 const TabContainer: (props: {className:string}) => JSX.Element = (props) => {  
    const [activeTab, setActiveTab] = useState(TabEnum.Default);
    const handleTabChange = (tab: TabEnum) => {
        setActiveTab(tab);
    };
    
    useEffect(() => {
        if (window.location.pathname !== "/") {
            // imperatively set the selected button if a path such as /admin or /wallet is given.
            const tab : TabEnum = window.location.pathname.split("/")[1] as TabEnum;
            handleTabChange(tab);
        } else{
            handleTabChange(TabEnum.Default);
        }
    },[]);

    return <>
        <StyledTabContainer className={props.className}>
            <ul className="tab-container__nav">
                <Link to={"admin"} className={activeTab === TabEnum.Admin ? "active" : ""} onClick={handleTabChange.bind(null, TabEnum.Admin)} >Admin</Link>
                <Link to={"wallet"} className={activeTab === TabEnum.Wallet ? "active" : ""} onClick={handleTabChange.bind(null, TabEnum.Wallet)}>Wallet</Link> 
            </ul>
            <Outlet/>
            
        </StyledTabContainer>
    </>
};

export default TabContainer;
