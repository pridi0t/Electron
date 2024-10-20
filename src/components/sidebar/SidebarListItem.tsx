import React from "react"

import Button from "../ui/Button"

interface SidebarLisItemProps {
    id: string;
    title: string;
}

const SidebarListItem: React.FC<SidebarLisItemProps> = ({ id, title }) => {
    return (
        <Button
            text={title}
            onClick={() => console.log(`id : ${id}`)}
            backgroundcolor="#DDE6ED"
            color="#27374D"
        />
    );
}

export default SidebarListItem;