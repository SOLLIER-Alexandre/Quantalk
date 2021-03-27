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

    // Set the add button enabled depending on the text inside the input
    const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSendButtonEnabled(e.target.value.trim() !== '');
    };

    // Call the callback in the props when the send button is clicked and enabled
    const onSendButtonClick = () => {
        if (sendButtonEnabled && textInputRef.current !== null) {
            props.onSend?.(textInputRef.current.value);

            textInputRef.current.value = '';
            setSendButtonEnabled(false);
        }
    };

    return (
        <div className={'send-message-input'}>
            <input type={'text'} placeholder={'Envoyer un message...'} onChange={onInputValueChange}
                   ref={(ref) => textInputRef.current = ref}/>

            <span className={buttonClassName} onClick={onSendButtonClick}>send</span>
        </div>
    );
};

export default SendMessageInput;
