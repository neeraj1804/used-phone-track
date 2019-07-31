/* eslint-disable no-console, global-require */
const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const compression = require('compression');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const webpackConfig = require('../webpack.config.dev');

const port = process.env.PORT || 8080;
const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client/assets'));

//Hot reloading
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));  
//end of hot reloading

app.get("/getUsersList", (req, res) => {
    const name = req.query.name ? req.query.name : null;
    const count = typeof req.query.count !== "undefined" ? Number(req.query.count) : null;
    const lastActivateDate = req.query.activationDate ? new Date(req.query.activationDate.split("-").join(":")) : null;
    const users = getUsers(name, count, lastActivateDate);
    res.status(200).json(users);
});

app.use("/*", (req, res) => {
    if (req.get('host') !== undefined) {
        const url = `${req.protocol}://${req.get('host')}`;
        const newReq = http.request(url, (newRes) => {
          newRes.pipe(res);
        });
        req.pipe(newReq);
    }
});

const getUsers = (name, count, lastActivateDate) => {
    const userListPath = path.resolve(__dirname, "users.json");
    const rawData = fs.readFileSync(userListPath);
    let users = JSON.parse(rawData);
    if(name !== null || count !== null || lastActivateDate !== null){
        users = users.filter(u => {
            let status = true;
            if(name !== null && !u.name.includes(name)){
                status = false;
            }
            if(count !== null && u.count !== count){
                status = false;
            }
            if(lastActivateDate !== null){
                const currentDate = new Date(u.activationDate.split("-").join(":"));
                if(currentDate.getTime() < lastActivateDate.getTime()){
                    status = false;
                }
            }
            return status;
        });
    }
    return users;
};

app.listen(port, () => {
    console.log(`listening on ${port}`);
});