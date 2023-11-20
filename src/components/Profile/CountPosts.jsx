import { useState, useEffect } from "react";
import * as profileService from "../../services/profileService";

const CountPosts = ({
    ownerId,
}) => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        const getCount = async () => {
          try {
            const response = await profileService.counter(ownerId);
            console.log(response);
            setCount(response);
          } catch (error) {
            console.error("Error fetching count:", error);
          }
        };
    
        getCount();
      }, [ownerId]);

    return(
        <>
            <h4>{count}</h4>
        </>
    );
}
export default CountPosts;