import faker from 'faker';

export const randomUsers = (count = 10) => {
    const arr = [];
    for (let i = 0; i < count; i ++) {
        arr.push({
            key: faker.random.uuid(),
            name: faker.name.firstName(),
            avatar: faker.image.avatar(),
        });
    }

    return arr;
};