const { AuthenticationError } = require('apollo-server-express');
const { User, Artwork, Artist, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
      artists: async () => {
        return await Artist.find();
      },
      artworks: async (parent, { artist, name }) => {
        const params = {};
  
        if (artist) {
          params.artist = artist;
        }
  
        if (name) {
          params.name = {
            $regex: name
          };
        }
  
        return await Artwork.find(params).populate('artist');
      },
      artwork: async (parent, { _id }) => {
        return await Artwork.findById(_id).populate('artist');
      },
      user: async (parent, args, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.artworks',
            populate: 'artist'
          });
  
          user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
  
          return user;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      order: async (parent, { _id }, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.artworks',
            populate: 'artist'
          });
  
          return user.orders.id(_id);
        }
  
        throw new AuthenticationError('Not logged in');
      },
      checkout: async (parent, args, context) => {
        const url = new URL(context.headers.referer).origin;
        const order = new Order({ artworks: args.artworks });
        const line_items = [];
  
        const { artworks } = await order.populate('artworks').execPopulate();
  
        for (let i = 0; i < artworks.length; i++) {
          const artwork = await stripe.artworks.create({
            name: artworks[i].name,
            description: artworks[i].description,
            images: [`${url}/images/${artworks[i].image}`]
          });
  
          const price = await stripe.prices.create({
            artwork: artwork.id,
            unit_amount: artworks[i].price * 100,
            currency: 'usd',
          });
  
          line_items.push({
            price: price.id,
            quantity: 1
          });
        }
  
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items,
          mode: 'payment',
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`
        });
  
        return { session: session.id };
      }
    },
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
      addOrder: async (parent, { artworks }, context) => {
        console.log(context);
        if (context.user) {
          const order = new Order({ artworks });
  
          await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
  
          return order;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateUser: async (parent, args, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(context.user._id, args, { new: true });
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateArtwork: async (parent, { _id, quantity }) => {
        const decrement = Math.abs(quantity) * -1;
  
        return await Artwork.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      }
    }
  };
  
  module.exports = resolvers;
  