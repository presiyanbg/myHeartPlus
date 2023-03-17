import { HealthCategoryType } from "./types";

class UserClass {
  id: number = 0;
  first_name: string = '';
  last_name: string = '';
  full_name: string = '';
  role: string = '';
  email: string = '';
  last_activity: string = '';
  email_verified_at: string = '';
  created_at: string = '';
  updated_at: string = '';
  image: string = '';

  constructor(
  ) { }

  setUser = (user: any) => {
    this.id = user.id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.full_name = user.full_name;
    this.role = user.role;
    this.email = user.email;
    this.last_activity = user.last_activity;
    this.email_verified_at = user.email_verified_at;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
    this.image = user.image;
  }
}

class HealthTestClass {
  id: number = 0;
  category_id: number = 0;
  doctor_id: number = 0;
  rating: number = 0;
  description: string = '';
  title: string = '';
  created_at: string = '';
  updated_at: string = '';
  category: HealthCategoryType | any;

  constructor() {
  }

  setHealthTest(test: any) {
    this.id = test.id;
    this.category_id = test.category_id;
    this.doctor_id = test.doctor_id;
    this.rating = test.rating;
    this.description = test.description;
    this.title = test.title;
    this.created_at = test.created_at;
    this.updated_at = test.updated_at;
    this.category = test.category;
  }
}

export {
  UserClass,
  HealthTestClass,
}