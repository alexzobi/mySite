const router = require("express").Router();
const Hotel = require("../models").Hotel;
const Restaurant = require("../models").Restaurant;
const Activity = require("../models").Activity;
const Itinerary = require("../models").Itinerary;

router.get("/", (req, res, next) => {
  Promise.all([
    Hotel.findAll({ include: [{ all: true }] }),
    Restaurant.findAll({ include: [{ all: true }] }),
    Activity.findAll({ include: [{ all: true }] })
  ])
    .then(([hotels, restaurants, activities]) => {
      res.json({
        hotels,
        restaurants,
        activities
      });
    })
    .catch(next);
});

router.get('/itineraries/:id', (req, res, next) => {
  Itinerary.findById(req.params.id, {
    include: {all: true, nested: true}
  })
  .then(itinerary => res.json(itinerary))
  .catch(next);
});

router.post('/itineraries', (req, res, next) => {
  // req.body
  /*
  [{
    id: 1,
    category: 'hotels'
  }, ...]
  */
  Itinerary.create({})
  .then(itinerary => {
    const hotelIds = [];
    const restaurantIds = [];
    const activityIds = [];
    req.body.forEach((elem) => {
      if (elem.category === 'hotels') {
        hotelIds.push(elem.id);
      } else if (elem.category === 'restaurants') {
        restaurantIds.push(elem.id);
      } else if (elem.category === 'activities') {
        activityIds.push(elem.id);
      }
    });
    return Promise.all([
      itinerary.setHotels(hotelIds),
      itinerary.setRestaurants(restaurantIds),
      itinerary.setActivities(activityIds)
    ]);
  })
  .then(() => res.sendStatus(201))
  .catch(next);
});

module.exports = router;
