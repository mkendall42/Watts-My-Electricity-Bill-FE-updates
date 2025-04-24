import './DropdownMenuContainer.css'
import { useState } from 'react'
//Any other hooks to bring in?

function DropdownMenuContainer({ itemsList, defaultText, processSelection }) {
    //With a little work, this could be a much more generic dropdown menu - useful for all kinds of things

    //State vars for tracking status of the menu
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const selectItem = (item) => {
        //When item selected, set state (so when closed, it shows as text); then toggle the menu closed; then call method to actually process the selection
        setSelectedItem(item)
        processSelection(item)          //Need to write this code still (in other container(s))!
        toggleMenu()
    }

    const menuItems = itemsList.map((item) => {
        return (
            <li key={item} onClick={() => selectItem(item)}>
                {item}
            </li>
        )
    })

    //Handle highlighting in CSS file eventually!

    return (
        <div>
            <button onClick={() => toggleMenu()}>
                {selectedItem ? selectedItem : defaultText}
            </button>
            {/* Now display the list of items/options */}
            {isOpen && (
                <ul>
                    {menuItems}
                </ul>
            )}
        </div>
    )
}

export default DropdownMenuContainer