const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../config.env" });
const fs = require("fs");
const Product = require("../model/Product");


const PORT = process.env.PORT || 5000;

const DB = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB, (err) => {
  if (err) return console.log(err);

  const products = JSON.parse(fs.readFileSync(`../products-data.json`));

  async function importData() {
    try {
      await Product.create(products);
    } catch (error) {
    }

    process.exit();
  }

  async function deleteData() {
    try {
      await Product.deleteMany();
    } catch (error) {
    }

    process.exit();
  }

  if (process.argv[2] === "import") {
    importData();
  } else if (process.argv[2] === "delete") {
    deleteData();
  }
});