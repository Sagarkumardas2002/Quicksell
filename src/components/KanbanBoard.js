import React, { useEffect, useState } from 'react';
import '../styles/KanbanBoard.css';
import DisplayOptions from './DisplayOptions';
import TicketCard from './TicketCard';
import { fetchTickets } from '../utils/api';

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [grouping, setGrouping] = useState(() => localStorage.getItem('grouping') || 'status'); // Load from localStorage
    const [sorting, setSorting] = useState(() => localStorage.getItem('sorting') || 'priority'); // Load from localStorage

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTickets();
                setTickets(data.tickets);
                setUsers(data.users);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    // Save grouping to localStorage whenever it changes
    const handleGroupingChange = (newGrouping) => {
        setGrouping(newGrouping);
        localStorage.setItem('grouping', newGrouping); // Persist to localStorage
    };

    // Save sorting to localStorage whenever it changes
    const handleSortingChange = (newSorting) => {
        setSorting(newSorting);
        localStorage.setItem('sorting', newSorting); // Persist to localStorage
    };

    const sortedTickets = [...tickets].sort((a, b) => {
        if (sorting === 'priority') {
            return b.priority - a.priority;
        } else {
            return a.title.localeCompare(b.title);
        }
    });

    const groupedTickets = sortedTickets.reduce((acc, ticket) => {
        const groupKey = grouping === 'User' ? ticket.userId : (grouping === 'status' ? ticket.status : ticket.priority);
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(ticket);
        return acc;
    }, {});

    return (
        <div className="kanban-board">
            <DisplayOptions onGroupingChange={handleGroupingChange} onSortingChange={handleSortingChange} />
            <div className="board-columns">
                {Object.entries(groupedTickets).map(([groupKey, tickets]) => {
                    let header = groupKey;
                    if (grouping === 'User') {
                        const user = users.find(user => user.id === groupKey);
                        header = user ? user.name : 'Unknown User';
                    } else if (grouping === 'priority') {
                        header = `Priority ${groupKey}`;
                    } else if (grouping === 'status') {
                        header = ` ${groupKey}`;
                    }

                    const ticketCount = grouping === 'User' ? `(${tickets.length})` : '';
                    return (
                        <div key={groupKey} className="kanban-column">
                            <h2>{header} {ticketCount}</h2>
                            {tickets.map(ticket => (
                                <div key={ticket.id} className="ticket-card-container">
                                    <TicketCard ticket={ticket} />
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default KanbanBoard;
