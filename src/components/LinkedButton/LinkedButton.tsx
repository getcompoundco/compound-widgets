import { Button } from "../button";

export interface LinkedButtonProps {
    productId : string;
    label?:string;
    meta?: Record<string,string>;
}

export const LinkedButton = (props:LinkedButtonProps) => {
    console.log(props);
    const handleOnClick = (event:React.MouseEvent<HTMLElement>) => {
        const url = `https://getcompound.co/sign-up?productId=${props.productId}`;
        window?.open(url, '_blank')?.focus();
    }
    
    return (<Button data-testid="compound-button" variant="default" size="lg" onClick={handleOnClick}>{props.label?? ''}</Button>)
}