const mongoose = require("mongoose");
const { Schema } = mongoose;

/* ---------- Sub Schemas ---------- */

// Amenities Schema
const AmenitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: String, // Icon name for frontend display
    category: {
      type: String,
      enum: ["general", "room", "bathroom", "kitchen", "entertainment", "accessibility", "safety", "services"],
      default: "general",
    },
    description: String,
  },
  { _id: false }
);

// Room Type Schema
const RoomTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    maxOccupancy: {
      adults: {
        type: Number,
        default: 2,
      },
      children: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 2,
      },
    },
    size: {
      value: Number,
      unit: {
        type: String,
        enum: ["sqft", "sqm"],
        default: "sqft",
      },
    },
    bedType: {
      type: String,
      enum: ["single", "double", "queen", "king", "twin", "suite", "family"],
      default: "double",
    },
    bedCount: Number,
    amenities: [String], // Specific to this room type
    images: [String],
    cancellationPolicy: {
      freeCancellation: {
        type: Boolean,
        default: false,
      },
      hoursBeforeCheckin: Number,
      penaltyPercentage: Number,
    },
  },
  { _id: false }
);

// Room Pricing Schema
const RoomPricingSchema = new Schema(
  {
    roomTypeId: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    discount: {
      percentage: Number,
      discountedPrice: Number,
      type: {
        type: String,
        enum: ["early_bird", "last_minute", "seasonal", "weekly", "monthly"],
      },
      validUntil: Date,
    },
    taxesAndFees: {
      taxPercentage: Number,
      serviceCharge: Number,
      resortFee: Number,
    },
    isRefundable: {
      type: Boolean,
      default: true,
    },
    breakfastIncluded: {
      type: Boolean,
      default: false,
    },
    freeCancellation: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

// Location Schema
const LocationSchema = new Schema(
  {
    address: {
      street: String,
      city: {
        type: String,
        required: true,
      },
      state: String,
      country: {
        type: String,
        required: true,
      },
      zipCode: String,
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    timezone: String,
    nearbyAttractions: [String],
    distanceFrom: {
      airport: {
        value: Number,
        unit: {
          type: String,
          enum: ["km", "miles"],
          default: "km",
        },
        duration: String, // e.g., "20 minutes"
      },
      cityCenter: {
        value: Number,
        unit: {
          type: String,
          enum: ["km", "miles"],
          default: "km",
        },
        duration: String,
      },
      railwayStation: {
        value: Number,
        unit: {
          type: String,
          enum: ["km", "miles"],
          default: "km",
        },
        duration: String,
      },
    },
  },
  { _id: false }
);

// Hotel Contact Schema
const ContactSchema = new Schema(
  {
    phone: [String],
    email: String,
    website: String,
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
    emergencyContact: String,
  },
  { _id: false }
);

// Hotel Policy Schema
const PolicySchema = new Schema(
  {
    checkIn: {
      time: String, // e.g., "14:00"
      earliestCheckIn: String,
      latestCheckIn: String,
    },
    checkOut: {
      time: String, // e.g., "12:00"
      lateCheckOut: {
        allowed: Boolean,
        charge: Number,
        until: String,
      },
    },
    cancellation: {
      freeCancellationUntil: String, // e.g., "48 hours before check-in"
      cancellationFee: {
        type: String,
        enum: ["percentage", "fixed", "first_night"],
      },
      feeValue: Number,
      noShowFee: Number,
    },
    children: {
      allowed: Boolean,
      ageLimit: Number,
      extraBedCharge: Number,
    },
    pets: {
      allowed: Boolean,
      charge: Number,
      restrictions: String,
    },
    smoking: {
      allowed: Boolean,
      areas: [String],
    },
    payments: {
      acceptedMethods: [String],
      creditCards: [String],
      prepaymentRequired: Boolean,
    },
  },
  { _id: false }
);

// Availability Schema
const AvailabilitySchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    roomTypeId: {
      type: String,
      required: true,
    },
    totalRooms: Number,
    availableRooms: Number,
    bookedRooms: Number,
    price: Number,
    isBlocked: {
      type: Boolean,
      default: false,
    },
    blockReason: String,
  },
  { _id: false }
);

// Hotel Images Schema
const HotelImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    altText: String,
    category: {
      type: String,
      enum: ["exterior", "lobby", "room", "restaurant", "pool", "gym", "spa", "view", "other"],
      default: "other",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    roomTypeId: String, // If image is specific to a room type
  },
  { _id: false }
);

/* ---------- Main Hotel Schema ---------- */

const HotelSchema = new Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: String,
    description: {
      type: String,
      required: true,
    },
    shortDescription: String,

    // Location
    location: {
      type: LocationSchema,
      required: true,
    },

    // Categories & Classification
    category: {
      type: String,
      enum: ["budget", "midrange", "luxury", "boutique", "resort", "business", "airport", "heritage"],
      default: "midrange",
    },
    starRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    chain: String, // Hotel chain/group name
    brand: String,

    // Contact Information
    contact: ContactSchema,

    // Amenities
    amenities: [AmenitySchema],
    popularAmenities: [String], // For quick display

    // Rooms
    roomTypes: [RoomTypeSchema],
    totalRooms: {
      type: Number,
      required: true,
    },

    // Pricing
    priceRange: {
      min: Number,
      max: Number,
      currency: String,
    },
    roomPricing: [RoomPricingSchema],

    // Policies
    policies: PolicySchema,

    // Media
    images: [HotelImageSchema],
    featuredImage: String,
    virtualTour: String,

    // Services & Facilities
    services: {
      dining: [{
        name: String,
        type: String, // restaurant, bar, cafe
        cuisine: [String],
        timing: String,
        description: String,
      }],
      spa: {
        available: Boolean,
        name: String,
        services: [String],
      },
      fitness: {
        available: Boolean,
        name: String,
        equipment: [String],
        timing: String,
      },
      pool: {
        available: Boolean,
        type: String, // indoor, outdoor, infinity
        heated: Boolean,
        timing: String,
      },
      parking: {
        available: Boolean,
        type: String, // free, paid, valet
        charge: Number,
      },
      wifi: {
        available: Boolean,
        type: String, // free, paid
        charge: Number,
        areas: [String],
      },
      businessCenter: {
        available: Boolean,
        facilities: [String],
      },
      concierge: {
        available: Boolean,
        services: [String],
      },
    },

    // Availability
    availability: [AvailabilitySchema],
    seasonalRates: [{
      season: String,
      startDate: Date,
      endDate: Date,
      multiplier: Number, // e.g., 1.2 for 20% increase
    }],

    // Booking Information
    bookingStats: {
      totalBookings: {
        type: Number,
        default: 0,
      },
      monthlyAverage: Number,
      occupancyRate: Number,
      lastUpdated: Date,
    },

    // Provider Information
    provider: {
      companyId: {
        type: Schema.Types.ObjectId,
        ref: "TravelCompany",
      },
      manager: String,
      contactPerson: String,
      commissionRate: Number,
    },

    // Status & Metadata
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "under_renovation", "temporarily_closed"],
      default: "active",
    },
    languagesSpoken: [String],
    checkInInstructions: String,
    specialOffers: [{
      title: String,
      description: String,
      code: String,
      discountType: {
        type: String,
        enum: ["percentage", "fixed", "free_night"],
      },
      discountValue: Number,
      validFrom: Date,
      validUntil: Date,
      terms: String,
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for efficient queries
HotelSchema.index({ "location.city": 1 });
HotelSchema.index({ "location.country": 1 });
HotelSchema.index({ starRating: 1 });
HotelSchema.index({ category: 1 });
HotelSchema.index({ "ratings.overall": -1 });
HotelSchema.index({ isFeatured: 1 });
HotelSchema.index({ "priceRange.min": 1, "priceRange.max": 1 });

// Virtual for calculating current price with discount
HotelSchema.virtual("currentPrice").get(function() {
  if (this.roomPricing && this.roomPricing.length > 0) {
    const basePrice = this.roomPricing[0].basePrice;
    const discount = this.roomPricing[0].discount;
    
    if (discount && discount.discountedPrice) {
      return discount.discountedPrice;
    }
    return basePrice;
  }
  return 0;
});

// Method to check availability
HotelSchema.methods.checkAvailability = function(date, roomTypeId, guests) {
  const availability = this.availability.find(
    avail => 
      avail.date.toDateString() === date.toDateString() && 
      avail.roomTypeId === roomTypeId
  );
  
  if (!availability) return false;
  
  const roomType = this.roomTypes.find(rt => rt._id.toString() === roomTypeId);
  if (!roomType) return false;
  
  // Check if room can accommodate guests
  if (guests > roomType.maxOccupancy.total) return false;
  
  return availability.availableRooms > 0;
};

// Method to update ratings when new review is added
HotelSchema.methods.updateRatings = function(newRating) {
  const ratingFields = ['overall', 'cleanliness', 'comfort', 'location', 'facilities', 'staff', 'valueForMoney'];
  
  ratingFields.forEach(field => {
    if (newRating[field]) {
      const currentTotal = this.ratings[field] * (this.ratings.totalReviews || 0);
      this.ratings[field] = (currentTotal + newRating[field]) / ((this.ratings.totalReviews || 0) + 1);
    }
  });
  
  this.ratings.totalReviews = (this.ratings.totalReviews || 0) + 1;
  
  // Update breakdown
  const star = Math.round(newRating.overall);
  if (star >= 1 && star <= 5) {
    this.ratings.breakdown[star] = (this.ratings.breakdown[star] || 0) + 1;
  }
};

const HotelModel = mongoose.model("hotel", HotelSchema);
module.exports = HotelModel;