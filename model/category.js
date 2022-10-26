const mongoose = require("mongoose");
const slugify = require('slugify');

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name!"],
        },
        parentId: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "category"
        },
        slug: {
            type: String
        },
        countOfProducts:{
            type:Number,
            default:0
        },
        photo:String,
        photoId:String
    }, {
    timestamps: true,
}
);


categorySchema.pre("save", function (next) {
    if (this.slug) {
        this.slug = slugify(this.slug);
    }
    else {
        this.slug = slugify(this.name);
    }
    next();
});


const Category = mongoose.model("category", categorySchema);

module.exports = Category;