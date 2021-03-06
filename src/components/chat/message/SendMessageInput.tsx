import React, {ChangeEvent, useRef, useState} from 'react';
import './SendMessageInput.scss';

/**
 * Props for the SendMessageInput component
 */
interface SendMessageInputProps {
    /**
     * Callback called when the user wants to send a message
     *
     * @param message Message contents
     */
    onSend?: (message: string) => void,

    /**
     * Show the error text because the message could not be sent
     */
    error?: boolean,
}

/**
 * Input for the user to send a message
 *
 * @param props Component props
 * @constructor
 */
const SendMessageInput: React.FunctionComponent<SendMessageInputProps> = (props: SendMessageInputProps) => {
    // Component state and ref
    const [sendButtonEnabled, setSendButtonEnabled] = useState<boolean>(false);
    const textInputRef = useRef<HTMLInputElement | null>(null);

    // Send button class name
    let buttonClassName: string = 'material-icons button-like';
    if (sendButtonEnabled)
        buttonClassName += ' enabled';

    const sendMessage = () => {
        if (textInputRef.current !== null && textInputRef.current?.value.trim().length > 0) {
            props.onSend?.(textInputRef.current.value);

            textInputRef.current.value = '';
            setSendButtonEnabled(false);
        }
    };

    // Set the add button enabled depending on the text inside the input
    const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSendButtonEnabled(e.target.value.trim() !== '');
    };

    // Send the message when the button is clicked
    const onSendButtonClick = () => {
        if (sendButtonEnabled) {
            sendMessage();
        }
    };

    // Send the message when the enter key is pressed
    const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className={'send-message-input'}>
            {props.error ?
                <p className={'error-hint'}>Votre message n'a pas pu être envoyé</p> :
                null}

            <div className={'input-container'}>
                <input type={'text'} placeholder={'Envoyer un message...'} onChange={onInputValueChange}
                       ref={(ref) => textInputRef.current = ref} onKeyDown={onInputKeyDown}/>

                <span className={buttonClassName} onClick={onSendButtonClick}>send</span>
            </div>
        </div>
    );
};

export default SendMessageInput;
