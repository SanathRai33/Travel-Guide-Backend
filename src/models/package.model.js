const mongoose = require("mongoose");
const { Schema } = mongoose;


const PriceIncludeSchema = new Schema(
    {
        item: String,
        description: String,
        included: Boolean,
    },
    { _id: false }
);

const ActivitySchema = new Schema(
    {
        time: String,
        activity: String,
        description: String,
        included: Boolean,
    },
    { _id: false }
);

const MealSchema = new Schema(
    {
        type: String, // breakfast, lunch, dinner
        description: String,
        included: Boolean,
    },
    { _id: false }
);

const ItinerarySchema = new Schema(
    {
        day: Number,
        title: String,
        description: String,
        activities: [ActivitySchema],
        meals: [MealSchema],
        accommodation: String,
        images: [String],
    },
    { _id: false }
);

const InclusionItemSchema = new Schema(
    {
        name: String,
        description: String,
    },
    { _id: false }
);

const InclusionSchema = new Schema(
    {
        category: String, // accommodation, transport, meals, activities
        items: [InclusionItemSchema],
    },
    { _id: false }
);

const AvailabilitySchema = new Schema(
    {
        startDate: Date,
        endDate: Date,
        seatsAvailable: Number,
        price: Number,
    },
    { _id: false }
);

/* ---------- Main Package Schema ---------- */

const PackageSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        location: {
            country: String,
            city: [String],
        },

        duration: {
            day: Number,
            night: Number,
        },

        categories: [
            {
                type: String,
                enum: ["beach", "mountain", "city", "adventure", "cultural", "luxury"],
            },
        ],

        tags: [String],

        basePrice: {
            type: Number,
            required: true,
        },

        currency: {
            type: String,
            default: "INR",
        },

        discount: {
            percentage: Number,
            discountedPrice: Number,
            validUntil: Date,
        },

        priceIncludes: [PriceIncludeSchema],

        images: {
            type: [String],
            validate: [(val) => val.length <= 10, "Max 10 images allowed"],
        },

        itinerary: [ItinerarySchema],

        inclusions: [InclusionSchema],

        groupSize: {
            min: Number,
            max: Number,
            currentBookings: {
                type: Number,
                default: 0,
            },
        },

        availability: [AvailabilitySchema],

        provider: {
            companyId: {
                type: Schema.Types.ObjectId,
                ref: "TravelCompany",
            },
            contactPerson: String,
            phone: String,
            email: String,
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: ["active", "inactive", "draft", "sold_out"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

const PackageModel = mongoose.model("package", PackageSchema);
module.exports = PackageModel;
