import { useEffect, useState } from "react";

export default function useViewFilter(initial = "all"){
    const [viewFilter, setViewFilter] = useState(() => {
        const savedFilter = localStorage.getItem("viewFilter");
        return savedFilter ? JSON.parse(savedFilter) : initial;
    });

    useEffect(() => {
        localStorage.setItem("viewFilter", JSON.stringify(viewFilter));
    },[viewFilter]);
 
    function changeFilter(nextFilter) {
        setViewFilter(nextFilter);
    }

    return { viewFilter, changeFilter };
}