import React from "react";
import { styled } from "styled-components";

interface DialogueBoxProps {
    speaker: string;
}

const SystemFont = styled.div`
    position: relative;
    align-items: flex-start;
    padding: 10px;

    & > p {
        color: #27374D;
        font-weight: bold;
    }
`;

const DialogueBox = styled.div<DialogueBoxProps>`
    position: relative;
    align-self: ${ props => props.speaker === "user" ? "flex-end" : "flex-start"};
    margin: 15px 0px;
    padding: 10px 15px;
    max-width: 80%;
    border-radius: 10px;
    background-color: #DDE6ED;
`;

interface DiaLogueItemProps {
    speaker: string;
    content: string;
}

const DialogueItem: React.FC<DiaLogueItemProps> = ({speaker, content}) => {
    if (speaker === "tool") {
        return <SystemFont><p>{content}</p></SystemFont>;
    }
    return (
        <DialogueBox speaker={speaker}>
            {content}
        </DialogueBox>
    );
}

export default DialogueItem;