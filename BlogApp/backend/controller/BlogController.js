const Validator = require('validatorjs');
const responseHelper = require('../helper/responseHelper');
const Sequelize = require('sequelize');
const models = require('../models');
const Blog = models.blog;
const User = models.user;

Blog.belongsTo(User, { foreignKey: 'user_id' });

const getAllBlogs = async (req, res) => {
    try {
        let getBlogData = await Blog.findAll(
            {
                attributes: ['id', 'title'],
                include: [{
                    model: User,
                    attributes: ['username']
                }]
            }
        );

        let blogData = []

        for (const val of getBlogData) {
            let data = {}

            data.id = val.id;
            data.title = val.title;
            data.username = val.user.username;

            blogData.push(data);
        }

        if (getBlogData.length < 1) {
            return responseHelper.failedResponse(res, 'No Blogs Found');
        }

        responseHelper.successResponse(res, 'Blogs', blogData)
    } catch (error) {
        return responseHelper.catchResponse(res, error.message);
    }
}

const addBlog = async (req, res) => {
    try {
        const user_id = req.user.id;
        if (!user_id) return responseHelper.badRequest(res, 'Bad Request');
        let validationRule = {
            title: 'required|string',
            description: 'required|string',
        };
        var validation = new Validator(req.body, validationRule);
        if (validation.fails()) {
            return responseHelper.validationResponse(res, validation.errors);
        }
        const title = req.body.title;
        const description = req.body.description;


        let addBlogData = await Blog.create({
            user_id,
            title,
            description
        });
        if (!addBlogData) return responseHelper.badRequest(res, 'Bad Request');
        responseHelper.successResponse(res, 'Blog Created Successfully');
    } catch (error) {
        return responseHelper.catchResponse(res, error.message);
    }
};


const editBlog = async (req, res) => {
    try {
        const user_id = req.user.id;
        if (!user_id) return responseHelper.badRequest(res, 'Bad Request');
        const blog_id = req.params.id;
        let getBlogData = await Blog.findOne({
            where: {
                id: blog_id,
                user_id: user_id,
            },
        });
        if (!getBlogData) return responseHelper.badRequest(res, 'Bad Request');

        let validationRule = {
            title: 'required|string',
            description: 'required|string',
        };
        var validation = new Validator(req.body, validationRule);
        if (validation.fails()) {
            return responseHelper.validationResponse(res, validation.errors);
        }

        const title = req.body.title;
        const description = req.body.description;
        const updatedAt = Sequelize.literal('CURRENT_TIMESTAMP')

        await Blog.update(
            {
                title,
                description,
                updatedAt
            },
            {
                where: {
                    id: getBlogData.id,
                },
            },
        );
        responseHelper.successResponse(res, 'Blog Updated Successfully');
    } catch (error) {
        return responseHelper.catchResponse(res, error.message);
    }
};

//user can delete only our Campground
const deleteBlog = async (req, res) => {
    try {
        const user_id = req.user.id;
        if (!user_id) return responseHelper.badRequest(res, 'Bad Request');
        const blog_id = req.params.id;
        if (!blog_id) return responseHelper.badRequest(res, 'Bad Request');

        var getBlogData = await Blog.findOne({
            where: {
                id: blog_id,
                user_id: user_id,
            },
        });
        if (!getBlogData) return responseHelper.badRequest(res, 'Bad Request');

        await getBlogData.destroy();
        responseHelper.successResponse(res, 'Blog Deleted Successfully.');
    } catch (error) {
        return responseHelper.catchResponse(res, error.message);
    }
};

const blogDetails = async (req, res) => {
    try {
        const user_id = req.user ? req.user.id : null;
        const blog_id = req.params.id;
        if (!blog_id) return responseHelper.badRequest(res, 'Bad Request');

        let blogData = await Blog.findOne({
            attributes: ['id', 'user_id', 'title', 'description', 'updatedAt'],
            where: {
                id: blog_id
            },
            include: [{
                model: User,
                attributes: ['username']
            }]
        })

        if (!blogData) return responseHelper.badRequest(res, 'Bad Request');

        let finalBlogData = {
            id: blogData.id,
            title: blogData.title,
            description: blogData.description,
            updatedAt: blogData.updatedAt,
            showEditDelete: user_id && user_id === blogData.user_id ? 1 : 0
        }

        responseHelper.successResponse(res, 'Blog Details', finalBlogData);
    } catch (error) {
        return responseHelper.catchResponse(res, error.message);
    }

}


module.exports = {
    getAllBlogs,
    addBlog,
    editBlog,
    deleteBlog,
    blogDetails
}