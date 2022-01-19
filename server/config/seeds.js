const db = require('./connection');
const { User, Product, Category } = require('../models');


db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Justin Peters' },
    { name: 'Ten Hundred' },
    { name: 'Artist 3' },
    { name: 'Artist 4' },
    { name: 'Artist 5' }
  ]);

  console.log('artists seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Bird Tree',
      description:
        'Bird Tree description example.',
      image: 'BirdTree.jpg',
      category: categories[0]._id,
      price: 119.99,
      quantity: 25
    },
    {
      name: 'Jellyfishes',
      description:
        'Jellyfishes description',
      image: 'Jellyfishes.jpg',
      category: categories[0]._id,
      price: 97.99,
      quantity: 100
    },
    {
      name: '2001',
      category: categories[1]._id,
      description:
      '2001 Description',
      image: '2001.jpg',
      price: 145.99,
      quantity: 20
    },
    {
      name: 'Miko-1',
      category: categories[1]._id,
      description:
        'Miko-1 Description',
      image: 'Miko-1.jpg',
      price: 123.99,
      quantity: 50
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
