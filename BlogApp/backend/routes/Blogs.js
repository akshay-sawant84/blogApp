const router = require("express").Router();
const blogController = require('../controller/BlogController')
const verify = require('../helper/requestInterceptor')

router.get("/blog", blogController.getAllBlogs);
router.post("/blog/add", verify.authorizeToken , blogController.addBlog);
router.put("/blog/edit/:id", verify.authorizeToken, blogController.editBlog);
router.delete("/blog/delete/:id", verify.authorizeToken, blogController.deleteBlog);
router.get('/blog-details/:id',verify.partialAuthorizeToken, blogController.blogDetails);

module.exports = router;