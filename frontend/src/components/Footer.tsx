

const Footer = () => {
  return (
    <div className='bg-blue-800 py-10'>
      <div className="container items-center mx-auto flex justify-between">
        <span className='text-3xl text-white font-bold tracking-tight'>
            HotelBooking.com
        </span>
        <span className='text-white font-bold flex gap-4'>
            <p className='cursor-pointer'>Privacy Policy</p>
            <p className='cursor-pointer'>Terms and Services</p>
        </span>
      </div>
    </div>
  )
}

export default Footer
