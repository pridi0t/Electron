import React, { useEffect, useState } from "react";
import ConversationListItem from "./ConversationListItem";
import { ConversationTitleButtonInfo } from "../../types/tApi";

const ConversationList: React.FC = () => {
    // 대화 목록을 저장할 상태
    const [convList, setConvList] = useState<ConversationTitleButtonInfo[]>([]);

    // 대화 목록 데이터를 가져오는 함수
    const fetchConversations = async() => {
        const list: ConversationTitleButtonInfo[] = await window.api.loadConversationTitleList();
        setConvList(list);
    };

    useEffect(() => {
        fetchConversations();
    }, []);

    return (
        <>
            {
                convList.map(({id, title}) => {
                    return <ConversationListItem key={id} id={id} title={title} />;
                })
            }
        </>
    );
};

export default ConversationList;