import { User } from "../model/user.model";
import { getUserByName, getUserById } from "../db/users-db";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Set up local strategy
passport.use(new LocalStrategy(
    async (username: string, password: string, done: any) => {
        const user = await getUserByName(username);
        // Check if user exists
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }
        // Check if password is correct
        if (user.password !== password) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
    }
));

// Serialize user
passport.serializeUser((user: User, done: any) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id: number, done: any) => {
    const user = await getUserById(id);
    // Check if user exists
    if (!user) {
        return done(new Error('User not found'));
    } else {
        return done(null, user);
    }
});