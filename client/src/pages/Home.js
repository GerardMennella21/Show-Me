import React from "react"
import FollowerList from '../components/FollowerList';
import PostForm from '../components/PostForm';
import PostList from "../components/List";

import Auth from "../utils/auth";
import { useQuery } from "@chakra-ui/react";
import { QUERY_POSTS, QUERY_ME_BASIC } from '../utils/queries'

const Home = () => {
   const { loading, data } = useQuery(QUERY_POSTS);
   const { data: userData } = useQuery(QUERY_ME_BASIC);
   const posts = data?.posts || [];

   const loggedIn = Auth.loggedIn();

   return (
       <main>
           <div className="flex-row justify-space-between">
               {loggedIn && (
                   <div className="col-12 mb-3">
                       <PostForm />
                    </div>
               )}
               <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
                   {loading ? (
                       <div>Loading...</div>
                   ) : (
                       <PostList 
                        posts={posts}
                        title="Show Who You Are..."
                       />
                   )}
               </div>
               {loggedIn && userData ? (
                   <div className="col-12 col-lg-3 mb-3">
                       <FollowerList
                        username={userData.me.username}
                        followerCount={userData.me.followerCount}
                        followers={userData.me.followers}
                        />
                    </div>
               ) : null}
           </div>
       </main>
   )
 };


export default Home;
