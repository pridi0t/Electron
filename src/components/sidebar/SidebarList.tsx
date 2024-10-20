import React, { useEffect, useState } from "react";
import SidebarListItem from "./SidebarListItem";
import { ConversationTitleButtonInfo } from "../../types/tApi";

const SidebarList: React.FC = () => {
    // const list: { id: number, title: string }[] = [
    //     { id: 1, title: "title 1" },
    //     { id: 2, title: "title 2" },
    //     { id: 3, title: "title 2title 2title 2title 2title 2title 2title 2title 2title 2title 2title 2title 2title 2title 2title 2" }
    // ];

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
        <div>
            {
                convList.map(({id, title}) => {
                    return <SidebarListItem key={id} id={id} title={title}/>;
                })
            }
        </div>
    );
}

export default SidebarList