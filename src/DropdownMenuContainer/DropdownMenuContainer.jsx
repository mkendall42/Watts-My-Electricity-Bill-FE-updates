import './DropdownMenuContainer.css'
import { useState } from 'react'

function DropdownMenuContainer({ itemsList, defaultText, processSelection }) {
    //With a little work, this could be a much more generic dropdown menu - useful for all kinds of things
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const selectItem = (item) => {
        //When item selected, set state (so when closed, it shows as text); then toggle the menu closed; then call method to actually process the selection
        setSelectedItem(item)
        processSelection(item)
        toggleMenu()
    }

    const menuItems = itemsList.map((item) => {
        return (
            <li className="dropdown-item" key={item} onClick={() => selectItem(item)}>
                {item}
            </li>
        )
    })

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={() => toggleMenu()}>
                {selectedItem ? selectedItem : defaultText}
            </button>
            {isOpen && (
                <ul className="dropdown-list">
                    {menuItems}
                </ul>
            )}
        </div>
    )
}

export default DropdownMenuContainer