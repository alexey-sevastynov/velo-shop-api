const Bicycle = require("../models/Bicycle");

const ITEMS_PER_PAGE = 9;

const getBicycles = async (req, res) => {
  const page = req.query.page || 1;

  // put all your query params in here
  const query = {};

  try {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const countPromise = Bicycle.estimatedDocumentCount(query);
    const postsPromise = Bicycle.find(query)
      .limit(ITEMS_PER_PAGE)
      .skip(skip)
      .populate("user")
      .exec(); // find all-Object information about user

    const [count, posts] = await Promise.all([countPromise, postsPromise]);
    const pageCount = count / ITEMS_PER_PAGE;
    res.json({
      pagination: {
        count,
        pageCount,
      },
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to find items" });
  }
};

const getOneBicycle = async (req, res) => {
  try {
    const postId = req.params.id;

    Bicycle.findOneAndUpdate({ _id: postId })
      .populate("user")
      .then((doc) => res.json(doc))
      .catch((err) =>
        res.status(500).json({ message: "failed to find items" })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to find items" });
  }
};

const removeOneBicycle = async (req, res) => {
  try {
    const postId = req.params.id;

    Bicycle.findOneAndDelete({ _id: postId })
      .then((doc) => res.json(doc))
      .catch((err) =>
        res.status(500).json({ message: "failed to delete item" })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to delete item" });
  }
};

const create = async (req, res) => {
  try {
    const doc = new Bicycle({
      fullName: req.body.fullName,
      category: req.body.category,
      novelty: req.body.novelty,
      manufacturer: req.body.manufacturer,
      article: req.body.article,
      image: req.body.image,
      availability: req.body.availability,
      price: req.body.price,
      priceSale: req.body.priceSale,
      size: req.body.size,
      color: req.body.color,
      description: req.body.description,
      year: req.body.year,
      diameter: req.body.diameter,
      material: req.body.material,

      tires: req.body.tires,
      frame: req.body.frame,
      saddle: req.body.saddle,
      seatpost: req.body.seatpost,
      fork: req.body.fork,
      chain: req.body.chain,
      brake: req.body.brake,
      speed: req.body.speed,
      garantine: req.body.garantine,

      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to create item" });
  }
};

const updateOneBicycle = async (req, res) => {
  try {
    const postId = req.params.id;

    Bicycle.updateOne(
      { _id: postId },
      {
        fullName: req.body.fullName,
        category: req.body.category,
        novelty: req.body.novelty,
        manufacturer: req.body.manufacturer,
        article: req.body.article,
        image: req.body.image,
        availability: req.body.availability,
        price: req.body.price,
        priceSale: req.body.priceSale,
        size: req.body.size,
        color: req.body.color,
        description: req.body.description,
        year: req.body.year,
        diameter: req.body.diameter,
        material: req.body.material,

        tires: req.body.tires,
        frame: req.body.frame,
        saddle: req.body.saddle,
        seatpost: req.body.seatpost,
        fork: req.body.fork,
        chain: req.body.chain,
        brake: req.body.brake,
        speed: req.body.speed,
        garantine: req.body.garantine,

        user: req.userId,
      }
    )
      .then((doc) => res.json(doc))
      .catch((err) =>
        res.status(500).json({ message: "failed to update item" })
      );

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to update item" });
  }
};

module.exports = {
  create,
  getBicycles,
  getOneBicycle,
  removeOneBicycle,
  updateOneBicycle,
};
