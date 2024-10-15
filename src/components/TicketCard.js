import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/TicketCard.css';

const TicketCard = ({ ticket, users = [] }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const user = users.find(user => users.id === ticket.userId);

    const MAX_LENGTH = 100; 
    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    const shouldShowReadMore = ticket.title.length > MAX_LENGTH;

    return (
        <div className="ticket-card">
            <span > {ticket.id}</span>
            <div className="ticket-header">

                <div className="ticket-title">
                    
                    <p>
                        {isExpanded || !shouldShowReadMore
                            ? ticket.title
                            : (
                                <span>
                                    {ticket.title.substring(0, MAX_LENGTH)}
                                    <span className="ellipsis">...</span>
                                    <span className="read-more" onClick={toggleText}>
                                        Read More
                                    </span>
                                </span>
                            )
                        }

                        {isExpanded && (
                            <span className="read-more" onClick={toggleText}>
                                Show Less
                            </span>
                        )}
                    </p>
                </div>
            </div>
            {ticket.tag && ticket.tag.length > 0 && (
                <div className="ticket-tags">
                    {ticket.tag.map((t, index) => (
                        <span key={index} className="ticket-tag">
                            {t}
                        </span>
                    ))}
                </div>
            )}
            <div className="ticket-meta">
                <span>UserID :  {ticket.userId}</span>
                <span>Status : {ticket.status}</span>
            </div>
        </div>
    );
};

TicketCard.propTypes = {
    ticket: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        tag: PropTypes.arrayOf(PropTypes.string),
        userId: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        priority: PropTypes.number.isRequired,
    }).isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            available: PropTypes.bool.isRequired,
        })
    ),
};

export default TicketCard;

