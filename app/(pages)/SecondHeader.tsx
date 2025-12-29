import AvatarOrSignin from '../layouts/header/AvatarOrSigninWrapper'
import Search from '../layouts/header/Search'

const SecondHeader = () => {
  return (
    <div className='flex justify-between bg-gray-100 rounded-xl p-3'>
        <div>
            <div>ثبت لوکیشن</div>
            <div>ثبت کسب و کار</div>
        </div>
        <div>
            <Search />
            <AvatarOrSignin />
        </div>
    </div>
  )
}

export default SecondHeader