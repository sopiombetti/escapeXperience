import UserContext from "./user.ctx"
import AdventureContext from "./adventure.ctx"

const ContextProvider = ({children}) => {
  return (
    <AdventureContext>
      <UserContext >
        {children}
      </UserContext>
    </AdventureContext>
  )
}

export default ContextProvider