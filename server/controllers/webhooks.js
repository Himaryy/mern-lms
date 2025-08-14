import { Webhook } from "svix";
import User from "../models/user.js";
import "dotenv/config";
import Stripe from "stripe";
import { Purchase } from "../models/purchase.js";
import Course from "../models/course.js";

// API Controller to manage clerk user datbase

export const clerkWebhooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.create(userData);
        res.json({});

        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});

        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});

        break;
      }

      default:
        break;
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Handle webhooks stripe
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = Stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOKS_SECRET_KEY
    );
  } catch (error) {
    response.status(400).send(`Webhook error : ${error.message}`);
  }

  // Handle event
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { purchaseId } = session.data[0].metadata;

      const purchaseData = await Purchase.findById(purchaseId);
      const userData = await User.findById(purchaseData.userId);
      const courseData = await Course.findById(
        purchaseData.courseId.toString()
      );

      // send to mongodb
      courseData.enrolledStudents.push(userData);
      await courseData.save();

      userData.enrolledCourses.push(courseData._id);
      await userData.save();

      // Change the status to completed and send to mongodb
      purchaseData.status = "completed";
      await purchaseData.save();

      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { purchaseId } = session.data[0].metadata;
      const purchaseData = await Purchase.findById(purchaseId);
      purchaseData.status = "failed";

      await purchaseData.save();

      break;
    }

    // Handle other event type
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.json({
    received: true,
  });
};
