import MainForm from "./form/MainForm";
import { TabEnum } from "../tabEnum";
import ShareholderList from "./ShareholderList";
import { RouteObject, useRoutes } from "react-router-dom";
import TabContent from "./TabContent";
import Root from "./Root";

// this contains the react router routes via the useRoutes hook. I prefer this way of doing it over the JSX way because it separates the routing logic from the view logic.
// the App component which you might have been looking for is in src/model/view/Root.tsx

const App = () =>{
	const shareholdersList = <ShareholderList className= {`${TabEnum.Wallet}-tab__list`}/>;
	const routes : RouteObject[] = [
		{
			path: "*",
			element: <Root/>
		},
		{
		  path: '/',
		  element: <Root/>,
		  children: [
			{ path: '/admin', element:  <>
					<TabContent className={`tab-container__${TabEnum.Admin}-tab`} tabHeader={"Add a movie, shareholder or transfer!"}> 
						<MainForm className={`${TabEnum.Admin}-tab__form`}/>
					</TabContent>
				</>
			 },
			{ path: '/wallet', element: (<>
					<TabContent className={`tab-container__${TabEnum.Wallet}-tab`} tabHeader={"Select a shareholder to view their wallet!"}> 
						{shareholdersList}
					</TabContent>
				</>),
			  children: [
				{ path: ':id', element: <>
					<TabContent className={`tab-container__${TabEnum.Wallet}-details`} tabHeader=""> 
						{shareholdersList}
					</TabContent>
				</>
				},
			  ]
			},
		  ],
		},
	  ];
	
	return useRoutes(routes);
}

export default App;