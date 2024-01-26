const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, index) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products, 
            pageTitle: 'Shop Homepage', 
            path: '/'
        });
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-listing', {
            prods: products, 
            pageTitle: 'My Shop', 
            path: '/products'
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            product: product, 
            pageTitle: 'Product -' + product.title, 
            path: '/products'
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProduct = cart.products.find(prod => prod.id === product.id);
                if (cartProduct) {
                    cartProducts.push({productData: product, qty: cartProduct.qty});
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                cart: cartProducts
            });
        });
    })
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product)=> {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};