import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
    phoneBrand: { type: String, required: true },
    phoneModel: { type: String, required: true },
    caseType: { type: String, required: true }, // e.g., Silicone, Hard
    color: { type: String, required: false },
    price: { type: Number, required: false }, // Override base price if set
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String, unique: true }
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [100, 'Name can not be more than 100 characters']
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    basePrice: {
        type: Number,
        required: [true, 'Please add a base price']
    },
    images: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        required: [true, 'Please select category'],
        enum: ['Mobile Phone Covers']
    },
    variants: [variantSchema],
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must can not be more than 5']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Product', productSchema);
