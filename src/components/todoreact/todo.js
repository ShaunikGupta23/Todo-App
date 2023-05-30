import React, { useState, useEffect } from 'react'
import "./style.css"

//get LocalStorage back on the page after page reloading

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if (lists) {
        return JSON.parse(lists);
        //converts into an array from JSON object
    }
    else {
        return [];
    }
}

const Todo = () => {

    const [inputdata, setInputData] = useState("");

    const [items, setItems] = useState(getLocalData());

    const [isEditItem, setIsEditItem] = useState("");

    const [toggleButton, setToggleButton] = useState(false);

    // add items function 
    const addItem = () => {
        if (!inputdata) {
            alert("Please fill the data");
        }
        else if (inputdata && toggleButton) {
            setItems(
                items.map((currElem) => {
                    if (currElem.id === isEditItem) {
                        return { ...currElem, name: inputdata }
                    }
                    return currElem;
                })
            );
            setInputData([]);

            setIsEditItem(null);
            setToggleButton(false);
        }
        else {

            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            };


            setItems([...items, myNewInputData]);
            setInputData("");
        }

    };

    //edit items

    const editItem = (index) => {
        const item_todo_edited = items.find((currElem) => {
            return currElem.id === index;
        });

        setInputData(item_todo_edited.name);

        setIsEditItem(index);
        setToggleButton(true);

    }

    //Deleting items

    const deleteItem = (index) => {
        const updatedItems = items.filter((currElem) => {
            return currElem.id !== index;
        });
        setItems(updatedItems);

    };

    //remove all the items

    const removeAll = () => {

        setItems([]);
    };

    //using useEffect hooks to implement LocalStorage

    useEffect(() => { localStorage.setItem("mytodolist", JSON.stringify(items)) }, [items]);
    //items is an array but we need string so we used JSON.stringify to convert it into a string
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.png" alt="todoLogo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text"
                            placeholder="✍ Add Item"
                            className="form-control"
                            value={inputdata}
                            onChange={(event) => setInputData(event.target.value)}
                        />

                        {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>)
                            : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
                    </div>

                    {/*Show items */}

                    <div className="showItems">
                        {
                            items.map((currElem) => {
                                return (

                                    <div className="eachItem" key={currElem.id}>
                                        <h3>{currElem.name}</h3>

                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" onClick={() => editItem(currElem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currElem.id)}></i>
                                        </div>

                                    </div>

                                )

                            })
                        }

                    </div>

                    {/* remove items */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="REMOVE ALL" onClick={removeAll}>
                            <span>CHECKLIST</span>
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Todo
