import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@chakra-ui/react';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FOLLOWER } from '../utils/mutations';
import Auth from '../utils/auth';
import FollowerList from '../components/FollowerList';

const Profile = (props) => {
const { username: userParam } = useParams();

const [addFollower] = useMutation(ADD_FOLLOWER);
const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
variables: { username: userParam },
});

const user = data?.me || data?.user || {};

//navigate to personal profile page if username is yours
if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
return <Navigate to="/profile:username" />
}

if (loading) {
return <div>Loading...</div>;
}

if (!user?.username) {
return (
    <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
    </h4>
);
};


const handleClick = async () => {
try {
    await addFollower({
        variables: { id: user._id },
    });
} catch (e) {
    console.error(e);
}
};

return (
<div>
    <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
            Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {userParam && (
            <button className="btn ml-auto" onClick={handleClick}>
                Follow
            </button>
        )}
    </div>
    <div className="flex-row justify-space-between mb-3">
        <FollowerList
            username={user.username}
            followerCount={user.followerCount}
            followers={user.followers}
        />
    </div>
    <div className="mb-3">{!userParam && <PostForm />}</div>
</div>
)
};

export default Profile;