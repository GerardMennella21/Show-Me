import React from "react"
// import PostList from "../components/List";d
import Images from "../components/Images";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_IMAGES} from '../utils/queries'


const Home = () => {
    const { loading, data } = useQuery(QUERY_IMAGES)

    const images = data?.images || []

    const loggedIn = Auth.loggedIn();

    console.log(images)

   return (
       <div>
            <Images images={images} />
       </div>
   )
 };


export default Home;
