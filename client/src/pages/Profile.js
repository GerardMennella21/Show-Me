import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { Stack, Image } from '@chakra-ui/react'
import Images from '../components/Images';

const Profile = (props) => {
    const { loading, data } = useQuery(QUERY_ME)

    const images = data?.me.images || []

    console.log(data)
return (
<div>
    <Images images={images} />
</div>
)
};

export default Profile;