import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('meeting.db');
//let SQLite = require('react-native-sqlite-storage');
//const db = SQLite.openDatabase({name: 'meeting.db', location: 'LibraryDB'}); 

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS meeting (id INTEGER PRIMARY KEY NOT NULL, event TEXT NOT NULL, name TEXT NOT NULL, contactno INTEGER, comments TEXT NOT NULL);',
            [],
            (_, result) => {
                resolve(result);
            },
            (_, err) => {
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const insertMeeting = (event, name, contactno, comments) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO meeting (event, name, contactno, comments) VALUES (?,?,?,?);',
            [event, name, contactno, comments],
            () => {
                resolve();
            },
            (_, err) => {
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const fetchMeeting = () => {
    console.log('In fetchMeeting method of db.js')
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM meeting;',
            [],
            () => {
                resolve();
            },
            (_, err) => {
                reject(err);
            }
            );
        });
    });
    return promise;
};