import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Images from '../components/Images';

const Profile = (props) => {
    const { data } = useQuery(QUERY_ME)

    const images = data?.me.images || []

    console.log(data)
return (
<div>
    <Images images={images} />
</div>
)
};

export default Profile;