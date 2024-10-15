

import React from 'react';
import '../styles/DisplayOptions.css';
const DisplayOptions = ({ onGroupingChange, onSortingChange }) => {
    const handleGroupingChange = (event) => {
        onGroupingChange(event.target.value);
    };

    const handleSortingChange = (event) => {
        onSortingChange(event.target.value);
    };

    return (
        <div className="display-options">
            <select onChange={handleGroupingChange}>
                <option value="status">Status</option>
                <option value="User">User</option>
                <option value="priority">Priority</option>
            </select>
            <select onChange={handleSortingChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
            </select>
        </div>
    );
};

export default DisplayOptions;
