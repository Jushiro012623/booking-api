const bodyParser = require('body-parser');
export default (app : any) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}