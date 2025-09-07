import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';
import { Review } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface ReviewSectionProps {
  productId: string;
  reviews: Review[];
  onAddReview: (rating: number, comment: string) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId, reviews, onAddReview }) => {
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddReview(newRating, newComment.trim());
      setNewComment('');
      setNewRating(5);
      setShowReviewForm(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Customer Reviews
        </h3>
        {isAuthenticated && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Write Review
          </motion.button>
        )}
      </div>

      {reviews.length > 0 && (
        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(averageRating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {averageRating.toFixed(1)} out of 5
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
          </span>
        </div>
      )}

      {showReviewForm && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmitReview}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rating
            </label>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setNewRating(i + 1)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      i < newRating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Comment
            </label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="Share your experience with this product..."
              required
            />
          </div>

          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Submit Review
            </motion.button>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {review.username}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {review.comment}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            No reviews yet. Be the first to review this product!
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;