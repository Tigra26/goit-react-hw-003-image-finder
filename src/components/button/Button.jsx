import { ButtonLoad } from './Button.module';


export const Button = ({onClick}) => {
    return (
        <ButtonLoad type='button' onClick={onClick}>
            Load more...
        </ButtonLoad>
    );
}; 
    

export default Button;