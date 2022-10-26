const mongoose = require("mongoose");

const variantSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name!"],
        },
        values: {
            type: [String],
            required: [true, "Please provide values!"],
        }
    }, {
    timestamps: true,
}
);

const Variant = mongoose.model("variant", variantSchema);

module.exports = Variant;