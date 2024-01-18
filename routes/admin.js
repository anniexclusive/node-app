const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const router = express.Router();
const product = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product'});
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
});

router.post('/add-product', (req, res, next) => {
    product.push({title: req.body.title});
    console.log(product);
    res.redirect('/');
});

module.exports = {
    routes: router,
    products: product
};