// import { NextResponse } from "next/server";
// import Connection from "../../dbconfig/dbconfig";
// import User from "../../../models/page";
// import crypto from "crypto";

// export async function POST(request) {
//   await Connection();
//   const { email } = await request.json();
//   // Check if user already exists
//   const existingUser = await User.findOne({ email });
//   if (!existingUser) {
//     return NextResponse.json(
//       { message: "Email does not exist" },
//       { status: 400 }
//     );
//   }

//   const restToken = crypto.rendomBytes(20).toString("hex");
//   const resetPasswordExpiry = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
// }


// Sufi added to resolve error while deploying 
import { NextResponse } from "next/server";
import Connection from "../../dbconfig/dbconfig";
import User from "../../../models/page";
import crypto from "crypto";

export async function POST(request) {
  await Connection();
  const { email } = await request.json();

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return NextResponse.json({ message: "Email does not exist" }, { status: 400 });
  }

  const resetToken = crypto.randomBytes(20).toString("hex"); // Fix: corrected method name
  const resetPasswordExpiry = Date.now() + 3600000; // Fix: Use expiry as timestamp (1 hour from now)

  existingUser.resetToken = resetToken;
  existingUser.resetPasswordExpiry = resetPasswordExpiry;
  await existingUser.save(); // Save token to DB

  return NextResponse.json({ message: "Reset token generated successfully", resetToken });
}

