import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // react/HTML goes here, example below

//   function App() {
//     return (
//       <ApolloProvider client={client}>
//         <Router>
//           <div>
//             <StoreProvider>
//               <Nav />
//               <Switch>
//                 <Route exact path="/" component={Home} />
//                 <Route exact path="/login" component={Login} />
//                 <Route exact path="/signup" component={Signup} />
//                 <Route exact path="/success" component={Success} />
//                 <Route exact path="/orderHistory" component={OrderHistory} />
//                 <Route exact path="/products/:id" component={Detail} />
//                 <Route component={NoMatch} />
//               </Switch>
//             </StoreProvider>
//           </div>
//         </Router>
//       </ApolloProvider>
//     );
//   }

  export default App;
