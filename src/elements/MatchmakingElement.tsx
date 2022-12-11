import React, { useState } from 'react'
import MatchmakingLobbyFragment from '../fragments/MatchmakingLobbyFragment'
import StartMatchmakingFragment from '../fragments/StartMatchmakingFragment'

type MatchmakingElementPropsType={
    onMatchStart: ()=>void
}

const MatchmakingElement = ()=>{
    const [isMatchFound, setIsMatchFound ] = useState(false)
    return (
    <div>
        {(!isMatchFound)?<StartMatchmakingFragment/>:< MatchmakingLobbyFragment />}
    </div>
    )
}

export default MatchmakingElement