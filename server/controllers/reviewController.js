import Product from "../models/Product.js";
import Review from "../models/Review.js";
import Order from "../models/Order.js";

const getAverageRating = (reviews) => {
  if (!reviews.length) return 0;

  const total = reviews.reduce(
    (sum, review) => sum + Number(review.rating || 0),
    0
  );

  return Number((total / reviews.length).toFixed(1));
};

const syncProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId })
    .select("rating")
    .lean();

  const rating = getAverageRating(reviews);
  const numReviews = reviews.length;

  await Product.findByIdAndUpdate(
    productId,
    {
      rating,
      numReviews,
    },
    { new: true }
  );

  return {
    rating,
    numReviews,
  };
};


// ===============================
// GET ALL REVIEWS OF A PRODUCT
// GET /api/reviews/:productId
// ===============================
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId)
      .select("_id name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const reviews = await Review.find({
      product: productId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .lean();

    const summary = await syncProductRating(productId);

    return res.status(200).json({
      success: true,
      productId,
      rating: summary.rating,
      numReviews: summary.numReviews,
      reviews,
    });
  } catch (error) {
    console.error("GET PRODUCT REVIEWS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch reviews.",
      error: error.message,
    });
  }
};


// ===============================
// CREATE REVIEW
// POST /api/reviews/:productId
// ===============================
export const createProductReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login to write a review.",
      });
    }

    const rating = Number(req.body.rating);
    const comment = String(
      req.body.comment || ""
    ).trim();

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    if (comment.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Please write at least 3 characters.",
      });
    }

    if (comment.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Review cannot exceed 1000 characters.",
      });
    }

    const product = await Product.findById(productId)
      .select("_id name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Check delivered order
    const deliveredOrder = await Order.findOne({
      user: userId,
      status: "Delivered",
      "items.product": productId,
    }).select("_id");

    if (!deliveredOrder) {
      return res.status(403).json({
        success: false,
        message:
          "You can review this product after your order is delivered.",
      });
    }

    // Check duplicate review
    const existingReview = await Review.findOne({
      product: productId,
      user: userId,
    }).select("_id");

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message:
          "You have already reviewed this product.",
      });
    }

    let review;

    try {
      review = await Review.create({
        product: productId,
        user: userId,
        name: req.user.name || "Customer",
        rating,
        comment,
        isVerifiedPurchase: true,
      });
    } catch (error) {
      if (error?.code === 11000) {
        return res.status(409).json({
          success: false,
          message:
            "You have already reviewed this product.",
        });
      }

      throw error;
    }

    const summary = await syncProductRating(productId);

    return res.status(201).json({
      success: true,
      message: "Review added successfully.",
      review,
      rating: summary.rating,
      numReviews: summary.numReviews,
    });
  } catch (error) {
    console.error("CREATE REVIEW ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to add review.",
      error: error.message,
    });
  }
};


// ===============================
// DELETE USER'S OWN REVIEW
// DELETE /api/reviews/:productId/:reviewId
// ===============================
export const deleteOwnReview = async (req, res) => {
  try {
    const {
      productId,
      reviewId,
    } = req.params;

    const userId = req.user?._id;

    const review = await Review.findOne({
      _id: reviewId,
      product: productId,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    const isOwner =
      review.user.toString() ===
      userId.toString();

    const isAdmin =
      ["admin", "superadmin"].includes(
        req.user?.role
      );

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to delete this review.",
      });
    }

    await Review.deleteOne({
      _id: reviewId,
    });

    const summary =
      await syncProductRating(productId);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
      rating: summary.rating,
      numReviews: summary.numReviews,
    });
  } catch (error) {
    console.error("DELETE REVIEW ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete review.",
      error: error.message,
    });
  }
};


// ===============================
// ADMIN - GET ALL REVIEWS
// GET /api/reviews/admin/all
// ===============================
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate(
        "product",
        "name images price"
      )
      .populate(
        "user",
        "name email"
      )
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error(
      "GET ALL REVIEWS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch all reviews.",
      error: error.message,
    });
  }
};


// ===============================
// ADMIN - DELETE ANY REVIEW
// DELETE /api/reviews/admin/:reviewId
// ===============================
export const deleteReviewByAdmin = async (
  req,
  res
) => {
  try {
    const { reviewId } = req.params;

    const review =
      await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    const productId = review.product;

    await Review.deleteOne({
      _id: reviewId,
    });

    const summary =
      await syncProductRating(productId);

    return res.status(200).json({
      success: true,
      message:
        "Review deleted successfully by admin.",
      rating: summary.rating,
      numReviews: summary.numReviews,
    });
  } catch (error) {
    console.error(
      "ADMIN DELETE REVIEW ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to delete review.",
      error: error.message,
    });
  }
};