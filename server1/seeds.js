var mongoose = require("mongoose");
var Item = require("./models/item");
var Comment    = require("./models/comment");
var Bid = require("./models/bid");
var User = require("./models/user");
var admin = require("./models/adminpost")
var slot = require("./models/slotTable")
var data = [
    {
        name: "Cloud's Rest",
        image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f9c978a3e9b0b0_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas gravida dui quis lacus varius, id tempus arcu condimentum. Nam et condimentum quam, non ultricies purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc at maximus velit. Duis vestibulum purus eu nulla vehicula, vel dignissim leo feugiat. Aenean molestie consequat justo sit amet maximus. Donec tempor tempus eros et scelerisque. Etiam quis magna id neque porttitor blandit sit amet ac mauris. Suspendisse tincidunt nulla id lacus varius, a maximus lacus eleifend. Ut nisl erat, lacinia vel maximus nec, tristique vitae enim. Vestibulum id viverra magna. Sed id cursus augue."
    },  
    
    {
        name: "Desert Mesa",
        image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f9c978a3e9b0b0_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas gravida dui quis lacus varius, id tempus arcu condimentum. Nam et condimentum quam, non ultricies purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc at maximus velit. Duis vestibulum purus eu nulla vehicula, vel dignissim leo feugiat. Aenean molestie consequat justo sit amet maximus. Donec tempor tempus eros et scelerisque. Etiam quis magna id neque porttitor blandit sit amet ac mauris. Suspendisse tincidunt nulla id lacus varius, a maximus lacus eleifend. Ut nisl erat, lacinia vel maximus nec, tristique vitae enim. Vestibulum id viverra magna. Sed id cursus augue."
    },
    
    {
        name: "Canyon floor",
        image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f9c978a3e9b0b0_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas gravida dui quis lacus varius, id tempus arcu condimentum. Nam et condimentum quam, non ultricies purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc at maximus velit. Duis vestibulum purus eu nulla vehicula, vel dignissim leo feugiat. Aenean molestie consequat justo sit amet maximus. Donec tempor tempus eros et scelerisque. Etiam quis magna id neque porttitor blandit sit amet ac mauris. Suspendisse tincidunt nulla id lacus varius, a maximus lacus eleifend. Ut nisl erat, lacinia vel maximus nec, tristique vitae enim. Vestibulum id viverra magna. Sed id cursus augue."
    } 
]

function seedDB(){
    
    //Remove all campgrounds
    Item.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        // data.forEach(function(seed){
        // Item.create(seed, function(err, item){
        //     if(err){
        //          console.log(err);
        //     }else{
        //         console.log("added a campground"); 
        //         //create a comment
        //         Comment.create(
        //             {
        //                 text: "this place is great",
        //                 author: "Me"
        //             }, function(err, comment){
        //                 if(err){
        //                     console.log(err)
        //                 }else{
        //                     item.comments.push(comment);
        //                     item.save();
        //                     console.log("created new comments");
        //                 }
        //             });
                
        //     }
        //  }); 
    //});
});

Bid.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed bids!");
        
});

Comment.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed comments!");
        
});

User.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed Users!");

});

admin.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed setup!");
        
});

    slot.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed setup!");

    });


    //add a few campgrounds
    
    
}

module.exports = seedDB;