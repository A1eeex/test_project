import React from 'react';
import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";

const ComicsPage = () => {
    return (
        <div>
            <AppBanner/>
            <ComicsList/>
        </div>
    );
};

export default ComicsPage;