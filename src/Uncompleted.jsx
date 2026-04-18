import { useCallback, useState } from "react"
import { FilterSelection } from "./FilterSelection/FilterSelection"
import { SortSelection } from "./SortSelection/SortSelection"
import { ButtonComplete } from "./ButtonComplete/ButtonComplete"
import { useContext } from "react"
import { TasksContext } from "./App"
import { ButtonLoad } from "./ButtonLoad/ButtonLoad"

export const Uncompleted = () =>{

    const [selectedUser, setSelectedUser] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [visibleCount, setVisibleCount] = useState(6);

    const handleFilterChange = useCallback((value) => {
        setSelectedUser(value);
        setVisibleCount(6);
    }, [selectedUser]);

    const handleOrderChange = useCallback((value) => {
        setSortOrder(value);
    }, [sortOrder]);

    const handleVisibleChange = useCallback(() => {
        setVisibleCount(prevVisibleCount => prevVisibleCount + 10);
    })

    const {tasks, toggleTaskState} = useContext(TasksContext);
    const uncompletedTasks = tasks.filter(task => task.completed === false);
    const filteredTasks = uncompletedTasks.filter(task => {
        return selectedUser === "all" ? true : task.userId === Number(selectedUser)
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => 
          sortOrder === "asc" ? 
            a.title.localeCompare(b.title) 
            : 
            b.title.localeCompare(a.title));

    const visibleTasks = sortedTasks.slice(0, visibleCount);

    return(
        <>
            <div className="content-wrapper box1">
                <div className="dropdown-wrapper">
                    <FilterSelection text="Filter:" name="filter" filterHandler={handleFilterChange}/>
                    <SortSelection text="Sort:" name="sort" sortHandler={handleOrderChange}/>
                </div>

                <div className="tasks-container">
                        <p>Pending:</p>
                        {visibleTasks.map(task => 
                            <div className="item" key={task.id}>
                                <span>{task.title}</span> <ButtonComplete clickHandler={() => toggleTaskState(task.id)}/>
                            </div>
                        )}
                        {visibleCount < sortedTasks.length && (
                            <ButtonLoad loadHandler={handleVisibleChange}/>
                        )}
                 </div>
                 
            </div>
        </>
    )
}

