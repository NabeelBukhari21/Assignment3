const setData = require('../data/setData');
const themeData = require('../data/themeData');

let sets = [];

const initialize = () => {
    return new Promise((resolve, reject) => {
        try {
            sets = setData.map(set => {
                const theme = themeData.find(theme => theme.id === set.theme_id);
                return { ...set, theme: theme ? theme.name : 'Unknown' };
            });
            resolve();
        } catch (err) {
            reject('Unable to initialize data');
        }
    });
};

const getAllSets = () => {
    return new Promise((resolve, reject) => {
        if (sets.length === 0) {
            reject('No sets available');
        } else {
            resolve(sets);
        }
    });
};

const getSetByNum = (setNum) => {
    return new Promise((resolve, reject) => {
        const set = sets.find(s => s.set_num === setNum);
        if (set) {
            resolve(set);
        } else {
            reject(`Set with number ${setNum} not found`);
        }
    });
};

const getSetsByTheme = (theme) => {
    return new Promise((resolve, reject) => {
        const filteredSets = sets.filter(s => s.theme.toLowerCase().includes(theme.toLowerCase()));
        if (filteredSets.length > 0) {
            resolve(filteredSets);
        } else {
            reject(`No sets found for theme ${theme}`);
        }
    });
};

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
