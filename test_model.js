try {
  const RestaurantModel = require('./src/models/restaurant.model.js');
  console.log('RestaurantModel:', !!RestaurantModel);
} catch(e) {
  console.error('Error:', e.message);
  console.error(e.stack);
}