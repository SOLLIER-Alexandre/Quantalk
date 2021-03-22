import './OutlinedCard.scss';
import React from 'react';

/**
 * Props for the OutlinedCard component
 */
interface OutlinedCardProps {
    /**
     * Children of the card
     */
    children?: React.ReactNode,

    /**
     * Class name to pass to the div
     */
    className?: string
}

/**
 * A card that is outlined
 * @constructor
 */
const OutlinedCard: React.FunctionComponent<OutlinedCardProps> = (props: OutlinedCardProps) => {
    // Get the complete class name
    let className: string = 'outlined-card';
    if (props.className)
        className += ' ' + props.className;

    return (
        <div className={className}>
            {props.children}
        </div>
    );
};

export default OutlinedCard;
