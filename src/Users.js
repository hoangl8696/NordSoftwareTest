export default class User {

    constructor() {

        //Declare user's properties
        this.userName = "default name";
        this.emailAddress = "default address";
        this.phoneNum = "default phone number";
        this.id = 0;

        //Declare arrays for randomize user's properties
        this.users = ["Oskar Johanson", "Niklas Lahti", "Janne Muurinen", "Christoffer Niska", "Simon Bjorklund"];
        this.emailSurfix = ["@gmail.com", "@hotmail.com", "@hollywood.com", "@nordsoftware.com", "@omnipartners.fi"];
        
        //Randomize new user instance's properties
        this.generateNewUser();
    }

    //Helper method, randomize user's properties
    generateNewUser() {
        //Randomly pick an index to pick from the arrays
        const RNG = Math.round(this.scalingConverter(0, 1, 0, this.users.length-1, Math.random()))

        //Populate properties using the randomly picked index
        this.userName = this.users[RNG];
        this.emailAddress = this.userName.toLocaleLowerCase().replace(/\s/g, ".") + this.emailSurfix[RNG];
        this.phoneNum = "0" + Math.round(Math.random() * 1000000000);
        this.id = Math.round(Math.random()*1000000000000000);
    }

    //Convert scaling from 0-1 (the range of Math.random's value) to range of array's index
    scalingConverter(minScale1, maxScale1, minScale2, maxScale2, value) {
        return minScale2 * (1 - (value - minScale1) / (maxScale1 - minScale1)) + maxScale2 * ((value - minScale1) / (maxScale1 - minScale1))
    }
}