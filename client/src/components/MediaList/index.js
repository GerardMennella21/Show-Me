import React from 'react';
import { Link } from 'react-router-dom';
import { MediaItem } from '../MediaItem/index';

export default function MediaList({ iframes, title }) {
    return (
        <div>
            <h3>{title}</h3>
            {iframes && 
                iframes.map(iframe => (
                    <div key={iframe._id}>
                        <Link>{iframe.title}</Link>
                        <MediaItem />
                    </div>
                ))}
        </div>
    );
};