const mongoose = require("mongoose");

const brendSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique:true,
            required: [true, "Please provide a name!"],
        }
    }, {
    timestamps: true,
}
);

const Brend = mongoose.model("brend", brendSchema);

module.exports = Brend;