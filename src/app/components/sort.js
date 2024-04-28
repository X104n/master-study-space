export const mergeSort = (arr, key) => {
    if (arr.length < 2) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left, key), mergeSort(right, key), key);
};

const merge = (left, right, key) => {
    let arr = [];
    while (left.length && right.length) {
        const leftYear = parseInt(left[0][key].substring(1), 10);
        const rightYear = parseInt(right[0][key].substring(1), 10);
        const leftPrefix = left[0][key][0];
        const rightPrefix = right[0][key][0];

        if (leftYear < rightYear || (leftYear === rightYear && leftPrefix < rightPrefix)) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }
    return [...arr, ...left, ...right];
};

export const filterAndSortUsers = (users, key, studyRoom = null) => {
    if (studyRoom) {
        users = users.filter(user => user.studyRoom === studyRoom);
    }
    return mergeSort(users, key);
};
