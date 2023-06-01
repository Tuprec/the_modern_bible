import express from 'express';
import {getAllReviews, createReview, getReview, sortByDate, sortByScore} from '../controllers/review.js';
import {validateReview} from "../middlewares/reviewValidator.js";

const router = express.Router();

router.route('/')
    .get(getAllReviews)
    .post(validateReview, createReview);

router.route('/score')
    .get(sortByScore);
router.route('/date')
    .get(sortByDate);
router.route('/:id')
    .get(getReview);



// Add more review routes and corresponding controller functions

export default router;