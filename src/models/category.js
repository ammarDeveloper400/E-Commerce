import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryNumber: {
        type: Number,
        unique: true,
        default: () => {
            let count = mongoose.model('Category').countDocuments().exec()
                .then(count => {
                    return (count + 1).toString().padStart(4, '0');
                });
            return count;
        },
        auto: true,
    },
    name: {
        type: String,
        unique: true,
        required: [true, "name is required"],
    },
    image: {
        type: String,
        required: [true, "image is required"],
    },
    tolalProducts: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

const Category = mongoose.model('category', categorySchema);

export default Category;
