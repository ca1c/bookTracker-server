const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

const User = require('../Models/User');
const Email = require('../Models/Email');
const Book = require("../Models/Book");

require("dotenv").config();

beforeEach(async () => {
    await mongoose.connection.close();
    await mongoose.connect(process.env.DB_URL + 'test');
});

afterAll(async () => {
    await User.deleteMany({});
    await Book.deleteMany({});
    await mongoose.connection.close();
})

describe("GET /", () => {
    it("should return an object with one attribute text", async() => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    })  ;
});

let user = {
    email: 'test@test.com',
    username: 'test',
    password: 'Test12345',
};

describe("PUT /createUser", () => {
    it("Should return with an error attribute of false", async() => {
        const res = await request(app).put("/createUser").send(user);


        // Instead of using the confirm email, I will just set the emailConfirmed attribute myself
        await User.updateOne({email: user.email}, {emailConfirmed: true});
        await Email.deleteMany({});
        
        expect(res.statusCode).toBe(200);
        expect(res.body.error).toBe(false);
    });
});

let sess = {};

describe("POST /login", () => {
    it("Should return with an error attribute of false and a session", async() => {
        const res = await request(app).post('/login').send({
            username: user.username,
            password: user.password
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.error).toBe(false);
        sess.id = res.body.user;
        sess.username = res.body.username;

        expect(res.body.username).toBe(user.username);
    });
});

let book;

// Get the book to add
describe("GET /searchBook", () => {
    it("Should return an object that contains an array of objects", async() => {
        const res = await request(app).get("/searchBook?q=ayn+rand");
        expect(res.statusCode).toBe(200);
        expect(res.body.items.length).toBeGreaterThan(0);

        book = res.body.items[0];
    });
});

describe("PUT /addBook", () => {
    it("Should return with an error attribute of false", async () => {
        const res = await request(app).put("/addBook").send({
            session: sess.id, 
            title: book.volumeInfo.title, 
            author: book.volumeInfo.authors[0] ?? "", 
            image: book.volumeInfo.imageLinks.thumbnail ?? "",
            pageCount: book.volumeInfo.pageCount ?? "", 
            read: "0", 
            username: sess.username, 
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.error).toBe(false);
    })
});

let books;

describe("GET /readBookDoc", () => {
    it("Should return with a list of the user's books", async () => {
        const res = await request(app).get(`/readBookDoc?username=${sess.username}&session=${sess.id}`);

        expect(res.statusCode).toBe(200);
        console.log(res.body);
        expect(res.body.length).toBeGreaterThan(0);

        books = res.body;
    })
})

describe("POST /editBook", () => {
    it("Should return with an error attribute of false", async() => {
        const res = await request(app).post('/editBook').send({
            username: sess.username,
            session: sess.id,
            _id: books[0]._id,
            progress: "10"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.error).toBe(false);
    })
})

describe("POST /deleteBook", () => {
    it("Should return with an error attribute of false and message stating book deleted", async() => {
        const res = await request(app).post('/deleteBook').send({
            session: sess.id,
            username: sess.username,
            _id: books[0]._id
        });

        console.log(books[0]._id);

        expect(res.statusCode).toBe(200);
        expect(res.body.error).toBe(false);
    })
})

describe("POST /editUsername", () => {
    it("Should return with an error attribute of false and message stating username changed", async() => {
        const res = await request(app).post('/editUsername').send({
            session: sess.id, 
            username: sess.username, 
            newUsername: "test1",
        });
        sess.username = "test1";
        user.username = "test1";

        expect(res.statusCode).toBe(200);
        expect(res.body.error).toBe(false);
    })
})

describe("POST /changePassword", () => {
    it("Should return with an error attribute of false and a message stating password changed", async() => {
        const res = await request(app).post('/changePassword').send({
            username: sess.username, 
            session: sess.id, 
            oldPassword: user.password, 
            newPassword: user.password + "6"
        });

        user.password += "6";

        expect(res.statusCode).toBe(200);
        expect(res.body.error).toBe(false);
    })
})

describe("POST /logout", () => {
    it("Should return with a session attribute of true", async() => {
        const res = await request(app).post('/logout').send({
            id: sess.id
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.session).toBe(true);
    });
});

describe("POST /login again", () => {
    it("Should return with an error attribute of false and a session", async() => {
        const res = await request(app).post('/login').send({
            username: user.username,
            password: user.password
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.error).toBe(false);
        sess.id = res.body.user;
        sess.username = res.body.username;

        expect(res.body.username).toBe(user.username);
    });
});

describe("POST /deleteUser", () => {
    it("Should return with an error attribute of false and a message stating the user was deleted", async() => {
        const res = await request(app).post('/deleteUser').send({
            username: 
            sess.username, 
            session: sess.id, 
            password: user.password
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.error).toBe(false);
    })
})


// async function DeleteDBData() {
//     await User.deleteMany({});
// }

// DeleteDBData();
