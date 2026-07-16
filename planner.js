let localTasksCollection = [];

const commitBtn = document.getElementById('monoAddTrigger');
const rawInput = document.getElementById('monoTaskInput');
const renderGrid = document.getElementById('monoTaskOutputArea');

commitBtn.addEventListener('click', appendTaskInstance);
rawInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') appendTaskInstance();
});

function appendTaskInstance() {
    const formattedText = rawInput.value.trim();

    if (formattedText === "") {
        alert("Execution halted: Character field empty.");
        return;
    }

    const taskObj = {
        uid: Date.now(),
        textLabel: formattedText,
        flagComplete: false
    };

    localTasksCollection.push(taskObj);
    rawInput.value = "";
    refreshWorkspaceDOM();
}

function switchFlag(targetUid) {
    localTasksCollection = localTasksCollection.map(task => {
        if(task.uid === targetUid) {
            return { ...task, flagComplete: !task.flagComplete };
        }
        return task;
    });
    refreshWorkspaceDOM();
}

function purgeItem(targetUid) {
    localTasksCollection = localTasksCollection.filter(task => task.uid !== targetUid);
    refreshWorkspaceDOM();
}

function refreshWorkspaceDOM() {
    renderGrid.innerHTML = "";

    localTasksCollection.forEach(task => {
        const itemRow = document.createElement('li');
        itemRow.className = `mono-task-item ${task.flagComplete ? 'strike-through' : ''}`;

        const textSpan = document.createElement('span');
        textSpan.textContent = task.textLabel;
        itemRow.appendChild(textSpan);

        const actionsContainer = document.createElement('div');

        const stateBtn = document.createElement('button');
        stateBtn.className = 'mono-control-btn';
        stateBtn.textContent = task.flagComplete ? 'Reopen' : 'Done';
        stateBtn.addEventListener('click', () => switchFlag(task.uid));
        actionsContainer.appendChild(stateBtn);

        const eraseBtn = document.createElement('button');
        eraseBtn.className = 'mono-control-btn';
        eraseBtn.textContent = 'Delete';
        eraseBtn.addEventListener('click', () => purgeItem(task.uid));
        actionsContainer.appendChild(eraseBtn);

        itemRow.appendChild(actionsContainer);
        renderGrid.appendChild(itemRow);
    });
}