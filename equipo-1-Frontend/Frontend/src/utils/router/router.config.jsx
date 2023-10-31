import { createBrowserRouter } from 'react-router-dom';
import App from '../../layouts/App';
import Detail from '../../routes/Detail';
import Home from '../../routes/Home';
import Admin from '../../routes/Admin';
import Login from '../../routes/Login';
import Singup from '../../routes/Singup';
import Account from '../../routes/Account';
import Booking from '../../routes/Booking';
import ConfirmBooking from '../../routes/ConfirmBooking';
import Favs from '../../routes/Favs';
import BookingHistory from '../../routes/BookingHistory';


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "/detail/:id",
            element: <Detail />,
          },
          {
            path: "/booking/:id/:date",
            element: <Booking />,
          },
          {
            path: "/confirmbooking/:condition",
            element: <ConfirmBooking />
          },
          {
            path: "/admin",
            element: <Admin />
          },
          {
            path: "/login",
            element: <Login/>
          },
          {
            path: "/singup",
            element: <Singup/>
          },
          {
            path: "/account",
            element: <Account/>
          },
          {
            path: "/favs",
            element: <Favs/>
          },
          {
            path: "/bookinghistory",
            element: <BookingHistory/>
          }
      ],
    },
  ]);

  export default router;