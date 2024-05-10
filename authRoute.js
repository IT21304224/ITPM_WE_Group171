import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  orderStatusController,
  updatePointsController,
  getUserByIdController,
} from "../controllers/authController.js";
import userModel from "../models/userModel.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";



//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});


//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});


//update profile
router.put("/profile", requireSignIn, updateProfileController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

// Route to update user points
router.post('/updatePoints', updatePointsController);

// Route to get user details by ID
router.get("/user/:userId", getUserByIdController);




router.get("/customers", async (req, res) => {
  try {
    // Extract the badge type query parameter from the request URL
    const badgeType = req.query.badge;

    // Query the database based on the badge type
    let customers;
    if (badgeType === 'silver' || badgeType === 'bronze') {
      customers = await userModel.find({ badge: badgeType });
    } else {
      // If no badge type is specified, return all customers
      customers = await userModel.find();
    }

    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
