import React, {useRef, useState} from 'react';
import TextInput from '../utils/TextInput';
import './RegisterBox.scss';

/**
 * Interface for the RegisterBox component props
 */
interface RegisterBoxProps {
    /**
     * Callback called when the user clicked the login button
     */
    onLoginButtonClick?: () => void,

    /**
     * Callback called when the user clicked the register button
     */
    onRegisterButtonClick?: (username: string, password: string) => void,

    /**
     * Error text to show above the buttons
     */
    error?: string,
}

/**
 * Form where the user can enter their registration credentials
 * @constructor
 */
const RegisterBox: React.FunctionComponent<RegisterBoxProps> = (props: RegisterBoxProps) => {
    // Form state
    const username = useRef<string>('');
    const password = useRef<string>('');
    const passwordConfirmation = useRef<string>('');

    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordConfirmationError, setPasswordConfirmationError] = useState<boolean>(false);
    const [passwordConfirmationErrorMessage, setPasswordConfirmationErrorMessage] = useState<string>('');

    // Callback called when the register button was clicked
    const onRegisterButtonClick = () => {
        let error: boolean = false;

        // Check that the username is not empty
        if (username.current.trim() === '') {
            setUsernameError(true);
            error = true;
        }

        // Check that the password is not empty
        if (password.current.trim() === '') {
            setPasswordError(true);
            error = true;
        }

        // Check that the password confirmation is not empty and that it's matching with the password field
        if (passwordConfirmation.current.trim() === '') {
            setPasswordConfirmationError(true);
            setPasswordConfirmationErrorMessage('La confirmation du mot de passe ne peut être vide');
            error = true;
        } else if (password !== passwordConfirmation) {
            setPasswordConfirmationError(true);
            setPasswordConfirmationErrorMessage('Le mot de passe et sa confirmation ne correspondent pas');
            error = true;
        }

        // Don't continue if there's an errored field
        if (error) return;

        // Hide the error hints
        setUsernameError(false);
        setPasswordError(false);
        setPasswordConfirmationError(false);

        props.onRegisterButtonClick?.(username.current, password.current);
    };

    return (
        <div className={'register-box'}>
            <TextInput title={'Nom d\'utilisateur'} onValueChange={(value => username.current = value)}
                       type={'username'} autoComplete={'username'}
                       error={usernameError} errorText={'Le nom d\'utilisateur ne peut être vide'}/>

            <TextInput title={'Mot de passe'} onValueChange={value => password.current = value}
                       type={'password'} autoComplete={'password'} className={'m-top'}
                       error={passwordError} errorText={'Le mot de passe ne peut être vide'}/>

            <TextInput title={'Confirmation du mot de passe'}
                       onValueChange={value => passwordConfirmation.current = value}
                       type={'password'} autoComplete={'password'} className={'m-top'}
                       error={passwordConfirmationError} errorText={passwordConfirmationErrorMessage}/>

            {props.error !== undefined ?
                <p className={'m-top error-message'}>{props.error}</p> :
                null}

            <div className={'button-container'}>
                <button className={'outlined-button'} onClick={props.onLoginButtonClick}>Connexion</button>
                <button className={'filled-button'} onClick={onRegisterButtonClick}>S'enregistrer</button>
            </div>
        </div>
    );
};

export default RegisterBox;
