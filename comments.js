// Create web server
// Create routes
// Start server
// http://localhost:3000/comments
// http://localhost:3000/comments/new
// http://localhost:3000/comments/1
// http://localhost:3000/comments/1/edit
// http://localhost:3000/comments/1/delete

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Comments index
router.get('/', async (req, res) => {
    let comments;

    try {
        comments = await Comment.find().sort({ createdAt: 'desc' }).limit(10).exec();
    } catch {
        comments = [];
    }

    res.render('comments/index', { comments: comments });
});

// New comment
router.get('/new', (req, res) => {
    res.render('comments/new', { comment: new Comment() });
});

// Create comment
router.post('/', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });

    try {
        const newComment = await comment.save();
        res.redirect(`comments/${newComment.id}`);
    } catch {
        res.render('comments/new', {
            comment: comment,
            errorMessage: 'Error creating comment'
        });
    }
});

// Show comment
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.render('comments/show', { comment: comment });
    } catch {
        res.redirect('/');
    }
});

// Edit comment
router.get('/:id/edit', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.render('comments/edit', { comment: comment });
    } catch {
        res.redirect('/');
    }
});

// Update comment
router.put('/:id', async (req, res) => {
    let comment;

    try {
        comment = await Comment.findById(req.params.id);
        comment.name = req.body.name;
        comment.comment = req.body.comment;
        await comment.save();
        res.redirect(`/comments/${comment.id}`);
    } catch {
        if (comment == null) {
            res.redirect('/');
        } else {
            res.render('comments/edit', {
                comment: comment,
                errorMessage: 'Error updating comment'
            });
        }
    }
});

// Delete comment
router.delete('/:id', async (req, res) => {
    let comment;

    try {
        comment = await Comment.findById(req.params.id);
        await comment.remove();
        res.redirect('/comments');
    } catch {
        if (comment == null) {
            res.redirect('/');
        } else {
            res.redirect(`/comments/${comment.id}`);
        }
    }
});

module.exports = router;