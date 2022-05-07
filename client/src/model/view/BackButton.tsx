import { ReactChild } from "../ReactChild"

const BackButton: (props: {children: ReactChild, callback: () => void}) => JSX.Element = 
(props) => <button onClick={props.callback}>{props.children}</button>

export default BackButton