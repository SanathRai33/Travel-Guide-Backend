const Packages = [
    {
        // Basic information
        _id: ObjectId,
        title: String,
        description: String,

        // Location
        location: {
            country: String,
            city: [String],
        },

        // Duration
        duration: {
            day: Number,
            night: Number
        },

        // Categories & Tags
        categories: Array[String], //(enum: ['beach', 'mountain', 'city', 'adventure', 'cultural', 'luxury'])
        tags: Array[String],

        // Pricing
        basePrice: Number,
        currency: String,
        discount: {
            percentage: Number,
            discountedPrice: Number,
            validUntil: Date
        },
        priceIncludes: [{
            item: String,
            description: String,
            included: Boolean
        }],

        // Images
        images: [],

        // Itinerary
        itinerary: [{
            day: Number,
            title: String,
            description: String,
            activities: [{
                time: String,
                activity: String,
                description: String,
                included: Boolean
            }],
            meals: [{
                type: String, // breakfast, lunch, dinner
                description: String,
                included: Boolean
            }],
            accommodation: String,
            images: [String]
        }],

        // Inclusions
        inclusions: [{
            category: String, // 'accommodation', 'transport', 'meals', 'activities'
            items: [{
                name: String,
                description: String
            }]
        }],

        // Booking Details
        groupSize: {
            min: Number,
            max: Number,
            currentBookings: Number
        },
        availability: [{
            startDate: Date,
            endDate: Date,
            seatsAvailable: Number,
            price: Number //(seasonal pricing)
        }],

        // Vendor/Provider Info
        provider: {
            companyId: ObjectId, //(ref: TravelCompany),
            contactPerson: String,
            phone: String,
            email: String
        },

        // Status & Metadata
        isFeatured: Boolean,
        status: String, //(enum: ['active', 'inactive', 'draft', 'sold_out'])
        createdAt: Date,
        updatedAt: Date,
    }
]