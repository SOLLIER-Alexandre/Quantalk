import React, {useRef, useState} from 'react';
import './LoginBox.scss';
import TextInput from '../utils/TextInput';

/**
 * Interface for the LoginBox component props
 */
interface LoginBoxProps {
    /**
     * Callback called when the user clicked the register button
     */
    onRegisterButtonClick?: () => void,

    /**
     * Callback called when the user clicked the login button
     */
    onLoginButtonClick?: (username: string, password: string) => void,

    /**
     * Error text to show above the buttons
     */
    error?: string,
}

/**
 * Form where the user can enter their login credentials
 * @constructor
 */
const LoginBox: React.FunctionComponent<LoginBoxProps> = (props: LoginBoxProps) => {
    // Form state
    const username = useRef<string>('');
    const password = useRef<string>('');

    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    // Callback called when the login button was clicked
    const onLoginButtonClick = () => {
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

        // Don't continue if there's an errored field
        if (error) return;

        // Hide the error hints
        setUsernameError(false);
        setPasswordError(false);

        props.onLoginButtonClick?.(username.current, password.current);
    };

    return (
        <div className={'login-box'}>
            <TextInput title={'Nom d\'utilisateur'} onValueChange={value => username.current = value}
                       type={'username'} autoComplete={'username'}
                       error={usernameError} errorText={'Le nom d\'utilisateur ne peut être vide'}/>

            <TextInput title={'Mot de passe'} onValueChange={value => password.current = value}
                       type={'password'} autoComplete={'password'} className={'m-top'}
                       error={passwordError} errorText={'Le mot de passe ne peut être vide'}/>

            {props.error !== undefined ?
                <p className={'m-top error-message'}>{props.error}</p> :
                null}

            <div className={'button-container'}>
                <button className={'outlined-button'} onClick={props.onRegisterButtonClick}>S'enregistrer</button>
                <button className={'filled-button'} onClick={onLoginButtonClick}>Connexion</button>
            </div>
        </div>
    );
};

export default LoginBox;
