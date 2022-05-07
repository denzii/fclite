import { ApolloError } from "@apollo/client";
import { Type } from "typescript";

type ResultsViewProps = {
    error:ApolloError | undefined,
    loading: boolean,
    dataView: (props:{data:any})=>JSX.Element,
    dataViewModel:any,
    loadingMessage: string, 
    dataMessage: string, 
    backButton: () => JSX.Element
}

const FormResults: (props:ResultsViewProps) => JSX.Element = (props) => <>
{ props.error && <>
    <p>Error: {props.error.message}</p>
    <props.backButton/>
</> }

{ props.loading && <p>{props.loadingMessage}</p> }

{ props.dataViewModel && <>
    <p>{props.dataMessage}</p>
    <props.dataView data={props.dataViewModel}/>
    <props.backButton/>
</> }
</>


export default FormResults;