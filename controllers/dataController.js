const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const Account = require("../model/database/Account");
const User = require("../model/database/User");
const Category = require("../model/database/Category");
const Product = require("../model/database/Product");
const Voucher = require("../model/database/Voucher");
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
        fullName: "Customer",
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

// Data Vouchers
exports.vouchers = asyncMiddleware(async(req, res, next) => {
    const vouchers1 = new Voucher({
        voucher_name: "Event 30/4 & 1/5",
        voucher_desc: ".....",
        discount: 0.1,
        code: "30T4A1T5",
        type: "Percent",
        startDate: "2021-04-30T09:00:00.000Z",
        endDate: "2021-05-01T09:00:00.000Z",
        image: "https://i.imgur.com/eblSaaD.jpg",
    });
    const vouchers2 = new Voucher({
        voucher_name: "Event 2/9",
        voucher_desc: ".....",
        discount: 0.3,
        code: "MUNGQK29",
        type: "Percent",
        startDate: "2021-08-30T09:00:00.000Z",
        endDate: "2021-09-02T09:00:00.000Z",
        image: "https://i.imgur.com/YnQK7Fd.jpg",
    });
    const vouchers3 = new Voucher({
        voucher_name: "Event Black Friday 26/11",
        voucher_desc: ".....",
        discount: 26.11,
        code: "EBFD2611",
        type: "Money",
        startDate: "2021-11-25T09:00:00.000Z",
        endDate: "2021-11-27T09:00:00.000Z",
        image: "https://i.imgur.com/gWQxZbU.jpg",
    });
    const vouchers4 = new Voucher({
        voucher_name: "Event Merry Christmas",
        voucher_desc: ".....",
        discount: 25.12,
        code: "EMCM2512",
        type: "Money",
        startDate: "2021-12-24T09:00:00.000Z",
        endDate: "2021-12-26T09:00:00.000Z",
        image: "https://i.imgur.com/ByVD7py.jpg",
    });

    await vouchers1.save();
    await vouchers2.save();
    await vouchers3.save();
    await vouchers4.save();
    // return res
    //     .status(201)
    //     .json(new SuccessResponse(201, "Created vouchers successfully. =_="));
});

// Data Product
exports.products = asyncMiddleware(async(req, res, next) => {
    const product1 = new Product({
        name: "Quần Dài Jean Slimfit Đơn Giản M4",
        price: 18.7,
        quantity: 100,
        description: "Chất liệu: Jean Cotton \nThành phần: 78% cotton 21% recycle poly 1% spandex \nTính Năng Cân Bằng Nhiệt Độ",
        category: "Jeans",
        sku: "J0020207",
        image: "https://imgur.com/XCvL9Xo.jpg",
        listImage: [
            "https://i.imgur.com/4LDr6NG.jpg",
            "https://i.imgur.com/GuDDuwr.jpg",
            "https://i.imgur.com/sKvfzAD.jpg",
        ],
    });
    const product2 = new Product({
        name: "Quần Dài Jean Slimfit Đơn Giản B19",
        price: 18.7,
        quantity: 100,
        description: "Chất liệu: Jean Cotton \nThành phần: 98% cotton 2% spandex",
        category: "Jeans",
        sku: "J0019174",
        image: "https://imgur.com/NkM2kYo.jpg",
        listImage: [
            "https://i.imgur.com/01sIL8Q.jpg",
            "https://i.imgur.com/HguNkcg.jpg",
            "https://i.imgur.com/3gflEPq.jpg",
            "https://i.imgur.com/6TV28rz.jpg",
            "https://i.imgur.com/aPGcVu2.jpg",
            "https://i.imgur.com/rRhs6xJ.jpg",
        ],
    });
    const product3 = new Product({
        name: "Sơ Mi Tay Ngắn Y Nguyên Bản 18- Summer Ver2",
        price: 9.9,
        quantity: 100,
        description: "Chất liệu: Vải dù - in chuyển nhiệt \nThành phần: 100% poly",
        category: "T-Shirt",
        sku: "TS0020246",
        image: "https://imgur.com/fsCPzxU.jpg",
        listImage: [
            "https://i.imgur.com/r3Fvzuw.jpg",
            "https://i.imgur.com/L7rNeIQ.jpg",
            "https://i.imgur.com/YQHrhaJ.jpg",
            "https://i.imgur.com/aAa74S4.jpg",
            "https://i.imgur.com/1qDRMtW.jpg",
            "https://i.imgur.com/eWyO9nT.jpg",
            "https://i.imgur.com/UWTRHL6.jpg",
            "https://i.imgur.com/zeBy2Vu.jpg",
            "https://i.imgur.com/Yuvh2QU.jpg",
            "https://i.imgur.com/l7lgar3.jpg",
        ],
    });
    const product4 = new Product({
        name: "Quần Dài Jean Slimfit Đơn Giản B35",
        price: 18.7,
        quantity: 100,
        description: "Chất liệu: Jean Cotton \nThành phần: 98% cotton 2% spandex",
        category: "Jeans",
        sku: "J0019585",
        image: "https://imgur.com/Q827jxx.jpg",
        listImage: [
            "https://i.imgur.com/afVZFWn.jpg",
            "https://i.imgur.com/4LuLyho.jpg",
            "https://i.imgur.com/0yjZoFd.jpg",
            "https://i.imgur.com/JfQuYcK.jpg",
            "https://i.imgur.com/J4rJCIy.jpg",
            "https://i.imgur.com/rRhs6xJ.jpg",
        ],
    });
    const product5 = new Product({
        name: "PKTT Nón Đơn Giản A21",
        price: 5.28,
        quantity: 100,
        description: "Chất liệu: Kaki \nThành phần: 100% cotto \n",
        category: "Hat",
        sku: "H0019689",
        image: "https://imgur.com/LOfyrVk.jpg",
        listImage: [
            "https://i.imgur.com/aYaT8bq.jpg",
            "https://i.imgur.com/oOQMeUp.jpg",
            "https://i.imgur.com/NxM4J4C.jpg",
        ],
    });
    const product6 = new Product({
        name: "PKTT Nón Đặc Biệt A16",
        price: 6.6,
        quantity: 100,
        description: "Chất liệu: Kaki \nThành phần: 100% cotto \n",
        category: "Hat",
        sku: "H0019519",
        image: "https://imgur.com/eKaV0XK.jpg",
        listImage: [
            "https://i.imgur.com/0hBGWca.jpg",
            "https://i.imgur.com/S1LUfp6.jpg",
            "https://i.imgur.com/CrEW7yF.jpg",
            "https://i.imgur.com/IFeYJIV.jpg",
        ],
    });

    await product1.save();
    await product2.save();
    await product3.save();
    await product4.save();
    await product5.save();
    await product6.save();
    return res
        .status(201)
        .json(new SuccessResponse(201, "Created product successfully. =_="));
});

// Data Product2
exports.products2 = asyncMiddleware(async(req, res, next) => {
    // category: Hat: 10,Shirt:7,Coat:5,T-Shirt:10,Jeans:10
    const product10 = new Product({
        name: "Quần Dài Jean Slimfit Đơn Giản M4",
        price: 18.7,
        quantity: 100,
        description: "Chất liệu: Jean Cotton \nThành phần: 78% cotton 21% recycle poly 1% spandex \nTính Năng Cân Bằng Nhiệt Độ",
        category: "Jeans",
        sku: "J0020207",
        image: "https://i.imgur.com/3GnfM54.jpg",
        listImage: [
            "https://i.imgur.com/4LDr6NG.jpg",
            "https://i.imgur.com/GuDDuwr.jpg",
            "https://i.imgur.com/sKvfzAD.jpg",
        ],
    });

    return res
        .status(201)
        .json(new SuccessResponse(201, "Created product successfully. =_="));
});

// Data
exports.data = asyncMiddleware(async(req, res, next) => {
    this.categories();
    this.user();
    this.vouchers();
    return res
        .status(201)
        .json(new SuccessResponse(201, "Created database successfully. =_="));
});