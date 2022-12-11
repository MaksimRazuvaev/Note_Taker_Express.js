# Note Taker Express.js

This web app with HTML routes is to create and delete notes

## Description

- This application will use an Express.js back end and will save and retrieve note data from a JSON file.
- Application is deployed in Heroku.
- db.json file is used to store and retrieve notes using the `fs` module.
- Next HTML routs are implemented:
- `GET /notes` returns the `notes.html` file.
- `GET *` returns the `index.html` file.
- `GET /api/notes` reads the `db.json` file and returns all saved notes as JSON.
- `POST /api/notes` receives a new note to save on the request body, add it to the `db.json` file, and then returns the new note to the client.
- `DELETE /api/notes/:id` receives a query parameter that contains the id of a note to delete.

## Usage

User can write, save, and delete notes.

## App web address

https://mysterious-mountain-00376.herokuapp.com/notes

## Credits

N/A

## License

MIT License according to the LICENSE file in the repo.