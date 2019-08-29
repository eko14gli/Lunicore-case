import img from '../assets/images/user.png';
import { Image } from 'react-native';
import React from 'react';

class User {
    constructor(id, first_name, surname, age) {
        this.id = id;
        this.first_name = first_name;
        this.surname = surname;
        this.age = age;
    }
}

export default User;