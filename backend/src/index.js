"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const graphql_tools_1 = require("graphql-tools");
const node_fetch_1 = __importDefault(require("node-fetch"));
const typeDefs = (0, apollo_server_1.gql) `
  type University {
    name: String
    state_province: String
    web_pages: [String]
  }

  type Query {
    universities(name: String, state_province: String): [University]
  }
`;
const resolvers = {
    Query: {
        universities: (_, { name, state_province }) => __awaiter(void 0, void 0, void 0, function* () {
            const url = `http://universities.hipolabs.com/search?country=South+Africa`;
            const response = yield (0, node_fetch_1.default)(url);
            const data = yield response.json();
            const universities = data;
            return universities
                .filter((university) => name
                ? university.name.toLowerCase().includes(name.toLowerCase())
                : true)
                .filter((university) => state_province
                ? university.state_province
                    .toLowerCase()
                    .includes(state_province.toLowerCase())
                : true)
                .map((university) => ({
                name: university.name,
                state_province: university.state_province,
                web_pages: university.web_pages,
            }));
        }),
    },
};
const schema = (0, graphql_tools_1.makeExecutableSchema)({
    typeDefs,
    resolvers,
});
const server = new apollo_server_1.ApolloServer({ schema });
server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
