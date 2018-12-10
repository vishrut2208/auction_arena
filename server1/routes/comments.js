var express = require("express");
var router = express.Router({mergeParams: true});
var Item = require("../models/item");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var cacheware = require("../middleware/cacheresponse").data

// Comments New

router.get("/new", middleware.isLoggedIn, function(req, res) {
   //find campground by id
   try{
   Item.findById(req.params.id, function(err, item){
      if(err){
          console.log(err);
          res.status(404);
        res.send('404: Resource Not Found');
      } else{
          res.render("comments/new", {item: item});
      }
   });
}
catch(err){
    res.status(500);
            res.send('500: Internal server error');
}
   
});

//Comments Create

router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup campground using id
   try{
   Item.findById(req.params.id, function(err, item) {
      if(err){
          console.log(err)
          res.redirect("/campgrounds");
      }else{
          Comment.create(req.body.comment, function(err, comment){
              if(err){
                  req.flash("error", "Something went wrong");
                  console.log(err);
                  res.send('500: Internal server error');
              }else{
                  //add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //save comment
                  comment.save();
                  item.comments.push(comment);
                  item.save();
                  req.flash("success", "Successfully added comment");
                  res.status(200);
                  res.redirect('/campgrounds/' + item._id);
              }
          });
      } 
   });
}
   catch(err){
    res.status(500);
            res.send('500: Internal server error');
}
});

// Comment edit route
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
    try{

    
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        }else{
            res.status(200)
             res.render("comments/edit", {item_id: req.params.id, comment: foundComment});
        }
    });
}
    catch(err){
        res.status(500);
                res.send('500: Internal server error');
    }
});

//Comment update
router.put("/:comment_id", middleware.checkCommentOwnership,function(req, res){
    try{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
}
    catch(err){
        res.status(500);
                res.send('500: Internal server error');
    }
});

//Comment destroy 

router.delete("/:comment_id",middleware.checkCommentOwnership ,function(req, res){
    try{
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });  
}
    catch(err){
        res.status(500);
                res.send('500: Internal server error');
    }  
});

module.exports = router;
