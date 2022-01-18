const db = require('./connection');
const { User, Artwork, Artist } = require('../models');

db.once('open', async () => {
  await Artist.deleteMany();

  const artists = await Artist.insertMany([
    { name: 'Justin Peters instagram' },
    { name: 'Ten Hundred' }
  ]);

  console.log('artists seeded');

  await Artwork.deleteMany();

  const artworks = await Artwork.insertMany([
    {
      name: 'Bird Tree',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'BirdTree.jpg',
      artist: artists[0]._id,
      price: 2.99,
      quantity: 5
    },
    {
      name: 'Jellyfishes',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'Jellyfishes.jpg',
      artist: artists[0]._id,
      price: 1.99,
      quantity: 5
    },
    {
      name: 'Moonfall',
      artist: artists[0]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'Moonfall.jpg',
      price: 7.99,
      quantity: 5
    },
    {
      name: 'Spacewalk',
      artist: artists[0]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'Spacewalk.jpg',
      price: 3.99,
      quantity: 5
    },
    {
      name: 'Umbrella Road',
      artist: artists[0]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'UmbrellaRoad.jpg',
      price: 14.99,
      quantity: 5
    },
    {
      name: '2001',
      artist: artists[1]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: '2001.jpg',
      price: 25,
      quantity: 5
    },
    {
      name: 'Chelsea phones',
      artist: artists[1]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'Chelseaphones.jpg',
      price: 25,
      quantity: 5
    },
    {
      name: 'Miko',
      artist: artists[1]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'Miko-1.jpg',
      price: 25,
      quantity: 5
    },
    {
      name: 'Shaprece Poster',
      artist: artists[1]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'Shaprece-Poster-2.2-WEB.jpg',
      price: 25,
      quantity: 5
    },
    {
      name: 'Spaceman Paradise',
      artist: artists[1]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'Spaceman-Paradise.jpg',
      price: 25,
      quantity: 5
    },
  ]);

  console.log('artworks seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        artworks: [artworks[0]._id, artworks[0]._id, artworks[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'John',
    lastName: 'Doe',
    email: 'JD@testmail.com',
    password: '1234567'
  });

  console.log('users seeded');

  process.exit();
});
