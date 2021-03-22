import React from 'react';
import './TextInput.scss';

/**
 * Props for the TextInput component
 */
interface TextInputProps {
    /**
     * Title of text above the text input
     */
    title: string,

    /**
     * Type of the text input
     */
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'],

    /**
     * Autocomplete type of the text input
     */
    autoComplete?: React.InputHTMLAttributes<HTMLInputElement>['autoComplete'],

    /**
     * Current value of the text input
     */
    value?: string,

    /**
     * Callback called when the text input value changed
     * @param value New text input value
     */
    onValueChange?: (value: string) => void,

    /**
     * This field has an error in its value that must be shown
     */
    error?: boolean,

    /**
     * Text of the error hint below the text input
     */
    errorText?: string,

    /**
     * Class name for the text input container
     */
    className?: string,
}

/**
 * Text input component including a title text and error message
 *
 * @param props Props passed to the component
 * @constructor
 */
const TextInput: React.FunctionComponent<TextInputProps> = (props: TextInputProps) => {
    // Get the div class name
    let divClassName = 'text-input-container';
    if (props.className)
        divClassName += ' ' + props.className;

    // Get the input class name
    let inputClassName = 'text-input';
    if (props.error)
        inputClassName += ' text-input-error';

    return (
        <div className={divClassName}>
            <p>{props.title}</p>
            <input type={props.type} autoComplete={props.autoComplete} className={inputClassName}
                   value={props.value}
                   onChange={(e) => {
                       props.onValueChange?.(e.target.value);
                   }}
            />
            {props.error ?
                <p className={'error-hint'}>{props.errorText}</p> :
                null}
        </div>
    );
};

export default TextInput;
