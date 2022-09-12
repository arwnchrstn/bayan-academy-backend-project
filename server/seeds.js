const mongoose = require("mongoose");
const Listing = require("./mongodb/models/ListingModel");
const User = require("./mongodb/models/UserModel");
const flag = { listing: false };
require("dotenv").config();

mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(err);

    console.log("Connected to Mongo DB Atlas");
  }
);

Listing.insertMany([
  {
    name: "Beautiful Sunset",
    image:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    username: "mark_rover",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam aperiam neque quo rerum veniam molestias soluta velit ab officia consequuntur. Aliquam non vero nesciunt saepe modi? Nobis nostrum cumque molestiae mollitia fuga labore ipsum voluptate quod, non quo suscipit earum. Eos possimus, ea necessitatibus rem blanditiis natus ipsam eum nisi eius, in voluptate hic vero architecto vitae, tenetur nemo inventore sit saepe veritatis nobis illum officia quaerat! Adipisci, rerum dolor unde rem veniam officiis reprehenderit quos? Porro consequuntur iste, molestiae eius nihil, eligendi unde soluta, voluptatum commodi consectetur accusantium inventore neque dignissimos tempore quas corporis voluptatibus quia fuga sed reiciendis.",
    location: {
      place: "Coron, Palawan",
      lat: 11.9986,
      long: 120.2043
    },
    reviews: [
      {
        username: "anthony_jr",
        rating: 5,
        description: "Sobrang ganda ng views and maraming amenities sa resort"
      }
    ]
  },
  {
    name: "Luxury Hotel",
    image:
      "https://daydreaminginparadise.com/wp-content/uploads/2020/02/solaire-resort-casino-manila-facade-in-post-1-1024x868-1.jpg",
    username: "mark_rover",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam aperiam neque quo rerum veniam molestias soluta velit ab officia consequuntur. Aliquam non vero nesciunt saepe modi? Nobis nostrum cumque molestiae mollitia fuga labore ipsum voluptate quod, non quo suscipit earum. Eos possimus, ea necessitatibus rem blanditiis natus ipsam eum nisi eius, in voluptate hic vero architecto vitae, tenetur nemo inventore sit saepe veritatis nobis illum officia quaerat! Adipisci, rerum dolor unde rem veniam officiis reprehenderit quos? Porro consequuntur iste, molestiae eius nihil, eligendi unde soluta, voluptatum commodi consectetur accusantium inventore neque dignissimos tempore quas corporis voluptatibus quia fuga sed reiciendis.",
    location: {
      place: "Solaire Resort & Casino Manila",
      lat: 14.522185,
      long: 120.982895
    },
    reviews: [
      {
        username: "anthony_jr",
        rating: 4,
        description: "Great Service!!"
      }
    ]
  },
  {
    name: "Bungalow",
    image:
      "https://www.pinoyeplans.com/wp-content/uploads/2019/08/1-storey-house-12.jpg",
    username: "anthony_jr",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam aperiam neque quo rerum veniam molestias soluta velit ab officia consequuntur. Aliquam non vero nesciunt saepe modi? Nobis nostrum cumque molestiae mollitia fuga labore ipsum voluptate quod, non quo suscipit earum. Eos possimus, ea necessitatibus rem blanditiis natus ipsam eum nisi eius, in voluptate hic vero architecto vitae, tenetur nemo inventore sit saepe veritatis nobis illum officia quaerat! Adipisci, rerum dolor unde rem veniam officiis reprehenderit quos? Porro consequuntur iste, molestiae eius nihil, eligendi unde soluta, voluptatum commodi consectetur accusantium inventore neque dignissimos tempore quas corporis voluptatibus quia fuga sed reiciendis.",
    location: {
      place: "Tagaytay City",
      lat: 14.09532,
      long: 120.93355
    },
    reviews: [
      {
        username: "mark_rover",
        rating: 2,
        description:
          "Sira-sira ang mga pinto at mabaho ang mga CR, NEVER AGAIN!!"
      }
    ]
  },
  {
    name: "Small House for 2",
    image:
      "https://media.houseplans.co/cached_assets/images/house_plan_images/1168ESrd_900x600.jpg",
    username: "anthony_jr",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam aperiam neque quo rerum veniam molestias soluta velit ab officia consequuntur. Aliquam non vero nesciunt saepe modi? Nobis nostrum cumque molestiae mollitia fuga labore ipsum voluptate quod, non quo suscipit earum. Eos possimus, ea necessitatibus rem blanditiis natus ipsam eum nisi eius, in voluptate hic vero architecto vitae, tenetur nemo inventore sit saepe veritatis nobis illum officia quaerat! Adipisci, rerum dolor unde rem veniam officiis reprehenderit quos? Porro consequuntur iste, molestiae eius nihil, eligendi unde soluta, voluptatum commodi consectetur accusantium inventore neque dignissimos tempore quas corporis voluptatibus quia fuga sed reiciendis.",
    location: {
      place: "Angono, Rizal",
      lat: 14.5266,
      long: 121.1536
    },
    reviews: [
      {
        username: "mark_rover",
        rating: 5,
        description:
          "We love it ng asawa ko, sobrang ganda ng design ng house!!"
      }
    ]
  }
])
  .then(
    (res) => (
      console.log(res, "Seeding successful for listings"), (flag.listing = true)
    )
  )
  .then((err) => console.log(err));

User.insertMany([
  {
    username: "mark_rover",
    password: "mark123"
  },
  {
    username: "anthony_jr",
    password: "anton123"
  }
])
  .then(
    (res) => (
      console.log(res, "Seeding successful for users"),
      flag.listing && process.exit(1)
    )
  )
  .then((err) => console.log(err));
