const ErrorResponse = require("../model/statusResponse/ErrorResponse");
const SuccessResponse = require("../model/statusResponse/SuccessResponse");
const Account = require("../model/database/Account");
const User = require("../model/database/User");
const Category = require("../model/database/Category");
const Product = require("../model/database/Product");
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

    const product11 = new Product({
        name: "Quần Dài Jean Straight Đặc Biệt M1",
        price: 18,
        quantity: 100,
        description: "Chất liệu: Jean Cotton \nThành phần: 99% cotton 1% spandex \n - Mềm mại \n- Thoáng mát",
        category: "Jeans",
        sku: "J0020188",
        image: "https://i.imgur.com/jvlJDFd.jpg",
        listImage: [
            "https://i.imgur.com/7Wq6YPE.jpg",
            "https://i.imgur.com/ksnJYi8.jpg",
            "https://i.imgur.com/CdpqIDD.jpg",
        ],
    });

    const product12 = new Product({
        name: "Quần Dài Jean Slimfit Đơn Giản M3",
        price: 18.2,
        quantity: 100,
        description: "Chất liệu: Jean Cotton \nThành phần: 99% cotton 1% spandex \n - Mềm mại \n- Thoáng mát",
        category: "Jeans",
        sku: "J0020189",
        image: "https://i.imgur.com/nETorPr.jpg",
        listImage: [
            "https://i.imgur.com/bBL0xvS.jpg",
            "https://i.imgur.com/vJtBrev.jpg",
            "https://i.imgur.com/rseutlQ.jpg",
        ],
    });

    const product13 = new Product({
        name: "Quần Dài Jean Slimfit Đặc Biệt M8",
        price: 18,
        quantity: 100,
        description: "Chất liệu: Jean Cotton \nThành phần: 99% cotton 1% spandex ",
        category: "Jeans",
        sku: "J0020180",
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
        name: "Quần Dài Jean Slimfit Đặc Biệt M7",
        price: 18.5,
        quantity: 100,
        description: "Chất liệu: Jean Cotton \nThành phần: 99% cotton 1% spandex ",
        category: "Jeans",
        sku: "J0020178",
        image: "https://i.imgur.com/C7oMFKr.jpg",
        listImage: [
            "https://i.imgur.com/RdbIfJH.jpg",
            "https://i.imgur.com/JD0w9bk.jpg",
            "https://i.imgur.com/yEXuERh.jpg",
        ],
    });

    const product15 = new Product({
        name: "Quần Dài Jean Skinny 12VAHDT Vạn Xuân Kiến Quốc Ver1",
        price: 18.3,
        quantity: 100,
        description: "Chất liệu: Jean Cotton \nThành phần: 98% cotton 2% spandex \n- Khắc laser logo Vạn Xuân Kiến Quốc \n- Rách gối phong cách ",
        category: "Jeans",
        sku: "J0020148",
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
        name: "Quần Dài Jean Straight 12VAHDT Văn Hiến Chi Bang Ver1",
        price: 18,
        quantity: 100,
        description: "Chất liệu: Jean Cotton \nThành phần: 99% cotton 1% spandex \n- Thiết kế ống đứng \n- Thoải mái \n- Che khuyết điểm \n+ Wash thời trang \n+ In logo Văn Hiến Chi Bang ",
        category: "Jeans",
        sku: "J0020131",
        image: "https://i.imgur.com/eEuEslL.jpg",
        listImage: [
            "https://i.imgur.com/DNMPSKd.jpg",
            "https://i.imgur.com/YWFaVov.jpg",
            "https://i.imgur.com/iVlqyYt.jpg",
        ],
    });

    const product17 = new Product({
        name: "Quần Dài Jean Slimfit Đơn Giản 12VAHDT Vạn Xuân Kiến Quốc Ver2",
        price: 18.3,
        quantity: 100,
        description: "Chất liệu: Jean Cotton \nThành phần: 98% cotton 2% spandex \n- In logo Vạn Xuân Kiến Quốc ",
        category: "Jeans",
        sku: "J0020130",
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
        name: "Quần Dài Jean Slimfit Đơn Giản Logo 2010 Ver1",
        price: 18,
        quantity: 100,
        description: "Chất liệu: Jean Cotton \nThành phần: 99% cotton 1% spandex \n- In Logo Y2010 phía sau túi",
        category: "Jeans",
        sku: "J0020118",
        image: "https://i.imgur.com/cXkixjd.jpg",
        listImage: [
            "https://i.imgur.com/vemfuoQ.jpg",
            "https://i.imgur.com/yFZLA0T.jpg",
            "https://i.imgur.com/CT3UwzE.jpg",
        ],
    });

    const product19 = new Product({
        name: "Quần Dài Jean Slimfit Đặc Biệt M3",
        price: 18.3,
        quantity: 100,
        description: "Chất liệu: Jean Cotton \nThành phần: 99% cotton 1% spandex \n- Mềm mại \n- Thoáng mát \n- Thấm hút \nHDSD: \n- Hãy lộn mặt trái của sản phẩm trước khi giặt để hạn chế bay màu vải. \n- Không nên sử dụng các chất tẩy rửa mạnh trong quá trình giặt.",
        category: "Jeans",
        sku: "J0019946",
        image: "https://i.imgur.com/CFR3UrV.jpg",
        listImage: [
            "https://i.imgur.com/CZYsCUF.jpg",
            "https://i.imgur.com/MQEXi8k.jpg",
            "https://i.imgur.com/A9e7L3Z.jpg",
            "https://i.imgur.com/a1mhc62.jpg",
            "https://i.imgur.com/IT4EPFj.jpg",
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
    return res
        .status(201)
        .json(new SuccessResponse(201, "Created database successfully. =_="));
});