describe("About Mutability", function () {
  it("should expect object properties to be public and mutable", function () {
    var aPerson = { firstName: "John", lastName: "Smith" };
    aPerson.firstName = "Alan";

    expect(aPerson.firstName).toBe("Alan");
  });

  it("should understand that constructed properties are public and mutable", function () {
    function Person(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
    var aPerson = new Person("John", "Smith");
    aPerson.firstName = "Alan";

    expect(aPerson.firstName).toBe("Alan");
  });

  it("should expect prototype properties to be public and mutable", function () {
    function Person(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
    Person.prototype.getFullName = function () {
      return this.firstName + " " + this.lastName;
    };

    var aPerson = new Person("John", "Smith");
    expect(aPerson.getFullName()).toBe("John Smith");

    aPerson.getFullName = function () {
      return this.lastName + ", " + this.firstName;
    };

    expect(aPerson.getFullName()).toBe("Smith, John");
  });

  it("should know that variables inside a constructor and constructor args are private", function () {
    function Person(firstName, lastName) {
      var fullName = firstName + " " + lastName;

      this.getFirstName = function () {
        return firstName;
      };
      this.getLastName = function () {
        return lastName;
      };
      this.getFullName = function () {
        return fullName;
      };
    }
    var aPerson = new Person("John", "Smith");

    aPerson.firstName = "Penny";
    aPerson.lastName = "Andrews";
    aPerson.fullName = "Penny Andrews";

    expect(aPerson.getFirstName()).toBe("John");
    expect(aPerson.getLastName()).toBe("Smith");
    expect(aPerson.getFullName()).toBe("John Smith");

    aPerson.getFullName = function () {
      return aPerson.lastName + ", " + aPerson.firstName;
    };

    expect(aPerson.getFullName()).toBe("Andrews, Penny");
  });
});
