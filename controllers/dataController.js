const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const Account = require("../model/database/Account");
const User = require("../model/database/User");
const Category = require("../model/database/Category");
const Product = require("../model/database/Product");
const Voucher = require("../model/database/Voucher");
const Promotion = require("../model/database/Promotion");
const Order = require("../model/database/Order");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const mongoUpload = require("../middleware/mongoUpload");

// Data user
exports.user = asyncMiddleware(async(req, res, next) => {
    // Admin: 4 & saler: 4
    // Customer: 10

    // Admin
    const account1 = new Account({
        userName: "admin001",
        email: "admin001@gmail.com",
        password: "123456",
        role: "Admin",
        isActive: true,
    });
    const user1 = new User({
        userAccount: account1._id,
        fullName: "Admin 001",
        email: "admin001@gmail.com",
        phone: "0367662607",
        isAcc: true,
        dayOfBirth: "07-26-1999",
        gender: "Male",
    });

    const account2 = new Account({
        userName: "admin002",
        email: "admin002@gmail.com",
        password: "123456",
        role: "Admin",
        isActive: true,
    });
    const user2 = new User({
        userAccount: account2._id,
        fullName: "Admin 002",
        email: "admin002@gmail.com",
        phone: "0367669999",
        isAcc: true,
        dayOfBirth: "06-14-1999",
        gender: "Male",
    });

    const account3 = new Account({
        userName: "admin003",
        email: "admin003@gmail.com",
        password: "123456",
        role: "Admin",
        isActive: true,
    });
    const user3 = new User({
        userAccount: account3._id,
        fullName: "Admin 003",
        email: "admin003@gmail.com",
        phone: "0367668899",
        isAcc: true,
        dayOfBirth: "08-08-1995",
        gender: "Female",
    });

    const account4 = new Account({
        userName: "admin004",
        email: "admin004@gmail.com",
        password: "123456",
        role: "Admin",
        isActive: true,
    });
    const user4 = new User({
        userAccount: account4._id,
        fullName: "Admin 004",
        email: "admin004@gmail.com",
        phone: "0367661028",
        isAcc: true,
        dayOfBirth: "03-08-1998",
        gender: "Female",
    });

    //********************************************************************** */

    // Saler
    const account5 = new Account({
        userName: "saler005",
        email: "saler005@gmail.com",
        password: "123456",
        role: "Saler",
        isActive: true,
    });
    const user5 = new User({
        userAccount: account5._id,
        fullName: "Saler 005",
        email: "saler005@gmail.com",
        phone: "0367662607",
        isAcc: true,
        dayOfBirth: "06-14-1999",
        gender: "Male",
    });

    const account6 = new Account({
        userName: "saler006",
        email: "saler006@gmail.com",
        password: "123456",
        role: "Saler",
        isActive: true,
    });
    const user6 = new User({
        userAccount: account6._id,
        fullName: "Saler 006",
        email: "saler006@gmail.com",
        phone: "0367662333",
        isAcc: true,
        dayOfBirth: "02-20-1997",
        gender: "Male",
    });

    const account7 = new Account({
        userName: "saler007",
        email: "saler007@gmail.com",
        password: "123456",
        role: "Saler",
        isActive: true,
    });
    const user7 = new User({
        userAccount: account7._id,
        fullName: "Saler 007",
        email: "saler007@gmail.com",
        phone: "0367234333",
        isAcc: true,
        dayOfBirth: "05-09-1998",
        gender: "Female",
    });

    const account8 = new Account({
        userName: "saler008",
        email: "saler008@gmail.com",
        password: "123456",
        role: "Saler",
        isActive: true,
    });
    const user8 = new User({
        userAccount: account8._id,
        fullName: "Saler 008",
        email: "saler008@gmail.com",
        phone: "0367234098",
        isAcc: true,
        dayOfBirth: "05-19-1998",
        gender: "Female",
    });

    //********************************************************************** */

    // Customer
    const account9 = new Account({
        userName: "cus009",
        email: "cus009@gmail.com",
        password: "123456",
        isActive: true,
    });
    const user9 = new User({
        userAccount: account9._id,
        fullName: "Customer 009",
        email: "cus009@gmail.com",
        phone: "0366662607",
        isAcc: true,
        dayOfBirth: "07-15-1999",
        gender: "Male",
    });

    const account10 = new Account({
        userName: "cus0010",
        email: "cus0010@gmail.com",
        password: "123456",
        isActive: true,
    });
    const user10 = new User({
        userAccount: account10._id,
        fullName: "Customer 0010",
        email: "cus0010@gmail.com",
        phone: "0367662608",
        isAcc: true,
        dayOfBirth: "07-16-1999",
        gender: "Male",
    });

    const account11 = new Account({
        userName: "cus0011",
        email: "cus0011@gmail.com",
        password: "123456",
        isActive: true,
    });
    const user11 = new User({
        userAccount: account11._id,
        fullName: "Customer 0011",
        email: "cus0011@gmail.com",
        phone: "0987662607",
        isAcc: true,
        dayOfBirth: "08-17-1999",
        gender: "Male",
    });

    const account12 = new Account({
        userName: "cus0012",
        email: "cus0012@gmail.com",
        password: "123456",
        isActive: true,
    });
    const user12 = new User({
        userAccount: account12._id,
        fullName: "Customer 0012",
        email: "cus0012@gmail.com",
        phone: "0988962607",
        isAcc: true,
        dayOfBirth: "09-18-1999",
        gender: "Male",
    });

    const account13 = new Account({
        userName: "cus0013",
        email: "cus0013@gmail.com",
        password: "123456",
        isActive: true,
    });
    const user13 = new User({
        userAccount: account13._id,
        fullName: "Customer 0013",
        email: "cus0013@gmail.com",
        phone: "0980892607",
        isAcc: true,
        dayOfBirth: "10-19-1999",
        gender: "Male",
    });

    const account14 = new Account({
        userName: "cus0014",
        email: "cus0014@gmail.com",
        password: "123456",
        isActive: true,
    });
    const user14 = new User({
        userAccount: account14._id,
        fullName: "Customer 0014",
        email: "cus0014@gmail.com",
        phone: "0980893787",
        isAcc: true,
        dayOfBirth: "11-20-1999",
        gender: "Female",
    });

    const account15 = new Account({
        userName: "cus0015",
        email: "cus0015@gmail.com",
        password: "123456",
        isActive: true,
    });
    const user15 = new User({
        userAccount: account15._id,
        fullName: "Customer 0015",
        email: "cus0015@gmail.com",
        phone: "0980893777",
        isAcc: true,
        dayOfBirth: "12-21-1999",
        gender: "Female",
    });

    const account16 = new Account({
        userName: "cus0016",
        email: "cus0016@gmail.com",
        password: "123456",
        isActive: true,
    });
    const user16 = new User({
        userAccount: account16._id,
        fullName: "Customer 0016",
        email: "cus0016@gmail.com",
        phone: "0980893666",
        isAcc: true,
        dayOfBirth: "11-26-1996",
        gender: "Female",
    });

    const account17 = new Account({
        userName: "cus0017",
        email: "cus0017@gmail.com",
        password: "123456",
        isActive: true,
    });
    const user17 = new User({
        userAccount: account17._id,
        fullName: "Customer 0017",
        email: "cus0017@gmail.com",
        phone: "0980893677",
        isAcc: true,
        dayOfBirth: "12-27-1997",
        gender: "Female",
    });

    const account18 = new Account({
        userName: "cus0018",
        email: "cus0018@gmail.com",
        password: "123456",
        isActive: true,
    });
    const user18 = new User({
        userAccount: account18._id,
        fullName: "Customer 0018",
        email: "cus0018@gmail.com",
        phone: "0980893688",
        isAcc: true,
        dayOfBirth: "12-27-1998",
        gender: "Female",
    });

    await account1.save();
    await user1.save();
    await account2.save();
    await user2.save();
    await account3.save();
    await user3.save();
    await account4.save();
    await user4.save();

    await account5.save();
    await user5.save();
    await account6.save();
    await user6.save();
    await account7.save();
    await user7.save();
    await account8.save();
    await user8.save();

    await account9.save();
    await user9.save();
    await account10.save();
    await user10.save();
    await account11.save();
    await user11.save();
    await account12.save();
    await user12.save();
    await account13.save();
    await user13.save();
    await account14.save();
    await user14.save();
    await account15.save();
    await user15.save();
    await account16.save();
    await user16.save();
    await account17.save();
    await user17.save();
    await account18.save();
    await user18.save();

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

// Data Promotions
exports.promotions = asyncMiddleware(async(req, res, next) => {
    const promotion1 = new Promotion({
        _id: "61950cbcec9e962a3c0009fd",
        promotion_name: "Event 30/4 & 1/5",
        promotion_desc: ".....",
        discount: 0.1,
        type: "Percent",
        startDate: "2021-04-30T00:00:00.000Z",
        endDate: "2021-05-01T00:00:00.000Z",
        products: [
            { productSku: "J0020207", name: "Long Jean Slimfit Basic M4" },
            { productSku: "J0019174", name: "Long Jean Slimfit Basic B19" },
            { productSku: "J0019585", name: "Long Jean Slimfit Basic B35" },
            { productSku: "J0020208", name: "Long Jean Slimfit Basic M41" },
            { productSku: "J0020188", name: "Long Jean Straight Special M1" },
        ],
    });
    const promotion2 = new Promotion({
        _id: "61966d2ce699223ca4b7dfa3",
        promotion_name: "Event Happy new year",
        promotion_desc: "Happy new year 2022",
        discount: 3,
        type: "Money",
        startDate: "2021-12-30T00:00:00.000Z",
        endDate: "2022-01-10T00:00:00.000Z",
        products: [
            { productSku: "H0019519", name: "PKTT Special Hat A16" },
            { productSku: "H0019781", name: "PKTT Hat 12VAHDT Ky Lau Van Dinh Ver1" },
        ],
    });

    await promotion1.save();
    await promotion2.save();
});

// Data Product
exports.products = asyncMiddleware(async(req, res, next) => {
    const product1 = new Product({
        name: "Long Jean Slimfit Basic M4",
        price: 18.7,
        quantity: 100,
        description: "Material: Jean Cotton \nIngredients: 78% cotton 21% recycle poly 1% spandex \nTemperature Balance Feature",
        category: "Jeans",
        sku: "J0020207",
        image: "https://imgur.com/XCvL9Xo.jpg",
        listImage: [
            "https://i.imgur.com/4LDr6NG.jpg",
            "https://i.imgur.com/GuDDuwr.jpg",
            "https://i.imgur.com/sKvfzAD.jpg",
        ],
        isPromotion: true,
        promotionId: "61950cbcec9e962a3c0009fd",
    });
    const product2 = new Product({
        name: "Long Jean Slimfit Basic B19",
        price: 18.7,
        quantity: 100,
        description: "Material: Jean Cotton \nIngredients: 98% cotton 2% spandex",
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
        isPromotion: true,
        promotionId: "61950cbcec9e962a3c0009fd",
    });
    const product3 = new Product({
        name: "T-Shirt Somi Y Nguyen Ban 18- Summer Ver2",
        price: 9.9,
        quantity: 100,
        description: "Material: Umbrella fabric - heat transfer printing \nIngredients: 100% poly",
        category: "T-Shirt",
        sku: "TS0020246",
        sold: 4,
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
        name: "Long Jean Slimfit Basic B35",
        price: 18.7,
        quantity: 100,
        description: "Materials: Jean Cotton \nIngredients: 98% cotton 2% spandex",
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
        isPromotion: true,
        promotionId: "61950cbcec9e962a3c0009fd",
    });
    const product5 = new Product({
        name: "PKTT Basic Hat A21",
        price: 5.28,
        quantity: 100,
        description: "Materials: Kaki \nIngredients: 100% cotton \n",
        category: "Hat",
        sku: "H0019689",
        sold: 8,
        image: "https://imgur.com/LOfyrVk.jpg",
        listImage: [
            "https://i.imgur.com/aYaT8bq.jpg",
            "https://i.imgur.com/oOQMeUp.jpg",
            "https://i.imgur.com/NxM4J4C.jpg",
        ],
    });
    const product6 = new Product({
        name: "PKTT Special Hat A16",
        price: 6.6,
        quantity: 100,
        description: "Materials: Kaki \nIngredients: 100% cotton \n",
        category: "Hat",
        sku: "H0019519",
        image: "https://imgur.com/eKaV0XK.jpg",
        listImage: [
            "https://i.imgur.com/0hBGWca.jpg",
            "https://i.imgur.com/S1LUfp6.jpg",
            "https://i.imgur.com/CrEW7yF.jpg",
            "https://i.imgur.com/IFeYJIV.jpg",
        ],
        isPromotion: true,
        promotionId: "61966d2ce699223ca4b7dfa3",
    });
    const product10 = new Product({
        name: "Long Jean Slimfit Basic M41",
        price: 18.7,
        quantity: 100,
        description: "Materials: Jean Cotton \nIngredients: 78% cotton 21% recycle poly 1% spandex \nTemperature Balance Feature",
        category: "Jeans",
        sku: "J0020208",
        image: "https://i.imgur.com/3GnfM54.jpg",
        listImage: [
            "https://i.imgur.com/4LDr6NG.jpg",
            "https://i.imgur.com/GuDDuwr.jpg",
            "https://i.imgur.com/sKvfzAD.jpg",
        ],
        isPromotion: true,
        promotionId: "61950cbcec9e962a3c0009fd",
    });

    const product11 = new Product({
        name: "Long Jean Straight Special M1",
        price: 18,
        quantity: 100,
        description: "Materials: Jean Cotton \nIngredients: 99% cotton 1% spandex \n - Soft \n- Cool",
        category: "Jeans",
        sku: "J0020188",
        image: "https://i.imgur.com/jvlJDFd.jpg",
        listImage: [
            "https://i.imgur.com/7Wq6YPE.jpg",
            "https://i.imgur.com/ksnJYi8.jpg",
            "https://i.imgur.com/CdpqIDD.jpg",
        ],
        isPromotion: true,
        promotionId: "61950cbcec9e962a3c0009fd",
    });

    const product12 = new Product({
        name: "Long Jean Slimfit Basic M3",
        price: 18.2,
        quantity: 100,
        description: "Materials: Jean Cotton \nIngredients: 99% cotton 1% spandex \n - Soft \n- Cool",
        category: "Jeans",
        sku: "J0020189",
        sold: 7,
        image: "https://i.imgur.com/nETorPr.jpg",
        listImage: [
            "https://i.imgur.com/bBL0xvS.jpg",
            "https://i.imgur.com/vJtBrev.jpg",
            "https://i.imgur.com/rseutlQ.jpg",
        ],
    });

    const product13 = new Product({
        name: "Long Jean Slimfit Special M8",
        price: 18,
        quantity: 100,
        description: "Materials: Jean Cotton \nIngredients: 99% cotton 1% spandex ",
        category: "Jeans",
        sku: "J0020180",
        sold: 5,
        image: "https://i.imgur.com/WAfTKwJ.jpg",
        listImage: [
            "https://i.imgur.com/vbE55rc.jpg",
            "https://i.imgur.com/QpNL61d.jpg",
            "https://i.imgur.com/rTvuh17.jpg",
            "https://i.imgur.com/g5N25q6.jpg",
            "https://i.imgur.com/AvVuhxu.jpg",
        ],
    });

    const product14 = new Product({
        name: "Long Jean Slimfit Special M7",
        price: 18.5,
        quantity: 100,
        description: "Materials: Jean Cotton \nIngredients: 99% cotton 1% spandex ",
        category: "Jeans",
        sku: "J0020178",
        sold: 11,
        image: "https://i.imgur.com/C7oMFKr.jpg",
        listImage: [
            "https://i.imgur.com/RdbIfJH.jpg",
            "https://i.imgur.com/JD0w9bk.jpg",
            "https://i.imgur.com/yEXuERh.jpg",
        ],
    });

    const product15 = new Product({
        name: "Long Jean Skinny 12VAHDT Van Xuan Kien Quoc Ver1",
        price: 18.3,
        quantity: 100,
        description: "Materials: Jean Cotton \nIngredients: 98% cotton 2% spandex \n- Laser-Logo Van Xuan Kien Quoc \n- Torn style ",
        category: "Jeans",
        sku: "J0020148",
        sold: 3,
        image: "https://i.imgur.com/MJBqpKf.jpg",
        listImage: [
            "https://i.imgur.com/qhrjCZv.jpg",
            "https://i.imgur.com/mBWkw4k.jpg",
            "https://i.imgur.com/LeNP3PC.jpg",
            "https://i.imgur.com/LHLigLn.jpg",
            "https://i.imgur.com/2ebliAM.jpg",
        ],
    });

    const product16 = new Product({
        name: "Long Jean Straight 12VAHDT Van Hien Chi Bang Ver1",
        price: 18,
        quantity: 100,
        description: "Materials: Jean Cotton \nIngredients: 99% cotton 1% spandex \n- Stand up pants design \n- Convinience \n- Concealer pant \n+ Fashion wash \n+ Logo Van Hien Chi Bang ",
        category: "Jeans",
        sku: "J0020131",
        sold: 6,
        image: "https://i.imgur.com/eEuEslL.jpg",
        listImage: [
            "https://i.imgur.com/DNMPSKd.jpg",
            "https://i.imgur.com/YWFaVov.jpg",
            "https://i.imgur.com/iVlqyYt.jpg",
        ],
    });

    const product17 = new Product({
        name: "Long Jean Slimfit Basic 12VAHDT Van Xuan Kien Quoc Ver2",
        price: 18.3,
        quantity: 100,
        description: "Materials: Jean Cotton \nIngredients: 98% cotton 2% spandex \n- Logo Van Xuan Kien Quoc ",
        category: "Jeans",
        sku: "J0020130",
        sold: 3,
        image: "https://i.imgur.com/Y2SFkHJ.jpg",
        listImage: [
            "https://i.imgur.com/6nSuOc4.jpg",
            "https://i.imgur.com/5PtQDoW.jpg",
            "https://i.imgur.com/MG3C57m.jpg",
            "https://i.imgur.com/QFWvIaz.jpg",
            "https://i.imgur.com/Gdavi22.jpg",
        ],
    });

    const product18 = new Product({
        name: "Long Jean Slimfit Basic Logo 2010 Ver1",
        price: 18,
        quantity: 100,
        description: "Materials: Jean Cotton \nIngredients: 99% cotton 1% spandex \n- Printed Y2010 Logo on the back of the pocket",
        category: "Jeans",
        sku: "J0020118",
        sold: 4,
        image: "https://i.imgur.com/cXkixjd.jpg",
        listImage: [
            "https://i.imgur.com/vemfuoQ.jpg",
            "https://i.imgur.com/yFZLA0T.jpg",
            "https://i.imgur.com/CT3UwzE.jpg",
        ],
    });

    const product19 = new Product({
        name: "Long Jean Slimfit Special M3",
        price: 18.3,
        quantity: 100,
        description: "Materials: Jean Cotton \nIngredients: 99% cotton 1% spandex \n- Soft \n- Cool \n- Absorbent \nHDSD: \n- Turn the product upside down before washing to prevent color fading. \n- Do not use strong detergents in the washing process.",
        category: "Jeans",
        sku: "J0019946",
        sold: 6,
        image: "https://i.imgur.com/CFR3UrV.jpg",
        listImage: [
            "https://i.imgur.com/CZYsCUF.jpg",
            "https://i.imgur.com/MQEXi8k.jpg",
            "https://i.imgur.com/A9e7L3Z.jpg",
            "https://i.imgur.com/a1mhc62.jpg",
            "https://i.imgur.com/IT4EPFj.jpg",
        ],
    });

    const product20 = new Product({
        name: "T-shirt Round Neck Bbuff Ver1",
        price: 7.8,
        quantity: 100,
        description: "Materials: Cotton 4 ways Tie Dye\nIngredients: 92% cotton 8% spandex\n- Friendly\n- Absorb moisture\n- Soft\n- Optimal stretch\n- Odor control\n- Temperature Control\n+ Embroidery motifs + logo stitching\n- HDSD:\n+ Should be washed with products of the same color\n+ Do not use bleach or strong detergents\n+ Should be dried in the shade to keep the color stable",
        category: "T-Shirt",
        sku: "TS0020285",
        sold: 3,
        image: "https://i.imgur.com/NDY7tVA.jpg",
        listImage: [
            "https://i.imgur.com/GMQnXze.jpg",
            "https://i.imgur.com/MUkL1Yl.jpg",
            "https://i.imgur.com/vuvoEyv.jpg",
        ],
    });

    const product21 = new Product({
        name: "T-shirt Thun Round Neck Bbuff Ver1",
        price: 7.8,
        quantity: 100,
        description: "Materials: Cotton 4 ways Tie Dye\nIngredients: 92% cotton 8% spandex\n- Friendly\n- Absorb moisture\n- Soft\n- Optimal stretch\n- Odor control\n- Odor control\n- Temperature Control\n+ Embroidery motifs + logo stitching\n- HDSD:\n+ Should be washed with products of the same color\n+ Do not use bleach or strong detergents\n+ Should be dried in the shade to keep the color stable",
        category: "T-Shirt",
        sku: "TS0020286",
        sold: 6,
        image: "https://i.imgur.com/Ags63zV.jpg",
        listImage: [
            "https://i.imgur.com/6vKYkvO.jpg",
            "https://i.imgur.com/jZfhuKu.jpg",
            "https://i.imgur.com/Om8adDm.jpg",
            "https://i.imgur.com/OpiW614.jpg",
            "https://i.imgur.com/AcUNNj6.jpg",
        ],
    });

    const product22 = new Product({
        name: "T-shirt Thun Round Neck Linh Vật Bbuff Ver2",
        price: 7.8,
        quantity: 100,
        description: "Materials: Cotton 4 ways Tie Dye\nIngredients: 92% cotton 8% spandex\n- Friendly\n- Absorb moisture\n- Soft\n- Optimal stretch\n- Odor control\n- Odor control\n- Temperature Control\n+ Embroidery motifs + logo stitching\n- HDSD:\n+ Should be washed with products of the same color\n+ Do not use bleach or strong detergents\n+ Should be dried in the shade to keep the color stable",
        category: "T-Shirt",
        sku: "TS0020287",
        sold: 4,
        image: "https://i.imgur.com/cbbz7SV.jpg",
        listImage: [
            "https://i.imgur.com/RZK4M4d.jpg",
            "https://i.imgur.com/EOIdju8.jpg",
            "https://i.imgur.com/CdQ7QOl.jpg",
        ],
    });

    const product23 = new Product({
        name: "T-shirt Thun Round Neck Linh Vật Bbuff Ver1",
        price: 7.8,
        quantity: 100,
        description: "Materials: Cotton 4 ways Tie Dye\nIngredients: 92% cotton 8% spandex\n- Friendly\n- Absorb moisture\n- Soft\n- Optimal stretch\n- Odor control\n- Odor control\n- Temperature Control\n+ Embroidery motifs + logo stitching\n- HDSD:\n+ Should be washed with products of the same color\n+ Do not use bleach or strong detergents\n+ Should be dried in the shade to keep the color stable",
        category: "T-Shirt",
        sku: "TS0020254",
        sold: 2,
        image: "https://i.imgur.com/sQ9jeaF.jpg",
        listImage: [
            "https://i.imgur.com/L82zJQt.jpg",
            "https://i.imgur.com/qNOUWxn.jpg",
            "https://i.imgur.com/S5MVtP3.jpg",
            "https://i.imgur.com/5MQvXoS.jpg",
            "https://i.imgur.com/0u1VLcG.jpg",
        ],
    });

    const product24 = new Product({
        name: "T-shirt Thun Round Neck Special Hand Drawn M10",
        price: 8.3,
        quantity: 100,
        description: "Materials: Cotton Compact\nIngredients: 100% Cotton\n- Friendly\n- Absorb moisture\n- Soft\n- Optimal stretch\n- Odor control\n- Odor control\n+ Water print pattern\n- HDSD:\n+ Should be washed with products of the same color\n+ Do not use bleach or strong detergents\n+ Should be dried in the shade to keep the color stable",
        category: "T-Shirt",
        sku: "TS0020193",
        sold: 2,
        image: "https://i.imgur.com/ovjFiH2.jpg",
        listImage: [
            "https://i.imgur.com/kTlOK6r.jpg",
            "https://i.imgur.com/upVIeTy.jpg",
            "https://i.imgur.com/PI9hqqu.jpg",
        ],
    });

    const product25 = new Product({
        name: "T-shirt Thun Round Neck Linh Vật Bbuff Ver1",
        price: 8.5,
        quantity: 100,
        description: "Materials: Cotton Compact\nIngredients: 100% cotton\n- Friendly\n- Absorb moisture\n- Soft\n- Optimal stretch\n- Odor control\n- Odor control\n+ Flexible print pattern\n- HDSD:\n+ Should be washed with products of the same color\n+ Do not use bleach or strong detergents\n+ Should be dried in the shade to keep the color stable",
        category: "T-Shirt",
        sku: "TS0020157",
        sold: 8,
        image: "https://i.imgur.com/NsaQ9aJ.jpg",
        listImage: [
            "https://i.imgur.com/nTCAkMK.jpg",
            "https://i.imgur.com/so131n8.jpg",
            "https://i.imgur.com/bE9NZFB.jpg",
            "https://i.imgur.com/VzNOaRN.jpg",
            "https://i.imgur.com/hvNNOGF.jpg",
        ],
    });

    const product26 = new Product({
        name: "T-shirt Thun Round Neck Linh Vật Rồng M5",
        price: 8,
        quantity: 100,
        description: "Materials: Cotton Compact\nIngredients: 100% Cotton\n- Friendly\n- Absorb moisture\n- Soft\n- Optimal stretch\n- Odor control\n- Odor control\n+ Water print pattern\n- HDSD:\n+ Should be washed with products of the same color\n+ Do not use bleach or strong detergents\n+ Should be dried in the shade to keep the color stable",
        category: "T-Shirt",
        sku: "TS0020163",
        image: "https://i.imgur.com/1Uq2r7R.jpg",
        listImage: [
            "https://i.imgur.com/WWKKCAT.jpg",
            "https://i.imgur.com/mFf5GYo.jpg",
            "https://i.imgur.com/iY8EaJ8.jpg",
        ],
    });

    const product27 = new Product({
        name: "T-shirt Thun Round Neck Y Nguyên Bản 18+ M9",
        price: 8,
        quantity: 100,
        description: "Materials: Cotton 2 chiều\nIngredients: 100% Cotton\n- Friendly\n- Absorb moisture\n- Soft\n- Optimal stretch\n- Odor control\n- Odor control\n+ Trame print pattern + flexible printing\n- HDSD:\n+ Should be washed with products of the same color\n+ Do not use bleach or strong detergents\n+ Should be dried in the shade to keep the color stable",
        category: "T-Shirt",
        sku: "TS0020050",
        image: "https://i.imgur.com/9cST7Hu.jpg",
        listImage: [
            "https://i.imgur.com/Mvk81vy.jpg",
            "https://i.imgur.com/X6DzcAH.jpg",
            "https://i.imgur.com/EDedr7i.jpg",
        ],
    });

    const product28 = new Product({
        name: "T-shirt Thun Round Neck Basic M5",
        price: 8.2,
        quantity: 100,
        description: "Materials: Cotton 2D\nIngredients: 100% Cotton\n- 2-way stretch\n- Good sweat absorption brings cool feeling",
        category: "T-Shirt",
        sku: "TS0020024",
        sold: 2,
        image: "https://i.imgur.com/sTdD586.jpg",
        listImage: [
            "https://i.imgur.com/VWkM0ed.jpg",
            "https://i.imgur.com/m9xCdkQ.jpg",
            "https://i.imgur.com/TOxUTFm.jpg",
            "https://i.imgur.com/1fqLFNw.jpg",
            "https://i.imgur.com/VH6wsOR.jpg",
        ],
    });

    const product29 = new Product({
        name: "T-shirt Round Neck Basic M5",
        price: 8.2,
        quantity: 100,
        description: "Materials: Cotton 2D\nIngredients: 100% Cotton\n- 2-way stretch\n- Good sweat absorption brings cool feeling",
        category: "T-Shirt",
        sku: "TS0020023",
        sold: 2,
        image: "https://i.imgur.com/uK7RzXu.jpg",
        listImage: [
            "https://i.imgur.com/JZsyVRA.jpg",
            "https://i.imgur.com/5DRpiYn.jpg",
            "https://i.imgur.com/k8X9s1Y.jpg",
            "https://i.imgur.com/FIo1OLy.jpg",
            "https://i.imgur.com/26MmkoL.jpg",
        ],
    });

    const product31 = new Product({
        name: "PKTT Hat 12VAHDT Ky Lau Van Dinh Ver1",
        price: 6,
        quantity: 100,
        description: "Materials : Kaki\nIngredients: 100% cotton\n- Computerized embroidery with glitter Logo Ky Lau Van Dinh",
        category: "Hat",
        sku: "H0019781",
        image: "https://i.imgur.com/456PZRB.jpg",
        listImage: [
            "https://i.imgur.com/YRQfF5p.jpg",
            "https://i.imgur.com/0WfuGPe.jpg",
            "https://i.imgur.com/VM448aI.jpg",
            "https://i.imgur.com/yyem4ud.jpg",
            "https://i.imgur.com/zW3T3U4.jpg",
        ],
        isPromotion: true,
        promotionId: "61966d2ce699223ca4b7dfa3",
    });

    const product32 = new Product({
        name: "PKTT Hat Linh vat Cuu Long Ver1",
        price: 6,
        quantity: 100,
        description: "Materials : Kaki\nIngredients: 100% cotton\n- Embroidery thread Cuu Long\n- Reflection map of the Mekong Delta",
        category: "Hat",
        sku: "H0019865",
        sold: 4,
        image: "https://i.imgur.com/ReEva11.jpg",
        listImage: [
            "https://i.imgur.com/zkiBMsi.jpg",
            "https://i.imgur.com/BAeY0hi.jpg",
            "https://i.imgur.com/281bbxC.jpg",
        ],
    });

    const product33 = new Product({
        name: "PKTT Hat 12VAHDT Van Hien Chi Bang Ver2",
        price: 6,
        quantity: 100,
        description: "Materials : Kaki\nIngredients: 100% cotton",
        category: "Hat",
        sku: "H0019725",
        sold: 4,
        image: "https://i.imgur.com/L0X0pn3.jpg",
        listImage: [
            "https://i.imgur.com/yM7gurr.jpg",
            "https://i.imgur.com/dDiBkz9.jpg",
            "https://i.imgur.com/ianiNtt.jpg",
            "https://i.imgur.com/NNnkcQw.jpg",
            "https://i.imgur.com/pjTE3Cb.jpg",
        ],
    });

    const product34 = new Product({
        name: "PKTT Hat Amazing Nature Darkness Hunters Ver1",
        price: 6,
        quantity: 100,
        description: "Materials : Kaki\nIngredients: 100% cotton\n Reflection of bat",
        category: "Hat",
        sku: "H0019796",
        sold: 3,
        image: "https://i.imgur.com/BpxGjOh.jpg",
        listImage: [
            "https://i.imgur.com/FTkzM1E.jpg",
            "https://i.imgur.com/6Wvxbuq.jpg",
            "https://i.imgur.com/k4NnRFg.jpg",
        ],
    });

    const product35 = new Product({
        name: "PKTT Hat Ancient Gods Anubis Ver1",
        price: 6,
        quantity: 100,
        description: "Materials : Kaki - velvet fabric\nIngredients: 100% cotton\n- ANUBIS . laser technology\n- Embroidered Anubis logo",
        category: "Hat",
        sku: "H0019916",
        sold: 12,
        image: "https://i.imgur.com/ZGl9KBh.jpg",
        listImage: [
            "https://i.imgur.com/tFHXwwc.jpg",
            "https://i.imgur.com/Ng9qRCL.jpg",
            "https://i.imgur.com/duzy2Bs.jpg",
            "https://i.imgur.com/UUnUXWe.jpg",
            "https://i.imgur.com/wZqBfxN.jpg",
            "https://i.imgur.com/YOffDNS.jpg",
        ],
    });

    const product36 = new Product({
        name: "PKTT Hat Galaxy 4 Element Ver2 Fire",
        price: 6,
        quantity: 100,
        description: "Materials : Kaki\nIngredients: 100% cotton",
        category: "Hat",
        sku: "H0019776",
        sold: 4,
        image: "https://i.imgur.com/VtZhqDe.jpg",
        listImage: [
            "https://i.imgur.com/cw2iDNu.jpg",
            "https://i.imgur.com/Xn1ZmuN.jpg",
            "https://i.imgur.com/BoM4ZVj.jpg",
        ],
    });

    const product37 = new Product({
        name: "PKTT Hat Special A06",
        price: 6.5,
        quantity: 100,
        description: "Materials : Kaki\nIngredients: 100% cotton",
        category: "Hat",
        sku: "H0019100",
        sold: 6,
        image: "https://i.imgur.com/mFEvFDg.jpg",
        listImage: [
            "https://i.imgur.com/uWaz8Vg.jpg",
            "https://i.imgur.com/YnceX7k.jpg",
            "https://i.imgur.com/4AchnYo.jpg",
            "https://i.imgur.com/o42g1tv.jpg",
            "https://i.imgur.com/Q6kUrSQ.jpg",
        ],
    });

    const product38 = new Product({
        name: "PKTT Hat Ancient Gods Horus Ver1",
        price: 6,
        quantity: 100,
        description: "Materials : Kaki\nIngredients: 100% cotton\n- High technique of printing Horus logo\n- 6-pointed star pattern embroidered with silver thread\n- Horus right eye motif with red thread digital embroidery",
        category: "Hat",
        sku: "H0019917",
        sold: 4,
        image: "https://i.imgur.com/DMjWPrs.jpg",
        listImage: [
            "https://i.imgur.com/S4dBLGP.jpg",
            "https://i.imgur.com/ebIFduZ.jpg",
            "https://i.imgur.com/nwka8es.jpg",
        ],
    });

    const product39 = new Product({
        name: "PKTT Hat 12VAHDT Van Xuan Kien Quoc Ver2",
        price: 6.5,
        quantity: 100,
        description: "Materials: Fabric- Umbrella with mesh\nIngredients: 100% Poly\n- Logo Van Xuan Kien Quoc\n+ High print front\n+ Embroidered back side",
        category: "Hat",
        sku: "H0019978",
        sold: 4,
        image: "https://i.imgur.com/4pERUSS.jpg",
        listImage: [
            "https://i.imgur.com/DDeEjQ9.jpg",
            "https://i.imgur.com/khv54fm.jpg",
            "https://i.imgur.com/WTZEjD7.jpg",
            "https://i.imgur.com/hh2j94T.jpg",
            "https://i.imgur.com/R5F2mlq.jpg",
        ],
    });

    //data Shirt:7
    const product40 = new Product({
        name: "Somi Danton Neck Mascot Bbuff Ver1",
        price: 9.7,
        quantity: 100,
        description: "Materials: Umbrella fabric - heat transfer printing\nIngredients: 100% poly\n- 2-way stretch\n- Soft\n- Dry fast\n- Durable\n+ Heat transfer printing technique + logo stitching\n- HDSD:\n+ It is recommended to use mild or diluted laundry detergents to avoid damaging the fabric quality.\n+ Wash at normal temperature to avoid excessive heat that will affect the print quality.\n+ Dry in the shade to avoid strong sunlight .",
        category: "Shirt",
        sku: "S0020281",
        sold: 5,
        image: "https://i.imgur.com/hXBwk3O.jpg",
        listImage: [
            "https://i.imgur.com/l3OrllZ.jpg",
            "https://i.imgur.com/gauAs6w.jpg",
            "https://i.imgur.com/fWxzv5J.jpg",
        ],
    });

    const product41 = new Product({
        name: "Somi Short Sleeves Y Original 18- Summer Ver2",
        price: 9.7,
        quantity: 100,
        description: "Materials: Umbrella fabric - heat transfer printing\nIngredients: 100% poly\n- 2-way stretch\n- Soft\n- Dry fast\n- Durable\n- HDSD:\n+ It is recommended to use mild or diluted laundry detergents to avoid damaging the fabric quality.\n+ Should turn the product upside down when washing, do not use a brush that is too hard to rub strongly on the surface of the fabric.\n+ Wash at normal temperature to avoid excessive heat that will affect the print quality.\n+ Dry in the shade to avoid strong sunlight .",
        category: "Shirt",
        sku: "S0020246",
        sold: 5,
        image: "https://i.imgur.com/ma8Kl3s.jpg",
        listImage: [
            "https://i.imgur.com/raZXqHb.jpg",
            "https://i.imgur.com/m4QUpGI.jpg",
            "https://i.imgur.com/2AGayYw.jpg",
            "https://i.imgur.com/CPgsc92.jpg",
            "https://i.imgur.com/9Mae35j.jpg",
        ],
    });

    const product42 = new Product({
        name: "Somi Leader Collar Basic M25",
        price: 11,
        quantity: 100,
        description: "Materials: Somi Cotton\nIngredients: 100% Cotton",
        category: "Shirt",
        sku: "S0020231",
        sold: 3,
        image: "https://i.imgur.com/idkL60Y.jpg",
        listImage: [
            "https://i.imgur.com/JvX10cn.jpg",
            "https://i.imgur.com/dT8uaRE.jpg",
            "https://i.imgur.com/EGSoWfL.jpg",
        ],
    });

    const product43 = new Product({
        name: "Somi long sleeves Basic M24",
        price: 11,
        quantity: 100,
        description: "Materials: Somi \nIngredients: 63% poly 33% rayon 4% spandex \n- Soft, the surface of the fabric is smooth and feels cool to wear.",
        category: "Shirt",
        sku: "S0020220",
        sold: 6,
        image: "https://i.imgur.com/CNn9gz9.jpg",
        listImage: [
            "https://i.imgur.com/hvuaywh.jpg",
            "https://i.imgur.com/wOrdZTH.jpg",
            "https://i.imgur.com/qJi5AmV.jpg",
            "https://i.imgur.com/ts35pkE.jpg",
            "https://i.imgur.com/0lEiqrz.jpg",
        ],
    });

    const product44 = new Product({
        name: "Somi Leader Collar Basic M1",
        price: 12.4,
        quantity: 100,
        description: "Materials: Vải Bamboo\nIngredients: 48.5% bamboo 48.5% poly 3% spandex\n- Khánh khuẩn và khử mùi\n- Mềm và nhẹ\n- Thoáng mát\n- Thấm hút\n- Nhanh khô",
        category: "Shirt",
        sku: "S0020219",
        sold: 8,
        image: "https://i.imgur.com/cs5evIp.jpg",
        listImage: [
            "https://i.imgur.com/duDbkhU.jpg",
            "https://i.imgur.com/icUP42L.jpg",
            "https://i.imgur.com/hZEWnwB.jpg",
        ],
    });

    const product45 = new Product({
        name: "Somi short sleeves Basic M3 ",
        price: 11,
        quantity: 100,
        description: "Materials: Kate\nIngredients: 88% superfine 12% modal\n- Less Wrinkling & Easy Ironing\n- Dry fast\n- Cool",
        category: "Shirt",
        sku: "S0020006",
        sold: 3,
        image: "https://i.imgur.com/EyaQJhO.jpg",
        listImage: [
            "https://i.imgur.com/xlu395Q.jpg",
            "https://i.imgur.com/lULGUta.jpg",
            "https://i.imgur.com/sSKiSSd.jpg",
            "https://i.imgur.com/82DE5nP.jpg",
            "https://i.imgur.com/7TXSz15.jpg",
        ],
    });

    const product46 = new Product({
        name: "Somi Short sleeves Basic M3",
        price: 11,
        quantity: 100,
        description: "Materials: Kate\nIngredients: 88% superfine 12% modal\n- Less Wrinkling & Easy Ironing\n- Dry fast\n- Cool",
        category: "Shirt",
        sku: "S0020007",
        sold: 3,
        image: "https://i.imgur.com/kGZg6RA.jpg",
        listImage: [
            "https://i.imgur.com/oPICBnG.jpg",
            "https://i.imgur.com/v8lGRUO.jpg",
            "https://i.imgur.com/Sx48lVs.jpg",
            "https://i.imgur.com/eWUtjVy.jpg",
            "https://i.imgur.com/A01fmpv.jpg",
            "https://i.imgur.com/vOy1js8.jpg",
        ],
    });

    //data Coat:5
    const product47 = new Product({
        name: "Coat Classic sporty M6",
        price: 13,
        quantity: 100,
        description: "Materials: Umbrella fabric\nIngredients: 100% poly\n- UV UPF 50 resistant +\n- Antimicrobial\n- Waterproof (when riding in light rain)\n- Super light\n- Super thin - Quick dry\n- New design\n+ Has a mesh inside to reduce friction and limit stickiness\n+ Breathable under the shirt\n- High lock over the chin (covers the neck area)\n- Elastic wrist\n- 2 convenient inner pockets\n- 2 front pockets with zipper\n- Reverse Coil Zipper\n(These bag locks have a flat, flat outer surface while the locking teeth are on the inside.)",
        category: "Coat",
        sku: "C0020100",
        sold: 2,
        image: "https://i.imgur.com/vwr0xwh.jpg",
        listImage: [
            "https://i.imgur.com/Rlg3wSr.jpg",
            "https://i.imgur.com/xyA1MAB.jpg",
            "https://i.imgur.com/Q9R7jpY.jpg",
        ],
    });

    const product48 = new Product({
        name: "Coat Classic Original Medicine 18+ Logo 10 Ver1",
        price: 20.2,
        quantity: 100,
        description: "Materials: Umbrella fabric\nIngredients: 100% poly\n- Wind resistance\n- Water slide\n- Breathable\n- Optimal Fit\n- Waterproof for hours\n- Protection against environmental impacts \n+ Reverse Coil Zipper\n(These bag locks have a flat, flat outer surface while the locking teeth are on the inside)\n+ Two inner zippered pockets\n+ Wide hat\n+The hem has a reflective drawstring to adjust the width to suit the user\n+ Reflective edge zipper\n+ Heat transfer printing pattern",
        category: "Coat",
        sku: "C0020029",
        sold: 4,
        image: "https://i.imgur.com/ElULFrZ.jpg",
        listImage: [
            "https://i.imgur.com/il7Kszz.jpg",
            "https://i.imgur.com/hS3dZlv.jpg",
            "https://i.imgur.com/48ldFgU.jpg",
            "https://i.imgur.com/XMayLJE.jpg",
            "https://i.imgur.com/zQWtxbW.jpg",
        ],
    });

    const product49 = new Product({
        name: "Coat Hoodie Galaxy Astronaut J01",
        price: 13,
        quantity: 100,
        description: "Ingredients: 95% POLY \n- Limit staining during use\n- Less wrinkles\n5% SPANDEX\nHelps the shirt to stretch optimally\n \nHDSD:\n- To ensure that the material is not ruffled, in the washing process, you should wash the back of this fabric to avoid the causes of polyester fabric fading.",
        category: "Coat",
        sku: "C0019791",
        sold: 4,
        image: "https://i.imgur.com/4wGqb3j.jpg",
        listImage: [
            "https://i.imgur.com/3xeQjEK.jpg",
            "https://i.imgur.com/F4afCZX.jpg",
            "https://i.imgur.com/hwlv7mm.jpg",
        ],
    });

    const product50 = new Product({
        name: "Coat Hoodie Ancient Gods Anubis Ver1",
        price: 14.1,
        quantity: 100,
        description: "- Materials: \nMINI ZURRY \n- Ingredients:\n+ 95% COTTON\nEnvironmentally friendly\nCool\n+ 5% SPANDEX\nHelps the shirt to stretch optimally",
        category: "Coat",
        sku: "C0019784",
        image: "https://i.imgur.com/HTUdbqY.jpg",
        listImage: [
            "https://i.imgur.com/xTmPxld.jpg",
            "https://i.imgur.com/SdJdx4F.jpg",
            "https://i.imgur.com/SVb3MvY.jpg",
            "https://i.imgur.com/fN95RNb.jpg",
            "https://i.imgur.com/7SgtKsf.jpg",
        ],
    });

    const product51 = new Product({
        name: "Coat Hoodie 12VAHDT Van hien Chi Bang Ver1 Hỏa",
        price: 15.2,
        quantity: 100,
        description: "Materials: Cross fish scales\nIngredients: 95%cotton 5%spandex\n4-way stretch for comfortable wearing\nThe fabric is good at absorbing sweat and is breathable",
        category: "Coat",
        sku: "C0019473",
        sold: 2,
        image: "https://i.imgur.com/3Y87u5h.jpg",
        listImage: [
            "https://i.imgur.com/R9uebpL.jpg",
            "https://i.imgur.com/2LIkZ7O.jpg",
            "https://i.imgur.com/oDAYuTA.jpg",
        ],
    });

    await product10.save();
    await product11.save();
    await product12.save();
    await product13.save();
    await product14.save();
    await product15.save();
    await product16.save();
    await product17.save();
    await product18.save();
    await product19.save();
    await product20.save();
    await product21.save();
    await product22.save();
    await product23.save();
    await product24.save();
    await product25.save();
    await product26.save();
    await product27.save();
    await product28.save();
    await product29.save();
    await product31.save();
    await product32.save();
    await product33.save();
    await product34.save();
    await product35.save();
    await product36.save();
    await product37.save();
    await product38.save();
    await product39.save();
    await product40.save();
    await product41.save();
    await product42.save();
    await product43.save();
    await product44.save();
    await product45.save();
    await product46.save();
    await product47.save();
    await product48.save();
    await product49.save();
    await product50.save();
    await product51.save();

    await product1.save();
    await product2.save();
    await product3.save();
    await product4.save();
    await product5.save();
    await product6.save();

    // ORDER
    const order1 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus009@gmail.com",
        fullName: "Order 1",
        orderCode: "11114112021",
        orderDate: "2021-11-04T09:11:14.000+00:00",
        totalProduct: 15,
        totalPayment: 79.51,
        temporaryMoney: 78,
        transportFee: 1.51,
        products: [{
                id: product31._id,
                quantity: 4,
                price: product31.price,
                discount: 0,
                sku: "H0019865",
            },
            {
                id: product33._id,
                quantity: 4,
                price: product33.price,
                discount: 0,
                sku: "H0019725",
            },
            {
                id: product34._id,
                quantity: 3,
                price: product34.price,
                discount: 0,
                sku: "H0019796",
            },
            {
                id: product38._id,
                quantity: 4,
                price: product38.price,
                discount: 0,
                sku: "H0019917",
            },
        ],
    });

    const order2 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus009@gmail.com",
        fullName: "Order 2",
        orderCode: "11225112021",
        orderDate: "2021-11-05T09:11:14.000+00:00",
        totalProduct: 3,
        totalPayment: 34.51,
        temporaryMoney: 33,
        transportFee: 1.51,
        products: [{
            id: product46._id,
            quantity: 3,
            price: product46.price,
            discount: 0,
            sku: "S0020007",
        }, ],
    });

    const order3 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus009@gmail.com",
        fullName: "Order 3",
        orderCode: "11336112021",
        orderDate: "2021-11-06T09:11:14.000+00:00",
        totalProduct: 5,
        totalPayment: 27.91,
        temporaryMoney: 26.4,
        transportFee: 1.51,
        products: [{
            id: product5._id,
            quantity: 5,
            price: product5.price,
            discount: 0,
            sku: "H0019689",
        }, ],
    });

    const order4 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus009@gmail.com",
        fullName: "Order 4",
        orderCode: "11447112021",
        orderDate: "2021-11-07T09:11:14.000+00:00",
        totalProduct: 4,
        totalPayment: 75.51,
        temporaryMoney: 74,
        transportFee: 1.51,
        products: [{
            id: product14._id,
            quantity: 4,
            price: product14.price,
            discount: 0,
            sku: "J0020178",
        }, ],
    });

    const order5 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus009@gmail.com",
        fullName: "Order 5",
        orderCode: "11558112021",
        orderDate: "2021-11-08T09:11:14.000+00:00",
        totalProduct: 6,
        totalPayment: 78.91,
        temporaryMoney: 77.4,
        transportFee: 1.51,
        products: [{
                id: product16._id, //18do 54
                quantity: 3,
                price: product16.price,
                discount: 0,
                sku: "J0020131",
            },
            {
                id: product20._id, //7.8do 23.4
                quantity: 3,
                price: product20.price,
                discount: 0,
                sku: "TS0020285",
            },
        ],
    });

    const order6 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus009@gmail.com",
        fullName: "Order 6",
        orderCode: "11669112021",
        orderDate: "2021-11-09T09:11:14.000+00:00",
        totalProduct: 12,
        totalPayment: 117.31,
        temporaryMoney: 115.8,
        transportFee: 1.51,
        products: [{
                id: product12._id, //18.2do 54.6
                quantity: 3,
                price: product12.price,
                discount: 0,
                sku: "J0020189",
            },
            {
                id: product22._id, //7.8do 31.2
                quantity: 4,
                price: product22.price,
                discount: 0,
                sku: "TS0020287",
            },
            {
                id: product40._id, //9.7do 30
                quantity: 5,
                price: product40.price,
                discount: 0,
                sku: "S0020281",
            },
        ],
    });

    const order7 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus0010@gmail.com",
        fullName: "Order 7",
        orderCode: "117710112021",
        orderDate: "2021-11-10T09:11:14.000+00:00",
        totalProduct: 10,
        totalPayment: 82.51,
        temporaryMoney: 81,
        transportFee: 1.51,
        products: [{
                id: product3._id, //9.9do 39.6
                quantity: 4,
                price: product3.price,
                discount: 0,
                sku: "TS0020246",
            },
            {
                id: product21._id, //7.8do 23.4
                quantity: 3,
                price: product21.price,
                discount: 0,
                sku: "TS0020286",
            },
            {
                id: product35._id, //6do 18
                quantity: 3,
                price: product35.price,
                discount: 0,
                sku: "H0019916",
            },
        ],
    });

    const order8 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus0010@gmail.com",
        fullName: "Order 8",
        orderCode: "118811112021",
        orderDate: "2021-11-11T09:11:14.000+00:00",
        totalProduct: 10,
        totalPayment: 108.71,
        temporaryMoney: 107.2,
        transportFee: 1.51,
        products: [{
                id: product13._id, //18do 36
                quantity: 2,
                price: product13.price,
                discount: 0,
                sku: "J0020180",
            },
            {
                id: product23._id, //7.8do 15.6
                quantity: 2,
                price: product23.price,
                discount: 0,
                sku: "TS0020254",
            },
            {
                id: product24._id, //8.3do 16.6
                quantity: 2,
                price: product24.price,
                discount: 0,
                sku: "TS0020193",
            },
            {
                id: product37._id, //6.5do 13
                quantity: 2,
                price: product37.price,
                discount: 0,
                sku: "H0019100",
            },
            {
                id: product47._id, //13do 26
                quantity: 2,
                price: product47.price,
                discount: 0,
                sku: "C0020100",
            },
        ],
    });

    const order9 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus0011@gmail.com",
        fullName: "Order 9",
        orderCode: "119912112021",
        orderDate: "2021-11-12T09:11:14.000+00:00",
        totalProduct: 19,
        totalPayment: 217.81,
        temporaryMoney: 216.3,
        transportFee: 1.51,
        products: [{
                id: product15._id, //18.3do 54.9
                quantity: 3,
                price: product15.price,
                discount: 0,
                sku: "J0020148",
            },
            {
                id: product17._id, //18.3do 54.9
                quantity: 3,
                price: product17.price,
                discount: 0,
                sku: "J0020130",
            },
            {
                id: product25._id, //8.5do 34
                quantity: 4,
                price: product25.price,
                discount: 0,
                sku: "TS0020157",
            },
            {
                id: product36._id, //6do 24
                quantity: 4,
                price: product36.price,
                discount: 0,
                sku: "H0019776",
            },
            {
                id: product41._id, //9.7do 48.5
                quantity: 5,
                price: product41.price,
                discount: 0,
                sku: "S0020246",
            },
        ],
    });

    const order10 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus0013@gmail.com",
        fullName: "Order 10",
        orderCode: "120013112021",
        orderDate: "2021-11-13T09:11:14.000+00:00",
        totalProduct: 18,
        totalPayment: 272.91,
        temporaryMoney: 271.4,
        transportFee: 1.51,
        products: [{
                id: product18._id, //18do 36
                quantity: 2,
                price: product18.price,
                discount: 0,
                sku: "J0020118",
            },
            {
                id: product19._id, //18.3do 36.6
                quantity: 2,
                price: product19.price,
                discount: 0,
                sku: "J0019946",
            },
            {
                id: product42._id, //11do 33
                quantity: 3,
                price: product42.price,
                discount: 0,
                sku: "S0020231",
            },
            {
                id: product43._id, //11do 33
                quantity: 3,
                price: product43.price,
                discount: 0,
                sku: "S0020220",
            },
            {
                id: product48._id, //20.2do 80.8
                quantity: 4,
                price: product48.price,
                discount: 0,
                sku: "C0020029",
            },
            {
                id: product49._id, //13do 52
                quantity: 4,
                price: product49.price,
                discount: 0,
                sku: "C0019791",
            },
        ],
    });

    const order11 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus0013@gmail.com",
        fullName: "Order 11",
        orderCode: "121114112021",
        orderDate: "2021-11-14T09:11:14.000+00:00",
        totalProduct: 2,
        totalPayment: 37.51,
        temporaryMoney: 36,
        transportFee: 1.51,
        products: [{
            id: product18._id, //18do 36
            quantity: 2,
            price: product18.price,
            discount: 0,
            sku: "J0020118",
        }, ],
    });

    const order12 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus0016@gmail.com",
        fullName: "Order 12",
        orderCode: "122215112021",
        orderDate: "2021-11-15T09:11:14.000+00:00",
        totalProduct: 2,
        totalPayment: 38.11,
        temporaryMoney: 36.6,
        transportFee: 1.51,
        products: [{
            id: product18._id, //18.3do 36.6
            quantity: 2,
            price: product18.price,
            discount: 0,
            sku: "J0019946",
        }, ],
    });

    const order13 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus0016@gmail.com",
        fullName: "Order 13",
        orderCode: "123316112021",
        orderDate: "2021-11-16T09:11:14.000+00:00",
        totalProduct: 6,
        totalPayment: 72.85,
        temporaryMoney: 71.34,
        transportFee: 1.51,
        products: [{
                id: product5._id, //5.28do 15.84
                quantity: 3,
                price: product5.price,
                discount: 0,
                sku: "H0019689",
            },
            {
                id: product14._id, //18.5do 55.5
                quantity: 3,
                price: product14.price,
                discount: 0,
                sku: "J0020178",
            },
        ],
    });

    const order14 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus0015@gmail.com",
        fullName: "Order 14",
        orderCode: "124417112021",
        orderDate: "2021-11-17T09:11:14.000+00:00",
        totalProduct: 6,
        totalPayment: 78.91,
        temporaryMoney: 77.4,
        transportFee: 1.51,
        products: [{
                id: product16._id, //18do 54
                quantity: 3,
                price: product16.price,
                discount: 0,
                sku: "J0020131",
            },
            {
                id: product21._id, //7.8do 23.4
                quantity: 3,
                price: product21.price,
                discount: 0,
                sku: "TS0020286",
            },
        ],
    });

    const order15 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus0015@gmail.com",
        fullName: "Order 15",
        orderCode: "125518112021",
        orderDate: "2021-11-18T09:11:14.000+00:00",
        totalProduct: 6,
        totalPayment: 68.31,
        temporaryMoney: 66.8,
        transportFee: 1.51,
        products: [{
                id: product12._id, //18.2do 36.4
                quantity: 2,
                price: product12.price,
                discount: 0,
                sku: "J0020189",
            },
            {
                id: product51._id, //15.2do 30.4
                quantity: 2,
                price: product51.price,
                discount: 0,
                sku: "C0019473",
            },
        ],
    });

    const order16 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus0015@gmail.com",
        fullName: "Order 16",
        orderCode: "126619112021",
        orderDate: "2021-11-19T09:11:14.000+00:00",
        totalProduct: 9,
        totalPayment: 106.51,
        temporaryMoney: 105,
        transportFee: 1.51,
        products: [{
                id: product13._id, //18do 54
                quantity: 3,
                price: product13.price,
                discount: 0,
                sku: "J0020180",
            },
            {
                id: product35._id, //6do 18
                quantity: 3,
                price: product35.price,
                discount: 0,
                sku: "H0019916",
            },
            {
                id: product45._id, //11do 33
                quantity: 3,
                price: product45.price,
                discount: 0,
                sku: "S0020006",
            },
        ],
    });

    const order17 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus0013@gmail.com",
        fullName: "Order 17",
        orderCode: "127720112021",
        orderDate: "2021-11-20T09:11:14.000+00:00",
        totalProduct: 12,
        totalPayment: 103.11,
        temporaryMoney: 101.6,
        transportFee: 1.51,
        products: [{
                id: product44._id, //12.4do 49.6
                quantity: 4,
                price: product44.price,
                discount: 0,
                sku: "S0020219",
            },
            {
                id: product39._id, //6.5do 26
                quantity: 4,
                price: product39.price,
                discount: 0,
                sku: "H0019978",
            },
            {
                id: product37._id, //6.5do 26
                quantity: 4,
                price: product37.price,
                discount: 0,
                sku: "H0019100",
            },
        ],
    });

    const order18 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus0014@gmail.com",
        fullName: "Order 18",
        orderCode: "128821112021",
        orderDate: "2021-11-21T09:11:14.000+00:00",
        totalProduct: 6,
        totalPayment: 51.31,
        temporaryMoney: 49.8,
        transportFee: 1.51,
        products: [{
                id: product29._id, //8.2do 16.4
                quantity: 2,
                price: product29.price,
                discount: 0,
                sku: "TS0020023",
            },
            {
                id: product28._id, //8.2do 16.4
                quantity: 2,
                price: product28.price,
                discount: 0,
                sku: "TS0020024",
            },
            {
                id: product25._id, //8.5do 17
                quantity: 2,
                price: product25.price,
                discount: 0,
                sku: "TS0020157",
            },
        ],
    });

    const order19 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus0014@gmail.com",
        fullName: "Order 19",
        orderCode: "129922112021",
        orderDate: "2021-11-22T09:11:14.000+00:00",
        totalProduct: 11,
        totalPayment: 122.51,
        temporaryMoney: 121,
        transportFee: 1.51,
        products: [{
                id: product44._id, //12.4do 49.6
                quantity: 4,
                price: product44.price,
                discount: 0,
                sku: "S0020219",
            },
            {
                id: product35._id, //6do 18
                quantity: 3,
                price: product35.price,
                discount: 0,
                sku: "H0019916",
            },
            {
                id: product12._id, //18.2do 36.4
                quantity: 2,
                price: product12.price,
                discount: 0,
                sku: "J0020189",
            },
            {
                id: product25._id, //8.5do 17
                quantity: 2,
                price: product25.price,
                discount: 0,
                sku: "TS0020157",
            },
        ],
    });

    const order20 = new Order({
        imagePayment: null,
        orderStatus: "Has received the goods",
        voucherCode: null,
        discount: null,
        note: null,
        address: "42 Quốc lộ 13, TP TDM, Bình Dương",
        intendedArrivalDate: "5-7 Day",
        payments: "COD",
        phone: "0909777888",
        email: "cus0014@gmail.com",
        fullName: "Order 20",
        orderCode: "130023112021",
        orderDate: "2021-11-23T09:11:14.000+00:00",
        totalProduct: 11,
        totalPayment: 163.11,
        temporaryMoney: 161.6,
        transportFee: 1.51,
        products: [{
                id: product18._id, //18.3do 36.6
                quantity: 2,
                price: product18.price,
                discount: 0,
                sku: "J0019946",
            },
            {
                id: product35._id, //6do 18
                quantity: 3,
                price: product35.price,
                discount: 0,
                sku: "H0019916",
            },
            {
                id: product43._id, //11do 33
                quantity: 3,
                price: product43.price,
                discount: 0,
                sku: "S0020220",
            },
            {
                id: product14._id, //18.5do 74
                quantity: 4,
                price: product14.price,
                discount: 0,
                sku: "J0020178",
            },
        ],
    });

    await order1.save();
    await order2.save();
    await order3.save();
    await order4.save();
    await order5.save();
    await order6.save();
    await order7.save();
    await order8.save();
    await order9.save();
    await order10.save();
    await order11.save();
    await order12.save();
    await order13.save();
    await order14.save();
    await order15.save();
    await order16.save();
    await order17.save();
    await order18.save();
    await order19.save();
    await order20.save();

    return res
        .status(201)
        .json(new SuccessResponse(201, "Created product successfully. =_="));
});

// Data
exports.data = asyncMiddleware(async(req, res, next) => {
    this.categories();
    this.user();
    this.vouchers();
    this.promotions();
    return res
        .status(201)
        .json(new SuccessResponse(201, "Created database successfully. =_="));
});