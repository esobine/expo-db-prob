Reproducible example:

I have a problem with requesting the database with expo-sqlite tested with expo go.
test.db script :

```
CREATE TABLE IF NOT EXISTS UserData (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS HabitsData (
id INTEGER PRIMARY KEY AUTOINCREMENT,
userId INTEGER,
title TEXT NOT NULL,
description TEXT,
goal TEXT NOT NULL CHECK (goal IN ('Monthly', 'Weekly', 'Daily')),
frequency INTERGER NOT NULL,
color TEXT NOT NULL,
iconURL TEXT NOT NULL,
FOREIGN KEY (userId) REFERENCES UserData (id)
);
```

I created these two table manually. I also inserted 2 lines in UserData and 1 line in HabitsData manually.

#### What I tested ?

I tried in App.js line 14, function loadDataBase() to load my existing database. This code is based on this tutorial https://www.youtube.com/watch?v=dl74XgJYK1A.<br>
With expo 51 I also tried to pass database through SQLiteProvider with this `assetSource={{ assetId: require('./assets/test.db') }}` (cf. https://docs.expo.dev/versions/latest/sdk/sqlite/#import-an-existing-database).
It seems to be working the same on expo go.

#### Get tables name

In HomeScreen.js component line 15, when change query by `SELECT name FROM sqlite_schema;` it returns:

```
[{"name": "UserData"}, {"name": "sqlite_sequence"}]
```

But here what it returns when I do the same query in sqlite3 command :

```
UserData
sqlite_sequence
HabitsData
```

#### Get \* from UserData table

In HomeScreen.js component line 15, when change query by `SELECT * FROM UserData;` it returns:

```
[{"id": 1, "name": "Joe", "password": "test"}]
```

But here what it returns when I do the same query in sqlite3 command :

```
1|Joey|test
2|Alice|test
```

First, I inserted manually a row with a name equal to 'Joe'. After that, I updated manually it to 'Joey'. It seems that the application didn't take it into account and it remains 'Joe'.

#### Get \* from HabitsData

In HomeScreen.js component line 15, when change query by `SELECT * FROM UserData;` it returns:

```
[Error: Call to function 'NativeDatabase.prepareAsync' has been rejected.
→ Caused by: Error code : no such table: HabitsData]
```
