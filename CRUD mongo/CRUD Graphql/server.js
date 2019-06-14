const {ApolloServer,gql} = require('apollo-server-express');
const express = require('express');
require('./config.js');
const {User} = require('./model.js')


const typeDefs = gql`
type User {
    id : ID!
    name :String
    course : String
}
type Query {
    getUsers:[User]
}
type Mutation {
    addUser(id : ID! , name : String!, course : String ): User
    updateUser(id : ID!,name : String,course : String) : User
    deleteUser(id : ID!,name : String,course : String) : User
}`;


const resolvers = {
    Query: {
        getUsers: async () => await User.find({}).exec()
    },
    Mutation: {
        addUser: async (_, args) => {
            try {
                let response = await User.create(args);
                return response;
            } catch(e) {
                return e.message;
            }
        },
        updateUser : async(_,args) => {
        const updateStud = await User.findOneAndUpdate({"id" : args.id},args);
        if (!updateStud) {
          throw new Error('Error')
        }
        return updateStud;
        },
        deleteUser : async (_,args) =>
        {
            const removedStud = await User.findOneAndDelete({"id" : args.id}).exec()
            if (!removedStud) {
             throw new Error('error')
             }
            return removedStud;
        }
    }
};

const server = new ApolloServer({typeDefs,resolvers});
const app = express();

server.applyMiddleware({app});

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);