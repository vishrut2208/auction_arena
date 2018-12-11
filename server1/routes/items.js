var express = require("express");
var router  = express.Router({mergeParams: true});
var Item = require("../models/item");
var middleware = require("../middleware");
var controller = require("../controllers/auctionController")
var cacheware = require("../middleware/cacheresponse").data
const multer = require('multer');
const fs = require('fs')
const path = require('path')

const mkdirSync = function (dirPath) {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}



const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        mkdirSync(path.resolve('../assets'))
        mkdirSync(path.resolve('../assets/images'))
        cb(null,"../assets/images/");
    },
    filename: function(req,file,cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({storage});
//Index- show all campgrounds
router.get("/",cacheware.cache(20), controller.getItems);

//Create - add new campground
router.post("/",middleware.isLoggedIn,upload.single('ItemImage'), controller.postItem);
//router.post("/",upload.single('ItemImage'), controller.postItem);

//new-show form to create new campground
router.get("/new",middleware.isLoggedIn, controller.newItemPage);

//get new slots
router.get("/newslots", middleware.isLoggedIn, controller.getSlot);

//get topbids

router.get("/topbids",controller.getTop5);

//show- shows more info about one item
router.get("/:id", controller.getItem);

// Destroy item route

router.post("/:id", middleware.checkCampgroundOwnership, controller.deleteItem)

router.get("/:id/getPicture", controller.getPicture)

//Edit item route

router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req, res) {
    Item.findById(req.params.id, function(err, foundItem){
        if(err){
            res.status(404);
            res.send('404: Resource Not Found');
        }
        else
            res.render("campgrounds/edit", {item: foundItem})
    });
});

//Update campground route

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    
    Item.findByIdAndUpdate(req.params.id, req.body.item, function(err, updatedItem){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
    
});

// Destroy Campground route



// router.get("/*", function(req, res){
//     res.status(404);
//     res.send('404: Resource Not Found');
//   });

module.exports = router;



