import React from "react"
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button"

interface SidebarLisItemProps {
    id: string;
    title: string;
}

const ConversationListItem: React.FC<SidebarLisItemProps> = ({ id, title }) => {
    const navigate = useNavigate();

    return (
        <Button
            text={title}
            color="#27374D"
            backgroundcolor="#DDE6ED"
            onClick={() => navigate(`/conversation/${id}`)}
        />
    );
}

export default ConversationListItem;