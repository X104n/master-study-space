// utils/groupAssignment.js
import { mergeSort } from './sort';  // Ensure correct path

export const findUserGroup = (users, userId, studyRoom) => {
    // Filter users for the specified study room
    const filteredUsers = users.filter(user => user.studyRoom === studyRoom);

    // Sort users by examination date using the refined sorting function
    const sortedUsers = mergeSort(filteredUsers, 'examinationDate');

    // Group users by examination date
    const groups = sortedUsers.reduce((acc, user) => {
        const date = user.examinationDate;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(user);
        return acc;
    }, {});

    // Find the group number for the specified user
    const dates = Object.keys(groups).sort(); // Ensure the dates are sorted
    for (let i = 0; i < dates.length; i++) {
        if (groups[dates[i]].some(user => user.userId === userId)) {
            return i + 1; // Return group number, 1-indexed
        }
    }

    return -1; // Return -1 if user is not found
};
