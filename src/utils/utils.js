import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => { // async resource -> can be re used with any paginated data like comments / profiles etc
    try {
        const { data } = await axiosReq.get(resource.next);
        setResource((prevResource) => ({
            ...prevResource,
            next: data.next, // fetch next page
            results: data.results.reduce((acc, cur) => { // reduce to look through the new page of results that got fetched through the API
                return acc.some((accResult) => accResult.id === cur.id) // some method -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
                    ? acc // if some -> true, return accumulator without the post to it
                    : [...acc, cur]; // else return an array with spread accumulator with the new post added to it
            }, prevResource.results),
        }));
    } catch (err) { }
};

export const followHelper = (profile, clickedProfile, following_id) => {
    return profile.id === clickedProfile.id
        ? // This is the profile I clicked on,
        // update its followers count and set its following id
        {
            ...profile,
            followers_count: profile.followers_count + 1,
            following_id,
        }
        : profile.is_owner
            ? // This is the profile of the logged in user
            // update its following count
            { ...profile, following_count: profile.following_count + 1 }
            : // this is not the profile the user clicked on or the profile
            // the user owns, so just return it unchanged
            profile;
};