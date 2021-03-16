let url = 'http://localhost:3000/';


async function doGETRequest() {

    let result = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (result.ok) {
        let json = await result.json();

        return json;
    } else {
        return `HTTP error: ${result.status}`;
    }

}


doGETRequest().then(data => {
    data.forEach(task => {
        // console.log(task.descripton, task.done);


        // Display saved tasks

        generateTasksForDOM(task.descripton, task.done);


        // Update a completed task

        // console.log(task)
        document.body.addEventListener('click', function (e) {
            // e.preventDefault();

            const item = e.target;
            if (item.classList[0] === "done-btn") {
                if (item.parentElement.firstChild.innerHTML === task.descripton) {
                    doPUTRequest(task.descripton, task.done, task._id)
                }

            }

        })

    });
});



async function doPOSTRequest(task) {
    const data = {
        descripton: task,
        done: false
    };

    let result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (result.ok) {
        // let ret = await result.json();
        return JSON.parse(JSON.stringify(data));

    } else {
        return `HTTP error: ${result.status}`;
    }
}

// doPOSTRequest().then(data => {
//         console.log(data);
//     });




async function doPUTRequest(taskName, taskDone, taskID) {
    if (taskDone === false) {
        const data = {
            descripton: taskName,
            done: true
        };
        let result = await fetch(url + taskID, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (result.ok) {
            // let ret = await result.json();
            return JSON.parse(JSON.stringify(data));

        } else {
            return `HTTP error: ${result.status}`;
        }


    } else {
        const data = {
            descripton: taskName,
            done: false
        };
        let result = await fetch(url + taskID, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (result.ok) {
            // let ret = await result.json();
            return JSON.parse(JSON.stringify(data));

        } else {
            return `HTTP error: ${result.status}`;
        }

    }

}


// Delete a Task from API

doGETRequest().then(data => {
    data.forEach(task => {
        document.addEventListener('click', function (e) {
            const item = e.target;
            if (item.classList[0] === "delete-btn") {
                if (item.parentElement.firstChild.innerHTML === task.descripton) {
                    Delete(task._id)
                }
            }
        })

    });
})


async function Delete(taskID) {
    let result = await fetch(url + taskID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (result.ok) {
        // let ret = await result.json();
        return "alles goed";

    } else {
        return `HTTP error: ${result.status}`;
    }
}



// const getTasksNames = doGETRequest().then(data => {
//     data.forEach(task => {
//         console.log(task.descripton)
//     })

// })