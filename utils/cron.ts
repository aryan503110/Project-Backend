import cron from "node-cron";
import User from "../model/User.js";
import connectToDB from "../db/db.js";

cron.schedule("0 0 * * *", async () => {
  console.log("Premium expiry cron is running...");

  await connectToDB();

  const now = new Date();

  const result = await User.updateMany(
    {
      isPremium: true,
      premiumExpiryDate: { $lt: now },
    },
    {
      isPremium: false,
    },
  );

  console.log("Premium users expired:", result.modifiedCount);
});

// 0 0 * * *
// │ │ │ │ │
// │ │ │ │ └── Every day of week
// │ │ │ └──── Every month
// │ │ └────── Every day
// │ └──────── Hour = 0
// └────────── Minute = 0
