// src/models/userModel.js
class UserModel {
    constructor(email, firstName, lastName, role) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    toMap() {
        return {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.role,
        };
    }
}

export default UserModel;
