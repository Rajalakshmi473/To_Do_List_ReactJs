import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const LineItem = ({item,Handlecheck,Handlecheck2}) => {
    return (
        <li className="item">
            <input
                type="checkbox"
                onChange={() => Handlecheck(item.id)}
                checked={item.checked}
            />
            <label
                style={(item.checked) ? { textDecoration: 'line-through' } : null}
                onDoubleClick={() => Handlecheck(item.id)}
            >{item.item}</label>
            <FaTrashAlt
                onClick={() => Handlecheck2(item.id)}
                role="button"
                tabIndex="0"
                aria-label={`Delete ${item.item}`}
            />
        </li>
    )
}

export default LineItem