import React from "react"
import Button from "../ui/Button"

interface SidebarLisItemProps {
    id: string;
    title: string;
}

const ContextListItem: React.FC<SidebarLisItemProps> = ({ id, title }) => {
    return (
        <Button
            text={title}
            color="#27374D"
            backgroundcolor="#DDE6ED"
            onClick={() => console.log(`id : ${id}`)}
        />
    );
}

export default ContextListItem;