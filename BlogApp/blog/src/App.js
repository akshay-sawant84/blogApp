import './App.css';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/reusable/navbar';
import Footer from './components/reusable/footer';
import Blogs from './components/screens/blogs'
import BlogDetails from './components/screens/blogDetails'
import CreateBlog from './components/screens/createBlog'
import EditBlog from './components/screens/editBlog'
import Login from './components/screens/login'
import Register from './components/screens/register'
import ErrorPage from './components/screens/404'
import { Provider } from "react-redux";
import PrivateRoute from './components/reusable/privateRoute';
import PublicRoute from './components/reusable/publicRoute';
import JwtDecode from "jwt-decode";
import store from "./store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onLoginSuccess } from './components/Redux/Auth/authAction'


const App = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
      const decoded = JwtDecode(token);
      store.dispatch(onLoginSuccess(decoded));
  }

  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <Navbar />
        <Switch>
          <PublicRoute restricted exact path="/login" component={Login} />
          <PublicRoute restricted exact path="/register" component={Register} />
          <PrivateRoute path="/blog/add" component={CreateBlog} />
          <PrivateRoute path="/blog/edit/:id" component={EditBlog} />
          <PrivateRoute path="/blog-details/:id" component={BlogDetails} />
          <Route path="/" exact component={Blogs} />
          <Route path="*" component={ErrorPage} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
