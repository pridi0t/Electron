import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { DialogueInfo } from "../../types/tApi";
import DialogueItem from "./DialogueItem";

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ConversationDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [dialogues, setDialogues] = useState<DialogueInfo[]>([]);

    if (!id) {
        return (<p>대화가 존재하지 않습니다.</p>)
    }

    useEffect(() => {
        const fetchData = async () => {
            const list = await window.api.loadDialogue(Number.parseInt(id));
            setDialogues(list);
        };

        fetchData();
    }, [id]);

    return (
        <ItemWrapper>
            {
                dialogues.map(({id, speaker, content}) => (
                    <DialogueItem
                        key={id}
                        speaker={speaker}
                        content={content}
                    />
                ))
            }
        </ItemWrapper>
    );
};

export default ConversationDetail;
