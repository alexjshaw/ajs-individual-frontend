const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Import cors module
const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

const getDbData = () => {
    const data = fs.readFileSync('db.json');
    return JSON.parse(data);
};

const updateDbData = (newData) => {
    fs.writeFileSync('db.json', JSON.stringify(newData));
};

app.get('/lists', (req, res) => {
    const data = getDbData();
    res.json(data.lists);
});

app.get('/lists/:id', (req, res) => {
    const data = getDbData();
    const list = data.lists.find(list => list.listId === Number(req.params.id));
    if (list) {
        res.json(list);
    } else {
        res.status(404).json({ message: 'List not found' });
    }
});

app.get('/lists/:id/items', (req, res) => {
    const data = getDbData();
    const list = data.lists.find(list => list.listId === Number(req.params.id));
    if (list) {
        res.json(list.items);
    } else {
        res.status(404).json({ message: 'List not found' });
    }
});

app.post('/lists/:id/items', (req, res) => {
    const data = getDbData();
    const listId = Number(req.params.id);
    let idx = data.lists.findIndex(list => list.listId === listId);
    if (idx === -1) {
        res.status(404).json({ message: 'List not found' });
    } else {
        const newItem = req.body;
        let maxItemId = Math.max(...data.lists[idx].items.map(item => item.itemId), 0); // Find max itemId
        newItem.itemId = maxItemId + 1; // Assign new itemId
        data.lists[idx].items.push(newItem);
        updateDbData(data);
        res.status(201).json(newItem);
    }
});

app.post('/lists', (req, res) => {
    const data = getDbData();
    const newList = req.body;
    let maxId = Math.max(...data.lists.map(list => list.listId), 0); // Find max listId
    newList.listId = maxId + 1; // Assign new listId
    data.lists.push(newList);
    updateDbData(data);
    res.status(201).json(newList);
});

app.patch('/lists/:id', (req, res) => {
    const data = getDbData();
    const listId = Number(req.params.id);
    let idx = data.lists.findIndex(list => list.listId === listId);
    if (idx === -1) {
        res.status(404).json({ message: 'List not found' });
    } else {
        data.lists[idx] = { ...data.lists[idx], ...req.body };
        updateDbData(data);
        res.json(data.lists[idx]);
    }
});

app.patch('/lists/:id/items/:itemId', (req, res) => {
    const data = getDbData();
    const listId = Number(req.params.id);
    const itemId = Number(req.params.itemId);
    let listIdx = data.lists.findIndex(list => list.listId === listId);
    if (listIdx === -1) {
        res.status(404).json({ message: 'List not found' });
    } else {
        let itemIdx = data.lists[listIdx].items.findIndex(item => item.itemId === itemId);
        if(itemIdx === -1){
            res.status(404).json({ message: 'Item not found' });
        } else {
            data.lists[listIdx].items[itemIdx] = { ...data.lists[listIdx].items[itemIdx], ...req.body };
            updateDbData(data);
            res.json(data.lists[listIdx].items[itemIdx]);
        }
    }
});

app.delete('/lists/:id', (req, res) => {
    const data = getDbData();
    const listId = Number(req.params.id);
    const listIdx = data.lists.findIndex(list => list.listId === listId);
    if (listIdx === -1) {
        res.status(404).json({ message: 'List not found' });
    } else {
        const deletedList = data.lists.splice(listIdx, 1)[0];
        updateDbData(data);
        // Adjust list IDs
        data.lists.forEach((list, index) => {
            list.listId = index + 1;
        });
        updateDbData(data);
        res.json(deletedList);
    }
});

app.delete('/lists/:id/items/:itemId', (req, res) => {
    const data = getDbData();
    const listId = Number(req.params.id);
    const itemId = Number(req.params.itemId);
    const listIdx = data.lists.findIndex(list => list.listId === listId);
    if (listIdx === -1) {
        res.status(404).json({ message: 'List not found' });
    } else {
        const itemIdx = data.lists[listIdx].items.findIndex(item => item.itemId === itemId);
        if (itemIdx === -1) {
            res.status(404).json({ message: 'Item not found' });
        } else {
            const deletedItem = data.lists[listIdx].items.splice(itemIdx, 1)[0];
            updateDbData(data);
            // Adjust item IDs
            data.lists[listIdx].items.forEach((item, index) => {
                item.itemId = index + 1;
            });
            updateDbData(data);
            res.json(deletedItem);
        }
    }
});




app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
