const mongoose = require("mongoose");
const { Schema } = mongoose;

/* ---------- Sub Schemas ---------- */

// Menu Item Schema
const MenuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    category: {
      type: String,
      enum: ["appetizer", "main_course", "dessert", "beverage", "side", "specialty"],
      required: true,
    },
    subCategory: String, // e.g., "soup", "pasta", "steak"
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    isVegetarian: {
      type: Boolean,
      default: false,
    },
    isVegan: {
      type: Boolean,
      default: false,
    },
    isGlutenFree: {
      type: Boolean,
      default: false,
    },
    isSpicy: {
      type: Boolean,
      default: false,
    },
    spiceLevel: {
      type: Number,
      min: 1,
      max: 5,
    },
    allergens: [String],
    ingredients: [String],
    preparationTime: Number, // in minutes
    chefRecommendation: {
      type: Boolean,
      default: false,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    images: [String],
  },
  { _id: false }
);

// Restaurant Hours Schema
const OperatingHoursSchema = new Schema(
  {
    day: {
      type: String,
      enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    openingTime: String, // e.g., "11:00"
    closingTime: String, // e.g., "23:00"
    breakStart: String,
    breakEnd: String,
    specialNotes: String,
  },
  { _id: false }
);

// Table Schema
const TableSchema = new Schema(
  {
    tableNumber: {
      type: String,
      required: true,
    },
    tableType: {
      type: String,
      enum: ["indoor", "outdoor", "private", "bar", "booth", "family"],
      default: "indoor",
    },
    capacity: {
      min: {
        type: Number,
        default: 2,
      },
      max: {
        type: Number,
        required: true,
      },
      recommended: Number,
    },
    location: {
      section: String, // e.g., "window", "center", "corner"
      floor: Number,
      hasView: Boolean,
      viewDescription: String,
    },
    amenities: [String], // e.g., "power_outlet", "privacy_screen"
    isWheelchairAccessible: {
      type: Boolean,
      default: false,
    },
    isSmoking: {
      type: Boolean,
      default: false,
    },
    basePrice: Number, // For special tables
    images: [String],
  },
  { _id: false }
);

// Cuisine Type Schema
const CuisineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    region: String,
  },
  { _id: false }
);

// Feature/Amenity Schema
const FeatureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: String,
    description: String,
    category: {
      type: String,
      enum: ["dining", "entertainment", "accessibility", "services", "facilities"],
      default: "dining",
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
      neighborhood: String, // e.g., "Downtown", "West End"
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    parking: {
      available: Boolean,
      type: String, // street, valet, lot, garage
      charge: Number,
      details: String,
    },
    publicTransport: [{
      type: String, // metro, bus, train
      station: String,
      distance: String,
    }],
  },
  { _id: false }
);

// Contact Schema
const ContactSchema = new Schema(
  {
    phone: [String],
    email: String,
    website: String,
    reservationPhone: String,
    reservationEmail: String,
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
      tripadvisor: String,
    },
  },
  { _id: false }
);

// Restaurant Image Schema
const RestaurantImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    altText: String,
    category: {
      type: String,
      enum: ["interior", "exterior", "food", "drinks", "ambiance", "events", "chef", "menu"],
      default: "interior",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

// Availability Slot Schema (for reservations)
const AvailabilitySlotSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true, // e.g., "18:00", "18:30"
    },
    tableType: String,
    capacity: Number,
    availableTables: Number,
    isPeakHour: {
      type: Boolean,
      default: false,
    },
    peakSurcharge: Number,
    isBlocked: {
      type: Boolean,
      default: false,
    },
    blockReason: String,
  },
  { _id: false }
);

// Pricing Tier Schema
const PricingTierSchema = new Schema(
  {
    name: {
      type: String,
      enum: ["budget", "moderate", "expensive", "luxury"],
      required: true,
    },
    symbol: {
      type: String,
      default: "$",
    },
    description: String,
    averagePricePerPerson: Number,
  },
  { _id: false }
);

/* ---------- Main Restaurant Schema ---------- */

const RestaurantSchema = new Schema(
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
    story: String, // Restaurant history/story

    // Location
    location: {
      type: LocationSchema,
      required: true,
    },

    // Cuisine & Type
    cuisineType: [CuisineSchema],
    primaryCuisine: String,
    restaurantType: {
      type: String,
      enum: ["fine_dining", "casual_dining", "fast_casual", "cafe", "bistro", "buffet", "food_truck", "popup"],
      default: "casual_dining",
    },
    priceTier: PricingTierSchema,

    // Contact Information
    contact: ContactSchema,

    // Operating Hours
    operatingHours: [OperatingHoursSchema],
    specialHours: [{
      date: Date,
      openingTime: String,
      closingTime: String,
      reason: String,
    }],

    // Tables & Capacity
    tables: [TableSchema],
    totalCapacity: Number,
    privateDiningRooms: [{
      name: String,
      capacity: Number,
      amenities: [String],
      minimumSpend: Number,
      images: [String],
    }],

    // Menu
    menu: {
      categories: [{
        name: String,
        description: String,
        items: [MenuItemSchema],
      }],
      seasonalItems: [MenuItemSchema],
      tastingMenus: [{
        name: String,
        description: String,
        price: Number,
        courses: Number,
        items: [String],
        winePairing: {
          available: Boolean,
          price: Number,
        },
      }],
      drinkMenu: {
        wines: [MenuItemSchema],
        cocktails: [MenuItemSchema],
        beers: [MenuItemSchema],
        nonAlcoholic: [MenuItemSchema],
      },
      lastUpdated: Date,
    },

    // Features & Amenities
    features: [FeatureSchema],
    amenities: [String], // For quick display

    // Chef Information
    chef: {
      name: String,
      bio: String,
      image: String,
      accolades: [String],
      yearsOfExperience: Number,
      signatureDishes: [String],
    },
    
    // Media
    images: [RestaurantImageSchema],
    featuredImage: String,
    virtualTour: String,
    videoTour: String,

    // Events & Specials
    events: [{
      name: String,
      description: String,
      date: Date,
      time: String,
      price: Number,
      includes: [String],
      reservationRequired: Boolean,
    }],
    happyHour: {
      available: Boolean,
      days: [String],
      startTime: String,
      endTime: String,
      offers: [String],
    },
    specialOffers: [{
      title: String,
      description: String,
      code: String,
      discountType: {
        type: String,
        enum: ["percentage", "fixed", "free_item"],
      },
      discountValue: Number,
      validDays: [String],
      validTime: String,
      terms: String,
      validFrom: Date,
      validUntil: Date,
    }],

    // Reservation Policy
    reservationPolicy: {
      advanceBookingDays: Number,
      depositRequired: {
        type: Boolean,
        default: false,
      },
      depositAmount: Number,
      depositRefundable: Boolean,
      cancellationHours: Number,
      cancellationFee: Number,
      groupSizeLimit: Number,
      waitingList: {
        available: Boolean,
        maxWaitTime: Number,
      },
      walkInsAccepted: {
        type: Boolean,
        default: true,
      },
    },

    // Dietary Options
    dietaryOptions: {
      vegetarian: Boolean,
      vegan: Boolean,
      glutenFree: Boolean,
      halal: Boolean,
      kosher: Boolean,
      dairyFree: Boolean,
      nutFree: Boolean,
    },

    // Services
    services: {
      takeout: Boolean,
      delivery: Boolean,
      catering: Boolean,
      privateEvents: Boolean,
      cookingClasses: Boolean,
      wineTasting: Boolean,
      valetParking: Boolean,
      wheelchairAccessible: Boolean,
      wifi: Boolean,
      kidsMenu: Boolean,
      petFriendly: Boolean,
    },

    // Dress Code
    dressCode: {
      type: String,
      enum: ["casual", "smart_casual", "business_casual", "formal", "black_tie"],
      default: "casual",
    },
    dressCodeDescription: String,

    // Payment Methods
    paymentMethods: [String],

    // Availability
    availability: [AvailabilitySlotSchema],
    peakHours: [{
      day: String,
      startTime: String,
      endTime: String,
      surcharge: Number,
    }],

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
      enum: ["active", "inactive", "temporarily_closed", "permanently_closed"],
      default: "active",
    },
    languagesSpoken: [String],
    minimumAge: Number, // For alcohol service
    smokingPolicy: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for efficient queries
RestaurantSchema.index({ "location.city": 1 });
RestaurantSchema.index({ "location.country": 1 });
RestaurantSchema.index({ primaryCuisine: 1 });
RestaurantSchema.index({ restaurantType: 1 });
RestaurantSchema.index({ "ratings.overall": -1 });
RestaurantSchema.index({ isFeatured: 1 });
RestaurantSchema.index({ "priceTier.name": 1 });
RestaurantSchema.index({ "cuisineType.name": 1 });

// Virtual for average price per person
RestaurantSchema.virtual("avgPricePerPerson").get(function() {
  if (this.menu && this.menu.categories) {
    const allItems = this.menu.categories.flatMap(cat => cat.items);
    if (allItems.length > 0) {
      const total = allItems.reduce((sum, item) => sum + item.price, 0);
      return Math.round(total / allItems.length);
    }
  }
  return 0;
});

// Virtual for today's operating hours
RestaurantSchema.virtual("todayHours").get(function() {
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const today = days[new Date().getDay()];
  return this.operatingHours.find(hours => hours.day === today);
});

// Method to check table availability
RestaurantSchema.methods.checkAvailability = function(date, time, partySize) {
  const dateObj = new Date(date);
  const slot = this.availability.find(
    avail => 
      avail.date.toDateString() === dateObj.toDateString() &&
      avail.timeSlot === time &&
      avail.capacity >= partySize &&
      avail.availableTables > 0
  );
  
  return slot ? true : false;
};
  
const RestaurantModel = mongoose.model("restaurant", RestaurantSchema, "restaurant");
module.exports = RestaurantModel;