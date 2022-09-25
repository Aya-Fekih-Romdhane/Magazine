const CommentArticle = require('../models/CommentArticle');
const mongoose = require('mongoose');
const { Validator } = require('node-input-validator');
const Article = require('./../models/Article');

exports.list = (req, res) => {
	let article_id = req.params.article_id;
	if (!mongoose.Types.ObjectId.isValid(article_id)) {
		return res.status(400).send({
			message: 'Invalid article id',
			data: {}
		});
	}

	Article.findOne({ _id: article_id }).then(async (article) => {
		if (!article) {
			return res.status(400).send({
				message: 'No article found',
				data: {}
			});
		} else {
			CommentArticle.find({ article_id: article_id }).then((comment) => {

				if (!comment) {
					return res.status(400).send({
						message: 'Comments not found !',
						data: {}
					});
				}
				return res.status(200).send({
					message: 'comments found',
					data: {
						comment: comment
					}
				})
			}).catch((err) => {
				return res.status(400).send({
					message: err.message,
					data: err
				});

			})

		}
	})



}
exports.create = async (req, res) => {
	let article_id = req.params.article_id;
	if (!mongoose.Types.ObjectId.isValid(article_id)) {
		return res.status(400).send({
			message: "Invalid blog id",
			data: {},
		});
	}
	Article.findOne({ _id: article_id })
		.then(async (blog) => {
			if (!blog) {
				return res.status(400).send({
					message: "No blog found",
					data: {},
				});
			} else {

				try {

					const v = new Validator(req.body, {
						comment: "required",
					});
					const matched = await v.check();
					if (!matched) {
						return res.status(422).send(v.errors);
					}
					let newCommentDocument = new CommentArticle({
						comment: req.body.comment,
						article_id: article_id,
						user_id: req.user._id,
					});

					let commentData = await newCommentDocument.save();

					await Article.updateOne(
						{ _id: article_id },
						{
							$push: { CommentArticle: commentData._id },
						}
					);

					let query = [
						{
							$lookup: {
								from: "users",
								localField: "user_id",
								foreignField: "_id",
								as: "user",
							},
						},
						{ $unwind: "$user" },
						{
							$match: {
								_id: mongoose.Types.ObjectId(commentData._id),
							},
						},
					];

					let comments = await CommentArticle.aggregate(query);

					return res.status(200).send({
						message: "Comment successfully added",
						data: comments[0],
					});
				} catch (err) {
					return res.status(400).send({
						message: err.message,
						data: err,
					});
				}
			}
		})
		.catch((err) => {
			return res.status(400).send({
				message: err.message,
				data: err,
			});
		});
};

exports.update = async (req, res) => {
	let comment_id = req.params.comment_id;
	if (!mongoose.Types.ObjectId.isValid(comment_id)) {
		return res.status(400).send({
			message: 'Invalid comment id',
			data: {}
		});
	}

	CommentArticle.findOne({ _id: comment_id }).then(async (comment) => {
		if (!comment) {
			return res.status(400).send({
				message: 'No comment found',
				data: {}
			});
		} else {

			let current_user = req.user;

			if (comment.user_id != current_user._id) {
				return res.status(400).send({
					message: 'Access denied',
					data: {}
				});
			} else {

				try {
					const v = new Validator(req.body, {
						comment: 'required',
					});
					const matched = await v.check();
					if (!matched) {
						return res.status(422).send(v.errors);
					}

					await CommentArticle.updateOne({ _id: comment_id }, {
						comment: req.body.comment
					});


					let query = [
						{
							$lookup:
							{
								from: "users",
								localField: "user_id",
								foreignField: "_id",
								as: "user"
							}
						},
						{ $unwind: '$user' },
						{
							$match: {
								'_id': mongoose.Types.ObjectId(comment_id)
							}
						},

					];

					let comments = await CommentArticle.aggregate(query);

					return res.status(200).send({
						message: 'Comment successfully updated',
						data: comments[0]
					});


				} catch (err) {
					return res.status(400).send({
						message: err.message,
						data: err
					});
				}


			}




		}
	}).catch((err) => {
		return res.status(400).send({
			message: err.message,
			data: err
		});
	})



}

exports.delete = (req, res) => {
	let comment_id = req.params.comment_id;
	if (!mongoose.Types.ObjectId.isValid(comment_id)) {
		return res.status(400).send({
			message: 'Invalid comment id',
			data: {}
		});
	}

	CommentArticle.findOne({ _id: comment_id }).then(async (comment) => {
		if (!comment) {
			return res.status(400).send({
				message: 'No comment found',
				data: {}
			});
		} else {

			let current_user = req.user;

			if (comment.user_id != current_user._id) {
				return res.status(400).send({
					message: 'Access denied',
					data: {}
				});
			} else {
				try {
					await CommentArticle.deleteOne({ _id: comment_id })
					await Article.updateOne(
						{ _id: comment.article_id },
						{
							$pull: { CommentArticle: comment_id }
						}
					)

					return res.status(200).send({
						message: 'Comment successfully deleted',
						data: {}
					});
				} catch (err) {
					return res.status(400).send({
						message: err.message,
						data: err
					});
				}



			}

		}
	}).catch((err) => {
		return res.status(400).send({
			message: err.message,
			data: err
		});
	})


}





