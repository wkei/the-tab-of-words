const DB_JSON = './static/data/db.json'

export const getDB = () => fetch(DB_JSON).then(data => data.json())
