import React, { useState } from 'react';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import { RouteBlogBySearch } from '@/helper/routes';

const SearchBox = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    const getInput = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(RouteBlogBySearch(query.trim()));
        }
        e.target.value = '';
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                name="q"
                onInput={getInput}
                placeholder="Search"
                type="search"
                className="h-10 px-4 w-full bg-gray-50 text-gray-700 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 rounded-full shadow-inner"
            />
        </form>
    );
};

export default SearchBox;
