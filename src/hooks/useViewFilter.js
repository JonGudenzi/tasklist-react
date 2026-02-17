import { useState } from "react";

export default function useViewFilter(initial = "all"){
    const [viewFilter, setViewFilter] = useState(initial);
 
    function changeFilter(nextFilter) {
        setViewFilter(nextFilter);
    }

    function resetFilter() {
        setViewFilter("all");
    }

    return { viewFilter, changeFilter, resetFilter };
}