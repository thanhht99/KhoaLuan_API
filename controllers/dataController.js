const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const Account = require("../model/database/Account");
const User = require("../model/database/User");
const Category = require("../model/database/Category");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const mongoUpload = require("../middleware/mongoUpload");

// Data user
exports.user = asyncMiddleware(async(req, res, next) => {
    const account1 = new Account({
        userName: "admin123",
        email: "clothes.store.at99@gmail.com",
        password: "123456",
        role: "Admin",
        isActive: true,
    });
    const user1 = new User({
        userAccount: account1._id,
        fullName: "Admin",
        email: "clothes.store.at99@gmail.com",
        phone: "0367662607",
        isAcc: true,
        dayOfBirth: "07-26-1999",
        gender: "Male",
    });
    const account2 = new Account({
        userName: "saler123",
        email: "tienthanh26071999@gmail.com",
        password: "123456",
        role: "Saler",
        isActive: true,
    });
    const user2 = new User({
        userAccount: account2._id,
        fullName: "Saler",
        email: "tienthanh26071999@gmail.com",
        phone: "0367662607",
        isAcc: true,
        dayOfBirth: "06-14-1999",
        gender: "Male",
    });
    const account3 = new Account({
        userName: "cus123",
        email: "anhruemngu123@gmail.com",
        password: "123456",
        isActive: true,
    });
    const user3 = new User({
        userAccount: account3._id,
        fullName: "Saler",
        email: "anhruemngu123@gmail.com",
        phone: "0367662607",
        isAcc: true,
        dayOfBirth: "06-14-1999",
        gender: "Male",
    });
    await account1.save();
    await user1.save();
    await account2.save();
    await user2.save();
    await account3.save();
    await user3.save();
    // return res
    //     .status(201)
    //     .json(new SuccessResponse(201, "Created user successfully. =_="));
});

// Data Category
exports.categories = asyncMiddleware(async(req, res, next) => {
    const category1 = new Category({
        category_name: "Hat",
        category_desc: ".....",
    });
    const category2 = new Category({
        category_name: "Shirt",
        category_desc: ".....",
    });
    const category3 = new Category({
        category_name: "Coat",
        category_desc: ".....",
    });
    const category4 = new Category({
        category_name: "T-Shirt",
        category_desc: ".....",
    });
    const category5 = new Category({
        category_name: "Jeans",
        category_desc: ".....",
    });
    await category1.save();
    await category2.save();
    await category3.save();
    await category4.save();
    await category5.save();
    // return res
    //     .status(201)
    //     .json(new SuccessResponse(201, "Created categories successfully. =_="));
});

// Data
exports.data = asyncMiddleware(async(req, res, next) => {
    this.categories();
    this.user();
    return res
        .status(201)
        .json(new SuccessResponse(201, "Created database successfully. =_="));
});