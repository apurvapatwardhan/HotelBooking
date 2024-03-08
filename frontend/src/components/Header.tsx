
import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import SignOutButton from './SignOutButton';

const Header = () => {
  const {isLoggedIn} = useAppContext();
  return (
    <div className='bg-blue-800 py-6 '>
      <div className="container mx-auto flex justify-between">
        <span className='text-3xl text-white tracking-tight font-bold'>
            <Link to="/">HotelBooking</Link>
        </span>
        <span className='flex space-x-2'>
          {
            isLoggedIn ? <>
          <Link to="/my-bookings" className='flex items-center text-white px-3 font-bold bg-blue-600'>My Bookings</Link>
            <Link to="/my-hotels" className='flex items-center text-white px-3 font-bold bg-blue-600' >My Hotels</Link>
            <SignOutButton />
            </> : <Link className='flex items-center text-blue-600 px-3 bg-white font-bold hover:bg-gray-600' to="/sign-in">Sign In</Link>
          }
            
        </span>
      </div>
    </div>
  )
}

export default Header
