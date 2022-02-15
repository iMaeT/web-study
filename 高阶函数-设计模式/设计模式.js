// // 享元模式在前端中的应用
// Function.prototype.implementsFor = function( parentClassOrObject ) {
//   if (parentClassOrObject.constructor === Function) {
//     // normal inheritance
//     this.prototype = new parentClassOrObject();
//     this.prototype.constructor = this;
//     this.prototype.parent = parentClassOrObject.prototype;
//   }
//   else {
//     // Pure Virtual Inheritance
//     this.prototype = parentClassOrObject;
//     this.prototype.constructor = this;
//     this.prototype.parent = parentClassOrObject;
//   }
//   return this;
// }

// // Flyweight object
// var coffeeOrder = {

//   // Interfaces
//   serveCoffee: function(context) {},
//   getFlavor: function() {}
// };

// // ConcreteFlyweight object that creates ConcreteFlyweight
// // Implements CoffeeOrder
// function CoffeeFlavor(newFlavor) {
//   var flavor = newFlavor;

//   // If an Interface has been defined for a feature
//   // implement the feature
//   if (typeof this.getFlavor === 'function') {
//     this.getFlavor = function() {
//       return flavor;
//     };
//   }

//   if (typeof this.serveCoffee === 'function') {
//     this.serveCoffee = function(context) {
//       console.log('Serving Coffee flavor '
//         + flavor
//         + " to table number "
//         + context.getTable()
//       );
//     }
//   }
// }
// // Implement interface for CoffeeOrder
// CoffeeFlavor.implementsFor(coffeeOrder);

// // Handle table numbers for a coffee order
// function CorffeOrderContext( tableNumber ) {
//   return {
//     getTable: function() {
//       return tableNumber;
//     }
//   }
// }
// function CoffeeFlavorFactory() {
//   var flavors = {};
//   var length = 0;

//   return {
//     getCoffeeFlavor: function(flavorName) {

//       var flavor = flavors[flavorName];
//       if (typeof flavor === 'undefined') {
//         flavor = new CoffeeFlavor(flavorName);
//         flavors[flavorName] = flavor;
//         length++;
//       }
//       return flavor;
//     },
//     getTotalCoffeeFlavorMode: function() {
//       return length;
//     }
//   }
// }
// // Sample usage:
// testFlyweight()
// function testFlyweight() {
//   // The flavors ordered
//   var flavors = [],
//   // the tables for orders
//   tables = [],
//   // Number of order made
//   ordersMade = 0,
//   // The CoffeeFlavorFactory instance
//   flavorFactory = new CoffeeFlavorFactory();
//   function takeOrders( flavorIn, table ) {
//     flavors.push(flavorFactory.getCoffeeFlavor(flavorIn));
//     tables.push(new CorffeOrderContext(table));
//     ordersMade++;
//   }
//   takeOrders("Cappuccino", 2);
//   takeOrders("Cappuccino", 2);
//   takeOrders("Frappe", 1);
//   takeOrders("Frappe", 1);
//   takeOrders("Xpresso", 1);
//   takeOrders("Frappe", 897);
//   takeOrders("Cappuccino", 97);
//   takeOrders("Cappuccino", 97);
//   takeOrders("Frappe", 3);
//   takeOrders("Xpresso", 3);
//   takeOrders("Cappuccino", 3);
//   takeOrders("Xpresso", 96);
//   takeOrders("Frappe", 552);
//   takeOrders("Cappuccino", 121);
//   takeOrders("Xpresso", 121);
  
//   for (var i = 0; i < ordersMade; i++) {
//     flavors[i].serveCoffee(tables[i]);
//   }
//   console.log(" ");
//   console.log("total CoffeeFlavor Objects made: " + flavorFactory.getTotalCoffeeFlavorMode())
// }

/**
 * 图书管理
 */
// const Book = function (title, author, genre, pageCount, publisherID, ISBN) {
//   this.title = title;
//   this.author = author;
//   this.genre = this.genre;
//   this.pageCount = pageCount;
//   this.publisherID = publisherID;
//   this.ISBN = ISBN;
// };

// // Book Factory singleton
// var BookFactory = (function () {
//   var existingBooks = {}, existingBook;
//   return {
//     createBook: function (title, author, genre, pageCount, publisherID, ISBN) {
//       // Find out if a particular book meta-data combination has been created before
//       // !! or (bang bang) forces a boolean to be returned
//       existingBook = existingBooks[ISBN];
//       if (!!existingBook) {
//         return existingBook;
//       } else {
//         // If not, let's create a new instance of the book and store it
//         var book = new Book(title, author, genre, pageCount, publisherID, ISBN);
//         existingBooks[ISBN] = book;
//         return book;
//       }
//     }
//   };
// })();

// // 维护书的状态
// var BookRecordManager = (function () {
//   var bookRecordDatabase = {};
//   return {
//     // Add a new book into the library system;
//     addBookRecord: function(id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {
//       var book = BookFactory.createBook(title, author, genre, pageCount, publisherID, ISBN);
//       bookRecordDatabase[id] = {
//         checkoutMember: checkoutMember,
//         checkoutDate: checkoutDate,
//         dueReturnDate: dueReturnDate,
//         availability: availability,
//         book: book
//       };
//     },
//     updateCheckoutStatus: function (bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {
//       var record = bookRecordDatabase[bookID];
//       record.availability = newStatus;
//       record.checkoutDate = checkoutDate;
//       record.checkoutMember = checkoutMember;
//       record.dueReturnDate = newReturnDate;
//     },
//     extendCheckoutPeriod: function (bookID, newReturnDate) {
//       bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
//     },
//     isPastDue: function (bookID) {
//       var currentDate = new Date();
//       return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
//     }
//   }
// })();

