import { ReactChild } from "../ReactChild";

const TabContent = (props:{className: string, tabHeader: string, children: ReactChild}) => {
    return (
      <div className={`${props.className}`}>
            <>
                <p>{props.tabHeader}</p>
                {props.children}
            </>
      </div>
    );
  };


  export default TabContent;