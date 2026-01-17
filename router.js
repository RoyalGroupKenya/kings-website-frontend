const express = require('express')
const router = express.Router()
const controll = require('./Controll')
const U = require("./Multer");
const { default: rateLimit } = require('express-rate-limit');

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many attempts from this IP, please try again later.',
});


//user related routes
router.post('/send',formLimiter, controll.send)
router.post('/send-sales',formLimiter, controll.sale)
router.post('/subscribe',formLimiter, controll.subscribe)

router.post('/blog-img/:propId',U.upload_blog.array('blog-images',4), controll.BlogImgHandler)
router.post('/news-img/:propId',U.upload_blog.array('blog-images',4), controll.newsImgHandler)
router.post('/property-img/:propId',U.upload_prop.array('prop',4), controll.propImgHandler)
router.post('/blog-rte/:propId',U.upload_blog.array('blog-images',4),controll.Blog)


// Forum post routes
router.post("/posts", controll.createPost)
router.get("/posts", controll.getPosts)
router.post("/posts/:postId/like", controll.likePost)
router.post("/replies", controll.createReply)



module.exports = router