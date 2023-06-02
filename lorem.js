const fs = require('fs');
const { loremIpsum } = require('lorem-ipsum');

function createListObject(listId, userId, name, favourite, items, description) {
    return {
        listId,
        userId,
        name,
        favourite,
        items,
        description,
    };
}

function createItemObject(itemId, itemText) {
    return {
        itemId,
        itemText,
    };
}

const data = [];
for (let i = 1; i <= 12; i += 1) {
    const items = [];
    for (let j = 1; j <= Math.floor(Math.random() * 8) + 2; j += 1) {
        items.push(
            createItemObject(
                j,
                loremIpsum({
                    count: Math.floor(Math.random() * 11) + 5,
                    units: 'words',
                    format: 'plain',
                }),
            ),
        );
    }
    const listObject = createListObject(
        i,
        1,
        `List ${i}`,
        Math.random() < 0.5,
        items,
        loremIpsum({
            count: Math.floor(Math.random() * 9) + 2,
            units: 'words',
            format: 'plain',
        }),
    );
    data.push(listObject);
}

fs.writeFile('output.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log('Data written to file');
});