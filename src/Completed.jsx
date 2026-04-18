import { useState, useCallback } from "react"
import { SortSelection } from "./SortSelection/SortSelection.jsx"
import { ButtonUndo } from "./ButtonUndo/ButtonUndo.jsx"
import { useContext } from "react"
import { ButtonLoad } from "./ButtonLoad/ButtonLoad.jsx"
import { TasksContext } from "./App"

export const Completed = () => {

    const [sortOrder, setSortOrder] = useState("asc");
    const [visibleCount, setVisibleCount] = useState(6)

    const handleOrderChange = useCallback((value) => {
        setSortOrder(value);
    }, [sortOrder]);

    const handleVisibleChange = useCallback(() => {
        setVisibleCount(prevVisibleCount => prevVisibleCount + 10);
    })

    const {tasks, toggleTaskState} = useContext(TasksContext);
    const completedTasks = tasks.filter(task => task.completed === true);
    const sortedTasks = [...completedTasks].sort((a, b) => 
          sortOrder === "asc" ? 
            a.title.localeCompare(b.title) 
            : 
            b.title.localeCompare(a.title));

    const visibleTasks = sortedTasks.slice(0, visibleCount);

    return(
        <>
            <div className="content-wrapper box2">
                <div className="dropdown-wrapper">
                    <SortSelection text="Sort:" name="sort" sortHandler={handleOrderChange}/>
                </div>
            
                <div className="tasks-container">
                     <p>Completed:</p>
                     {visibleTasks.map(task => 
                        <div className="item" key={task.id}>
                            <div className="item-info">
                                <span>{task.title}</span>
                                {
                                    task.completedAt && (
                                        <span>{`Completed on: ${new Date(task.completedAt).toLocaleString()}`}</span>
                                    )
                                }
                            </div> 
                            <ButtonUndo clickHandler={() => toggleTaskState(task.id)}/>
                        </div>
                     )}
                     {
                        visibleCount < sortedTasks.length && (
                        <ButtonLoad loadHandler={handleVisibleChange}/>
                    )}
                </div>
            </div>
        </>
    )
}