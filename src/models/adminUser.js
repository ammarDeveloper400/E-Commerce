import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    role: {
        type: String,
        default: "admin",
        enum: ["admin", "superadmin"],
    },
}, {
    timestamps: true,
});

adminUserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
const AdminUser = mongoose.model("admin_users", adminUserSchema);
export default AdminUser;
